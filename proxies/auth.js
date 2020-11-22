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

// 微信登录
export function ProxyWeChatLogin(data = {}) {
  return Request({
    url: '/login',
    method: 'POST',
    data
  })
}