import request from '@/utils/request'

// 初始化信息
export const reqGetInfo = ()=>request({url:'/pay/info',method:'get'});

// 更改用户信息
export const reqUpdateAddressInfo = (data) => request({ url:'/pay/updateAddress',method:'post',data})

// 提交订单
export const reqInsertOrderInfo = (data) => request({ url: '/pay/insertOrderInfo', method: 'post', data })