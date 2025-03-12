const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../ultils/sendMail');
const crypto = require('crypto');

const register = asyncHandler(async (req, res) => {
    const { name, email, password, address,
            phone, img_User } = req.body;
            if(!name || !email || !password || !address || !phone || !img_User) 
                return res.status(400)({
                    success: false,
                    mes: 'Missing inputs'
            })

            const user = await User.findOne({email})
            if(user)
                throw new Error('User has existed!')
            else{
                const newUser = await User.create(req.body)
                return res.status(200).json({
                    success: newUser ? true : false,
                    mes: newUser ? 'Register successfully. Please go login' : 'Something went wrong'
                })
            }         
})

// Refreshtoken => cấp mới access token
// Access token => Xác thực người dùng, phân quyền ngừoi dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })

        const response = await User.findOne({email})
        if(response && await response.isCorrectPassword(password)){
            // Tách password và role ra khỏi response
            const { password, role, refreshToken,...userData } = response.toObject();
            // Tạo accessToken 
            const accessToken = generateAccessToken(response._id, role);
            // Tạo refreshToken
            const newRefreshToken = generateRefreshToken(response._id);
            // Lưu refreshToken vào db
            await User.findByIdAndUpdate(response._id, {refreshToken: newRefreshToken}, {new: true});
            // Lưu refreshToken vào cookie
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000});
            return res.status(200).json({
                success: true,
                accessToken,
                userData
            })
        }else{
            throw new Error('Invalid email or password')
        }
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id} = req.user;
    const user = await User.findById(_id).select('-refreshToken -password -role');
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    // lấy token từ cookie
    const cookie = req.cookies
    // check xem có token hay không
    if(!cookie && !cookie.refreshToken) throw new Error('Invalid refresh token')
    // Check token có hợp lệ không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken});
    return res.status(200).json({
        success: true,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })
})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies;
    if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie')
    // Xóa refreshToken trong db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true});
    // Xóa refreshToken ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true, 
        mes: 'Logout is done'
    })
})

//Client guiwr email
// Server check email có hợp lệ hay không => Gửi mail + kèm linl (pasword change token)
// CLinet check mail => click link
//Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change pasword

const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.query;
    if(!email) throw new Error('Missing email')
        const user = await User.findOne({ email });
    if(!user) throw new Error('User not found')
        const resetToken = user.createPasswordChangedToken();
        await user.save()

        const html = `Xin vui lòng  click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
        <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

        const data ={
            email, 
            html
        }
        const rs = await sendMail(data);
        return res.status(200).json({
            success: true,
            rs
        })
        
}) 
const resetPassword = asyncHandler(async(req, res) => {
    const { password, token } = req.body;
    console.log({password, token});
    if(!password || !token) throw new Error('Missing inputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}});
    if(!user) throw new Error('Token is invalid or expired')
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Update password' : "Something went wrong"
    })
})

const getUsers = asyncHandler(async(req, res) => {
    const response = await User.find().select('-password -refreshToken -role');
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async(req, res) => {
    const {_id} = req.query;
    if(!_id) throw new Error('Missing inputs')
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: response ? true : false,
        deleteUsers: response ? `User with email ${response.email} is deleted` : 'No user delete'
    })
})

const updateUser = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,   
        updateUser: response ? response : 'Something went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async(req, res) => {
    const {uid} = req.params;
    if( Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true}).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updateUserByAdmin: response ? response : 'Something went wrong'
    })
})



module.exports = {
    register, 
    login, 
    getCurrent, 
    refreshAccessToken, 
    logout, 
    forgotPassword, 
    resetPassword,
    getUsers,
    deleteUser,
    updateUser, 
    updateUserByAdmin
}