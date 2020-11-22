/**
 * 系统设置模块接口
 */

import Request from '../common/request.js';

// 系统设置
export function ProxyGetSystemIndex(data = {}) {
  return Request({
    url: '/api/system/index',
    method: 'GET',
    data
  })
}
