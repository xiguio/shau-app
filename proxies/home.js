/**
 * 首页模块接口
 */

import Request from '../common/request.js';

// 首页资源列表
export function ProxyGetHomeList(data = {}) {
  return Request({
    url: '/api/home/list',
    method: 'GET',
    data
  })
}
