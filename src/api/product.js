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
export function xjData(id,status) {
    return request({
        url: `/manage/product/set_sale_status.do?productId=${id}&status=${status}`,
        method: 'GET',
    })
}
export function sjData(id,status) {
    return request({
        url: `/manage/product/set_sale_status.do?productId=${id}&status=${status}`,
        method: 'GET',
    })
}

// 获取详情页数据
export function getDetail(id) {
    return request({
        url: `/manage/product/detail.do?productId=${id}`,
        method: 'GET',
    })
}
// 分类接口
export function getCate(id) {
    return request({
        url: `/manage/category/get_category.do?categoryId=${id}`,
        method: 'GET',
    })
}
// 编辑接口

export function getEdit(categoryId,name,subtitle,subImages,detail,price,stock,status,id) {
    return request({
        url: `/manage/product/save.do?categoryId=${categoryId}&name=${name}&subtitle=${subtitle}&subImages=${subImages}&detail=${detail}&price=${price}&stock=${stock}&status=${status}&id=${id}`,
        method: 'GET',
    })
}
// 添加接口

export function setData(categoryId,name,subtitle,subImages,detail,price,stock,status) {
    return request({
        url: `/manage/product/save.do?categoryId=${categoryId}&name=${name}&subtitle=${subtitle}&subImages=${subImages}&detail=${detail}&price=${price}&stock=${stock}&status=${status}`,
        method: 'GET',
    })
}
// 图片
export function zhuanPhoto(formData) {
    return request({
        url: `/manage/product/upload.do`,
        method: 'POST',
        data: formData
    })
}