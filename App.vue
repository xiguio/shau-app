<script>
	import { ProxyGetSystemIndex } from './proxies/system.js';
	import { ProxyGetCategoryList } from './proxies/category.js';
	import { ProxyGetVipList } from './proxies/vip.js';
	import { wechatMPVersion } from 'config/index.js';
	
	export default {
		methods: {
			// 获取分类
			async getCategoryList() {
				const categoryResult = await ProxyGetCategoryList({ parentId: 0 });
				if (categoryResult.success) {
					this.$store.commit('setCategoryList', categoryResult.data);
				}
			},
			// 检查各平台小程序更新
			checkMPUpdate() {
				// #ifndef APP-NVUE
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate((result) => {
					// 请求完新版本信息的回调
					if (result.hasUpdate) {
						updateManager.onUpdateReady((res) => {
							uni.showModal({
							  title: '更新提示',
							  content: '新版本已经准备好，是否重启应用？',
							  success(res) {
								if (res.confirm) {
								  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								  updateManager.applyUpdate();
								}
							  }
							});
						});
						updateManager.onUpdateFailed(() => {
							// 新的版本下载失败
							uni.showModal({
							  title: '更新失败',
							  content: '自动更新失败，请您删除当前小程序，重新打开',
							});
						});
					}
				});
				// #endif
			}
		},
		onLaunch: async function() {
			console.log('App Launch');
			// 从本地缓存获取用户信息
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.$store.commit('setUserInfo', JSON.parse(userInfo));
			}
			
			// 获取系统设置
			const systemResult = await ProxyGetSystemIndex();
			if (systemResult.success) {
				const isWechatMPUnrelease = wechatMPVersion > systemResult.data.wechatMPVersion;
				this.$store.commit('setSystemInfo', { isWechatMPUnrelease, ...systemResult.data });
			}
			
			// 获取会员等级列表
			const vipResult = await ProxyGetVipList();
			if (vipResult.success) {
				this.$store.commit('setVipList', vipResult.data);
			}
			
			this.getCategoryList();
			uni.$on('getCategoryList', () => {
				this.getCategoryList();
			});
			
			this.checkMPUpdate();
			
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
