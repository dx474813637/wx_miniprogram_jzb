import {https} from '@/static/js/https.js'
import store from '@/store/index.js'

function getSetting () {
	// 微信用户信息授权状态查询
	uni.getSetting({
		success: (res) => {
			console.log(res)
			if(res.authSetting['scope.userInfo']) {
				store.commit('checkAuthorize', true)
			}else {
				store.commit('checkAuthorize', false)
				getApp().globalData.prePagePath = getCurrentPages()[0].$page.fullPath
				uni.reLaunch({
					url: '/pages/wxAuthorize/wxAuthorize'
				})
			}
		}
	})
}
function login () {
	// 获取code
	return new Promise(resolve => {
		uni.login({
			provider: 'weixin',
			success: res => {
				resolve(res)
			}
		})
	}) 
}
async function getloginwxauth (code) {
	//微信登陆请求userid
	return await https.get('/Home/Jzbxcx/login_wx_auth?code=' + code)
}
async function getuserauthinfo () {
	//请求user身份认证(auth_status)状态 0未认证 1等待认证 2认证成功 3认证失败
	let res = await https.get('/Home/Jzbxcx/user_auth_info')
	console.log(res)
	store.commit('updateInfoAuthorize', res.data.list)
}
async function getlogin () {
	//请求user手机登陆状态
	let res = await https.get('/Home/Jzbxcx/get_login')
	console.log(res)
	if(res.data.code == 2) {
		uni.removeStorageSync('userid')
		loginInit()
		return false
	}
	//phone 手机认证状态 0没有绑定 1等待绑定 2绑定成功
	//login 手机号码 0为初始状态。有具体手机号的，但状态phone=1的，已经发送了验证码，但还没有绑定成功的。状态是2的，那这个手机号码是已经认证了的。
	//denglu 登录状态（认证状态） 可以直接用这个来判断有没有登录（认证） 1没登录（没认证） 2登录（认证）
	if(res.data.denglu == 2) {
		store.commit('checkPhoneReg', true)
		store.commit('checkPhone', res.data.phone)
	}
	// store.commit('checkPhoneReg', true)
	return res
}
async function loginInit() {
	if(!uni.getStorageSync('userid') ) {
		await getUserId()
	}
	let res = await getlogin()
	if(res) {
		getuserauthinfo()
	}
	
}

async function getUserId() {
	let loginRes = await login();
	let res = await getloginwxauth(loginRes.code)
	// console.log(res)
	uni.setStorageSync('userid', res.data.userid);
	store.commit('changeUserId', res.data.userid)
	return res
}

export { getSetting, loginInit, getlogin, getuserauthinfo }