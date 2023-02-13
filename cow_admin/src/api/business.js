import request from '@/utils/request'

export const reqGoods = (page, limit) => request({ url: `/business/product/${page}/${limit}`, method: 'get' })

export const reqOrder = (page, limit) => request({ url: `/business/order/${page}/${limit}`, method: 'get' })

export const reqOrderRate = (page, limit) => request({ url: `/business/orderRate/${page}/${limit}`, method: 'get' })