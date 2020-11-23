import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		token: '',
		userInfo: {},
		systemInfo: {},
		categoryList: [],
		vipList: [],
	},
	mutations: {
		// 登录
		login(state, token) {
			state.hasLogin = true;
			state.token = token;
		},
		// 退出登录
		logout(state) {
			state.hasLogin = false;
			state.token = '';
			uni.removeStorageSync('token');
		},
		// 当前用户信息
		setUserInfo(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
		},
		celarUserInfo(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorageSync('userInfo');
		},
		// 系统设置信息
		setSystemInfo(state, systemInfo) {
			state.systemInfo = systemInfo;
		},
		celarSystemInfo(state) {
			state.systemInfo = {};
		},
		// 分类列表
		setCategoryList(state, categoryList) {
			state.categoryList = categoryList;
		},
		celarCategoryList(state) {
			state.categoryList = [];
		},
		// 会员列表
		setVipList(state, vipList) {
			state.vipList = vipList;
		},
		celarVipList(state) {
			state.vipList = [];
		},
	}
})

export default store
