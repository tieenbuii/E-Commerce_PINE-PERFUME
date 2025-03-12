import axios from "../axios";

export const apiRegister = (data) => axios({
    url:'/user/register', 
    method:'post',
    data
})

export const apiLogin = (data) => axios({
    url:'/user/Login', 
    method:'post',
    data
})

export const apiForgotPassword = (data) => axios({
    url:'/user/forgotpassword', 
    method:'post',
    data
})

export const apiResetPassword = (data) => axios({
    url:'/user/resetpassword', 
    method:'put',
    data
})