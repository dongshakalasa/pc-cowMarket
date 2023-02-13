import request from '@/utils/request'

export const reqUser = (page,limit) => request({ url: `/user/${page}/${limit}`, method: 'get' })