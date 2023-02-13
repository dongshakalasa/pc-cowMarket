import request from '@/utils/request'

// 获取首页信息
export const reqGetInfo = ()=>request({url:'/home',method:'get'})
// 获取分类列表
export const reqGetSortList = () => request({ url: '/home/sortList', method: 'get' })