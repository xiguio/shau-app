/**
 * 支付模块接口
 */

import Request from '../common/request.js';

// 获取付款二维码
export function ProxyGetPayQRCode(data = {}) {
  return Request({
    url: '/api/pay/qrcode',
    method: 'GET',
    data
  })
}

// 微信登录
export function ProxyWeChatLogin(data = {}) {
  return Request({
    url: '/login',
    method: 'POST',
    data
  })
}