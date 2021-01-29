import { api } from '../config/index.js';
import { toLoginPage } from './util.js'
// 请求封装
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
	console.info('请求参数', options.data, options.url, options.method, token);
    uni.request({
        url: `${api}${options.url}`,
		data: options.data,
		method: options.method,
		header: {
			'X-ShaU-Token': token,
		},
        success: (res) => {
			console.info('请求返回', res.data);
			const { errno, errmsg } = res.data;
			if (errno || res.statusCode !== 200) {
			  !options.quiet && uni.showToast({
				title: errmsg || '服务器异常',
				icon: 'none',
			  });
			  if (errno === -5) {
				// 未登录或token已过期
				setTimeout(() => {
					toLoginPage();
				}, 800);
			  }
			}
			if (res.data instanceof Object) {
				res.data.success = !errno;
			}
            resolve(res.data);
        },
		fail: (error) => {
			resolve({
				success: false,
				errmsg: error,
			});
			uni.showToast({
			    title: '网络开小差了',
				icon: 'none'
			});
		}
    });
  });
};
export default request;
