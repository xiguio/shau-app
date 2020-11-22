/**
 * 短信验证码模块接口
 */

import Request from '../common/request.js';

// 短信验证码
export function ProxySendSms(data = {}) {
  return Request({
    url: '/api/sms/send',
    method: 'POST',
    data
  })
}
