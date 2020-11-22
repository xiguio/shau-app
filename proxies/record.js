/**
 * 交易记录模块接口
 */

import Request from '../common/request.js';

// 交易记录列表
export function ProxyGetRecordList(data = {}) {
  return Request({
    url: '/api/record/list',
    method: 'GET',
    data
  })
}

// 主动付款
export function ProxyAddByPay(data = {}) {
  return Request({
    url: '/api/record/addByPay',
    method: 'POST',
    data
  })
}

// 交易记录详情
export function ProxyGetRecordDetail(data = {}) {
  return Request({
    url: '/api/record/detail',
    method: 'GET',
    data,
	quiet: true // 错误时不显示弹窗
  })
}