import request from "@/utils/request"

// 获取商品详情
export const reqGetGoodsDetail = (id)=> request({url:`/detail/${id}`,method:'get'})

// 获取商品评价
export const reqGetGoodsRateDetail = (id) => request({ url: `/detail/goodsRate/${id}`, method: 'get' })

// 加入购物车
export const reqSetGoodsCar = (id, number) => request({ url:`car/insertCart/${id}/${number}`,method:'post'})

// 判断商品是否被收藏
export const reqJudgeGoods = (id) => request({ url:`/collect/judgeGoods/${id}`,method:'get'})

// 收藏商品
export const reqCollect = (id) => request({ url: `/collect/addCollect/${id}`, method: "get" })

// 删除收藏
export const reqDeleteGoods = (id) => request({ url:`/collect/deleteCollect/${id}`,method:'get'})