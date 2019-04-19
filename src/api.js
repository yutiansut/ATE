import http from './axios';


/******
@登录注册
*******/

// 登录
export const loginApi = data => http({ url: '/user/userLogin', type: 'post', data })

// 获取短信验证码
export const sendCodeApi = data => http({ url: '/user/sendCode', type: 'post', data, tips: true })

// 获取邮箱验证码
export const sendEmailCodeApi = data => http({ url: '/user/sendEmailCode', type: 'post', data, tips: true })

// 注册
export const userRegisterApi = data => http({ url: '/user/userRegister', type: 'post', data, tips: true })

// 重置密码
export const resetPasswordApi = data => http({ url: '/user/resetPassword', type: 'post', data, tips: true })



/******
@设置
*******/

// 修改登录密码
export const modifyPasswordApi = data => http({ url: '/user/modifyPassword', type: 'post', data, tips: true })

// 验证登录密码
export const validatePasswordApi = data => http({ url: '/user/validatePassword', type: 'post', data, tips: true })
