import axios from 'axios'
import {
    baseUrl
} from '@/config'

let request = axios.create({
    baseURL: baseUrl,
    timeout: 6800
})
//请求拦截
request.interceptors.request.use((config) => {

    return config

}, (err) => {

    return Promise.reject(err)

})
//响应拦截
request.interceptors.response.use((response) => {

    return response.data

}, (err) => {
    return Promise.reject(err)
})

// 导出axios实例
export default request