/**
 * 分类模块接口
 */

import Request from '../common/request.js';

// 分类列表
export function ProxyGetCategoryList(data = {}) {
  return Request({
    url: '/api/category/list',
    method: 'GET',
    data
  })
}
