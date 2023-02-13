import request from '@/utils/request'

// 搜索商品
export const reqSelectInfo = (data) => request({ url: '/select/list', method: 'post',data })

// 获取平台属性
export const reqSelectAttribute = () => request({ url: '/select/attribute', method: 'get'})

// 加入购物车
export const reqSetCart = (id) => request({url:`/car/insertCart/${id}/1`,method: "get"})

// 收藏商品
export const reqCollect = (id) => request({ url: `/collect/addCollect/${id}`, method: "get" })

// 判断商品是否被收藏
export const reqJudgeGoods = (id) => request({ url: `/collect/judgeGoods/${id}`, method: 'get' })
