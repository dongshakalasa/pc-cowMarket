import request from '@/utils/request'

export const reqRollInfo = () =>request({url:'/system/roll',method: 'get'})

export const reqPlatformInfo = () => request({ url: '/system/platform', method: 'get' })

export const reqBrand = (page,limit) => request({ url: `/system/brand/${page}/${limit}`, method: 'get' })

export const reqAnnouncement = (page, limit) => request({ url: `/system/announcement/${page}/${limit}`, method: 'get' })

export const reqMessage = (page, limit) => request({ url: `/system/message/${page}/${limit}`, method: 'get' })

export const reqInformation = (page, limit) => request({ url: `/system/information/${page}/${limit}`, method: 'get' })