import request from '@/utils/request'

// 注册验证码
export const reqGetCode = (account) => request({ url: `/user/sendCode?account=${account}`, method: 'get'})

// 登录验证码
export const reqGetCodeLogin = (account) => request({ url: `/user/sendCode/login?account=${account}`, method: 'get' })

// 注册
export const reqUserRegister = (data) => request({ url: '/user/register', method: 'post' ,data})

// 账号登录`
export const reqUserAccountLogin = (data) => request({ url: 'user/login/account', method: 'post', data })

// 验证码登录
export const reqUserCodeLogin = (data) => request({ url: 'user/login/code', method: 'post', data })

// 自动登录
export const reqUserAuthLogin = () => request({ url: 'user/authLogin', method: 'get' })

// 退出登录
export const reqLogout = () => request({url:'/user/logout',method:"get"})