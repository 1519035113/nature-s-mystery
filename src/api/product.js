// 导入axios
import request from '@/utils/request'

// 获取商品管理列表数据
export function getList(pageNum) {
    return request({
        url: `/manage/product/list.do?pageNum=${pageNum}`,
        method: 'GET',
    })
}
// 查询id接口
export function getIdList(listType,pageNum,productId) {
    return request({
        url: `/manage/product/search.do?listType=${listType}&pageNum=${pageNum}&productId=${productId}`,
        method: 'GET',
    })
}
// 查询名称接口
export function getNameList(listType,pageNum,productName) {
    return request({
        url: `/manage/product/search.do?listType=${listType}&pageNum=${pageNum}&productName=${productName}`,
        method: 'GET',
    })
}