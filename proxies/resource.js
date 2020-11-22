/**
 * 资源模块接口
 */

import Request from '../common/request.js';

// 资源列表
export function ProxyGetResourceList(data = {}) {
  return Request({
    url: '/api/resource/list',
    method: 'GET',
    data
  })
}

// 资源详情
export function ProxyGetResourceDetail(data = {}) {
  return Request({
    url: '/api/resource/detail',
    method: 'GET',
    data
  })
}