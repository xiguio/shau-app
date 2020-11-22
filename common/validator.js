// 验证手机号
function validateMobile(mobile) {
	if (!(/^(1[3,4,5,7,8,9])\d{9}$/.test(mobile))) {
		uni.showToast({
			title: '手机号码不正确',
			icon: 'none'
		})
		return false;
	}
	return true;
}
// 验证验证码
function validateCode(code) {
	if (!code || (code + '').length !== 4) {
		uni.showToast({
			title: '请输入4位验证码',
			icon: 'none'
		})
		return false;
	}
	return true;
}
export {
	validateMobile,
	validateCode
}
