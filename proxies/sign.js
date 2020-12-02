/**
 * 每日签到模块接口
 */

import Request from '../common/request.js';

// 获取签到日期列表
export function ProxyGetSignList(data = {}) {
  return Request({
    url: '/api/sign/list',
    method: 'GET',
    data
  })
}

// 签到
export function ProxyDoSign(data = {}) {
  return Request({
    url: '/api/sign/do',
    method: 'POST',
    data
  })
}
