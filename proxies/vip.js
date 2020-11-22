/**
 * 会员等级模块接口
 */

import Request from '../common/request.js';

// 会员等级列表
export function ProxyGetVipList(data = {}) {
  return Request({
    url: '/api/vip/list',
    method: 'GET',
    data
  })
}
