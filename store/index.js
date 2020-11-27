import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		name: 'dx',
		authorize: false,
		phone: '0',
		phoneReg: false,
		infoAuthorize: '', //obj.type 0:记者，1:专家，2：公关
		goodStr: '[点赞]',
		httpHeader: {
			appid: '10000',
			appsecret: '21a85v+eATCMI1ZYFaYcU7LyARmK9ig+vsjOfhw1JyjKDasGJBF0PWM',
			qid: '1',
			userid: uni.getStorageSync('userid')
		},
		tabBar: {
			show: true,
			bgColor: '#ffffff',
			borderTop: true,
			list: [{
					iconPath: "file-text",
					selectedIconPath: "file-text-fill",
					text: '资讯',
					customIcon: false,
					pagePath: '/pages/news/news'
				},
				{
					iconPath: "list-dot",
					selectedIconPath: "list",
					text: '专家',
					customIcon: false,
					pagePath: '/pages/userList/userList'
				},
				{
					iconPath: "moments",
					selectedIconPath: "moments-circel-fill",
					text: '圈内',
					midButton: true,
					customIcon: false,
					pagePath: '/pages/index/index'
				},
				{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '数据',
					customIcon: false,
					pagePath: '/pages/data/data'
				},
				{
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: "我的",
					pagePath: '/pages/personal/personal',
					customIcon: false,
				}
			],
			midButton: true,
			inactiveColor: '#878787',
			activeColor: '#007aff',
		},
	},
	getters: {},
	mutations: {
		checkAuthorize(state, authorize) {
			state.authorize = authorize
		},
		updateInfoAuthorize(state, list) {
			state.infoAuthorize = list
		},
		checkPhoneReg(state, phoneReg) {
			state.phoneReg = phoneReg
		},
		checkPhone(state, phone) {
			state.phone = phone
		},
		changeUserId(state, userid) {
			state.httpHeader.userid = userid
		}
	},
	actions: {}
})

export default store