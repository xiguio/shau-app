/**
 * 用户模块接口
 */

import Request from '../common/request.js';

// 获取当前用户信息
export function ProxyGetUserInfo(data = {}) {
  return Request({
    url: '/api/user/detail',
    method: 'GET',
    data
  })
}