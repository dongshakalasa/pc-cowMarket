import request from "@/utils/request"

// 获取商品详情
export const reqGetCar = () => request({ url:`/car/list`,method:'get'})

// 更改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => request({ url: `/car/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 修改购物车产品数量
export const reqUpdateShopCart = (skuId, skuNum) => request({ url: `/car/updateCart/${skuId}/${skuNum}`, method: 'get' })

// 删除购物车商品
export const reqDeleteShoopCart = (id) => request({ url: `/car/deleteCart/${id}`,method: 'delete' })

// 删除购物车选中的全部商品商品
export const reqDeleteShoopCarts = () => request({ url: `/car/deleteCarts`, method: 'delete' })

