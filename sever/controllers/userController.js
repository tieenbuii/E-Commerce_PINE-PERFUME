const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { name, email, password, address,
            phone, img_User } = req.body;
            if(!name || !email || !password || !address || !phone || !img_User) 
                return res.status(400)({
                    success: false,
                    mes: 'Missing inputs'
            })
            const response = await User.create(req.body)
            return res.status(201).json({
                success: response ? true : false,
                response
            })
})

module.exports = {
    register
}