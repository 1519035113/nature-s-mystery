// 导入axios
import request from '@/utils/request'

// 获取品类管理列表数据
export function getList(id) {
    return request({
        url: `/manage/category/get_category.do?categoryId=${id}`,
        method: 'GET',
    })
}
// 修改名称接口
export function setName(id,name) {
    return request({
        url: `/manage/category/set_category_name.do?categoryId=${id}&categoryName=${name}`,
        method: 'GET',
    })
}


// 添加品类
export function addCateName(id,categoryName) {
    return request({
        url: `/manage/category/add_category.do?parentId=${id}&categoryName=${categoryName}`,
        method: 'GET',
    })
}