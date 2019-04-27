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


/******
@币币交易
*******/

// 币币交易下拉选项
export const getCurrencysubchail = data => http({ url: '/currencybase/getcurrencysubchail', type: 'post', data });

// 买入
export const addEntrustment = data => http({ url: '/c2c/addEntrustment', type: 'post', data, tips: true });

// 切换币种
export const getCoinFundsInfo = data => http({ url: '/coin/getCoinFundsInfo', type: 'post', data, tips: true });

// 获取盘面
export const surface = data => http({ url: '/quotes/surface', type: 'post', data });

// 获取 主链 买入
export const getMinVolume = data => http({ url: '/c2c/getMinVolume', type: 'post', data });



// 成交记录接口
export const historyEntrustments = data => http({ url: '/c2c/historyEntrustments', type: 'post', data });

// 委托记录
export const myEntrustments = data => http({ url: '/c2c/myEntrustments', type: 'post', data });


// 撤单
export const updateEntrustment = data => http({ url: '/c2c/updateEntrustment', type: 'post', data, tips: true });

// 加入自选
export const addSelfSelected = data => http({ url: '/c2c/addSelfSelected', type: 'post', data, tips: true });

// 取消自选
export const delSelfSelected = data => http({ url: '/c2c/delSelfSelected', type: 'post', data, tips: true });

// 自选列表
export const selfSelected = data => http({ url: '/c2c/selfSelected', type: 'post', data, tips: true });

// 五档数据
export const unsettledGear = data => http({ url: '/quotes/unsettledGear', type: 'post', data });

/******
@交易记录
*******/


// 币币交易-币种
export const getcurrencybase = data => http({ url: '/currencybase/getcurrencybase', type: 'post', data });


// C2C/B2C -列表
export const getFiatDealTradeOrderList = data => http({ url: '/fiatDealTradeOrder/getFiatDealTradeOrderList', type: 'post', data });


// C2C/B2C  -类型
export const initCoinProperty = data => http({ url: '/advertising/initCoinProperty', type: 'post', data });

// 广告发布 -列表

export const getAdvertisingList = data => http({ url: '/advertising/list', type: 'post', data });

// 广告发布 - 撤单
export const advertisingCancel = data => http({ url: '/advertising/cancel', type: 'post', data, tips: true });

// 充币-列表
export const querytransactionlist = data => http({ url: '/usertransaction/querytransactionlist', type: 'post', data });

// 提币-列表
export const drawCoinList = data => http({ url: '/coin/drawCoinList', type: 'post', data });
