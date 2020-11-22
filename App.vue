<script>
	import { ProxyGetSystemIndex } from './proxies/system.js';
	import { ProxyGetCategoryList } from './proxies/category.js';
	import { ProxyGetVipList } from './proxies/vip.js';
	export default {
		onLaunch: async function() {
			console.log('App Launch');
			// 获取系统设置
			const systemResult = await ProxyGetSystemIndex();
			if (systemResult.success) {
				this.$store.commit('setSystemInfo', systemResult.data);
			}
			
			// 获取会员等级列表
			const vipResult = await ProxyGetVipList();
			if (vipResult.success) {
				this.$store.commit('setVipList', vipResult.data);
			}
			
			// 获取分类
			const categoryResult = await ProxyGetCategoryList({ parentId: 0 });
			if (categoryResult.success) {
				this.$store.commit('setCategoryList', categoryResult.data);
			}
			
			// #ifdef APP-NVUE
			plus.screen.lockOrientation('portrait-primary');

			let appid = plus.runtime.appid;
			if (appid && appid.toLocaleLowerCase() != "hbuilder") {
				uni.request({
					url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version
					},
					success: (res) => {
						console.log('success', res);
						if (res.statusCode == 200 && res.data.isUpdate) {
							let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
							// 提醒用户更新
							uni.showModal({
								title: '更新提示',
								content: res.data.note ? res.data.note : '是否选择更新',
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(openUrl);
									}
								}
							})
						}
					}
				})
			}

			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "texticons",
				'src': "url('./static/text-icon.ttf')"
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
