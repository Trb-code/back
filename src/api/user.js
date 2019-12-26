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

// 栏目列表
export const lanmu = () => {
  return axios({
    url: '/category'

  })
}

// 发布文章
export const sendpost = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}

