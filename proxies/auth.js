/**
 * 权限模块接口
 */

import Request from '../common/request.js';

// 账号密码登录
export function ProxySmsLogin(data = {}) {
  return Request({
    url: '/api/auth/loginBySms',
    method: 'POST',
    data
  })
}

// 微信小程序授权登录
export function ProxyWechatMPLogin(data = {}) {
  return Request({
    url: '/api/auth/wechatMPLogin',
    method: 'POST',
    data
  })
}

// QQ小程序授权登录
export function ProxyQQMPLogin(data = {}) {
  return Request({
    url: '/api/auth/qqMPLogin',
    method: 'POST',
    data
  })
}
