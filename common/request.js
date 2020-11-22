// 请求封装
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
	console.info('请求参数', options.data, options.url, options.method, token);
	// const api = 'http://127.0.0.1:7001';
	const api = 'https://14d-api.xigu.pro';
    uni.request({
        url: `${api}${options.url}`,
		data: options.data,
		method: options.method,
		header: {
			'X-VStore-Token': token,
		},
        success: (res) => {
			console.info('请求返回', res.data);
			if (res.data.errno || res.statusCode !== 200) {
			  !options.quiet && uni.showToast({
				title: res.data.errmsg || '服务器异常',
				icon: 'none',
			  });
			}
			if (res.data instanceof Object) {
				res.data.success = !res.data.errno;
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
