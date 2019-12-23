import axios from '../myaxios/base.js'

export const userlogin = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取文章列表
export const arctlist = (params) => {
  return axios({
    url: '/post',
    params
  })
}
