import axios from 'axios'
import {
    baseUrl
} from '@/config'

import {
    Loading
} from 'element-ui';

let loading

let request = axios.create({
    baseURL: baseUrl,
    timeout: 6800
})
//请求拦截
request.interceptors.request.use((config) => {

    loading = Loading.service({
        background: 'rgba(0,0,0,0.6)',
        fullscreen: true
    })

    return config

}, (err) => {
    loading.close()
    return Promise.reject(err)

})
//响应拦截
request.interceptors.response.use((response) => {
    loading.close()
    return response.data

}, (err) => {
    loading.close()
    return Promise.reject(err)
})

// 导出axios实例
export default request