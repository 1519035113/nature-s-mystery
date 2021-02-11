// 导入axios
import request from '@/utils/request'

// 获取商品管理列表数据
export function getList(pageNum) {
    return request({
        url: `/manage/order/list.do?pageNum=${pageNum}`,
        method: 'GET',
    })
}

// 查询名称接口
export function getNameList(listType,pageNum,productName) {
    return request({
        url: `/manage/order/search.do?listType=${listType}&pageNum=${pageNum}&orderNo=${productName}`,
        method: 'GET',
    })
}