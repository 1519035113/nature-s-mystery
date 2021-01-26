// 导入axios
import request from '@/utils/request'

// 登录接口
export function Login(data) {
    return request({
        url: '/manage/user/login.do',
        method: 'POST',
        data: data
    })
}

// 退出登录接口
export function Logout() {
    return request({
        url: '/user/logout.do',
        method: 'POST'
    })
}