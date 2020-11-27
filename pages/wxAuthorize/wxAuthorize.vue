<template>
	<view class="testPage">
	  <view class="dybgArea">
	    <dt-bg
	      ref="dybg"
	      :blur="blur"
	      :circleMode="circleMode"
	      :circleColor="circleColor"
	      :bg="bg"
		  :number="number"
	    >
	      <view class="dyContent">
	        <template v-if="!phoneReg">
				<view class="acontent">
					<view class="title">
						微信信息授权页
					</view>
					<view class="content">
						<view class="content-item content-title">
							授权后，我可以获得什么？
						</view>
						<view class="content-item content-ans">
							获取电商行业人士权威解读来自记者的热点话题采访。
						</view>
						<view class="content-item content-ans">
							获取电商行业人士对热点事件的观点。
						</view>
						<view class="content-item content-ans">
							获取一手电商圈内资讯，24小时无间断更新。
						</view>
						<view class="content-item content-ans">
							获得本平台认证资格，认证通过后可与行业专家在线互动、参与话题采访、发布个人观点、获取电商数据等。
						</view>
					</view>
					<button class="authorize-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >我要授权</button>
				</view>
				
				
	        </template>
	        <template v-else>
	        	<view class="box">
					<u-form :model="form" ref="uForm"  label-position="top">
						<u-form-item prop="phone" left-icon="phone-fill" :left-icon-style="leftIconStyle">
							<u-input v-model="form.phone" placeholder="手机号" />
						</u-form-item>
						<u-form-item prop="code" left-icon="lock-fill" :left-icon-style="leftIconStyle">
							<u-input v-model="form.code" placeholder="验证码" />
							<u-button :disabled="!getCodeFlag || isClick" slot="right" :type="getCodeFlag && !isClick ? 'primary' : 'info'" size="medium" @click="getCode" plain>
								<template v-if="!isClick">
									<view>获取验证码</view>
								</template>
								<template v-else>
									<view>
										<u-count-down 
											bg-color="transparent" 
											color="#999" 
											:timestamp="time" 
											:show-days="false" 
											:show-hours="false" 
											:show-minutes="false" 
											@end="countDownEnd"
										></u-count-down>
										秒后重新获取
									</view>
								</template>
								
							</u-button>
						</u-form-item>
						
						<view class="xy">
							<u-checkbox v-model="checked" size="26" label-size="26" shape="circle">勾选同意</u-checkbox><text class="xy-btn" @click="handleXyFlag">JZB《用户协议》（点击阅读）</text>
						</view>
						
						<view class="sub-btn">
							<view class="sub-item">
								<u-button type="primary" @click="getReg" :disabled="!checked">注册</u-button>
							</view>
							<view class="sub-item">
								<u-button type="error" @click="prePage" plain="">返回</u-button>
							</view>
							
						</view>
						
					</u-form>
				</view>
	        </template>
	      </view>
	    </dt-bg>
	  </view>
	  
	  <u-modal v-model="xyFlag" title="JZB《用户协议》" width="90%" mask-close-able	>
	  	<view class="slot-content">
	  		<rich-text :nodes="content"></rich-text>
	  	</view>
	  </u-modal>
	</view>
</template>

<script>
	import dtBg from '@/components/dtBg/dtBg.vue'
	export default {
		name: "testPage",
		data() {
			return {
				time: 60,
				checked: false,
				content: `空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>`,
				xyFlag: false,
				leftIconStyle: {
					color: '#ccc'
				},
				form: {
					phone: '',
					code: ''
				},
				rules: {
					phone: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value)
							},
							message: '请输入有效的11位手机号',
							trigger: ['change',],
						}
					],
					code: [
						{
							required: true,
							len: 6,
							message: '请输入6位验证码',
							trigger: ['change']
						}
					]
				},
				btnStyle: {
					backgroundColor: '#00aa7f'
				},
				inputStyle: {
					flex: 1,
					marginLeft: '20rpx',
					width: '100%'
				},
				isClick: false,
				phoneReg: false,
				number: 12,
				prePageUrl: '',
				blur: 1, //小圆模糊值,0/不传则不模糊
				bg: "background-image:linear-gradient(33deg, #5237d6, #327cdd);", //背景颜色，可当style属性写任何样式，必须以;结尾
				circleMode: "color-dodge", //css3 mixBlendMode参数
				circleColor: "rgba(85, 170, 255, 0.2)", //移动的小圆颜色，为数组时，会随机分配给小圆
			}
		},
		computed: {
			getCodeFlag() {
				return this.$u.test.mobile(this.form.phone)
			}
		},
		components: {
			dtBg
		},
		onLoad(opt) {
			uni.$on('pre', obj => {
				this.prePageUrl = obj.url
				console.log(obj.url)
			})
			
			if(opt.phone == 1) this.phoneReg = true
		},
		onReady() {
			if(this.phoneReg) this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			handleGetUserInfo () {
				return new Promise((res, rej) => {
					uni.getUserInfo({ success: r => res(r), 
						fail: err => {
							uni.hideLoading()
							uni.showToast({
								title: '授权失败，请重新授权',
								duration: 1500,
								icon: 'none'
							})
						}
					})
				})
			},
			handleLogin() {
				return new Promise((res, rej) => {
					uni.login({ success: r => res(r)})
				})
			},
			async bindGetUserInfo() {
				uni.showLoading({
				    title: '授权中',
					mask: true
				});
				let that = this;
				uni.login({
					success: function(res) {
						let code = res.code; //获取code
						uni.getUserInfo({
							//得到rawData, signatrue, encryptData
							success: function(data) {
								let rawData = data.rawData;
								let signature = data.signature;
								let encryptedData = data.encryptedData;
								let iv = data.iv;
								that.$https
									.get('/Home/Jzbxcx/login_wx', {
										params: {
											code: code,
											rawData: rawData,
											signature: signature,
											iv: iv,
											encryptedData: encryptedData
										}
									})
									.then(function(response) {
										//获取后操作
										uni.hideLoading()
										that.$store.commit('checkAuthorize', true)
										uni.reLaunch({
										    url: getApp().globalData.prePagePath
										});
									});
							},
							fail(err) {
								
								uni.hideLoading()
								uni.showToast({
									title: '授权失败，请重新授权',
									duration: 1500,
									icon: 'none'
								})
							}
						});
					}
				});
				// let loginRes = await this.handleLogin()
				// // console.log(loginRes)
				// let code = loginRes.code;
				// let data = await this.handleGetUserInfo()
				// // console.log(data)
				// let {rawData, signature, iv, encryptedData, errMsg, userInfo} = data
				// let res = await this.$https.get('/Home/Jzbxcx/login_wx', {
				// 	params: {
				// 		code: code,
				// 		rawData: rawData,
				// 		signature: signature,
				// 		iv: iv,
				// 		encryptedData: encryptedData
				// 	}
				// })
				// // console.log(res)
				
				// uni.hideLoading()
				// this.$store.commit('checkAuthorize', true)
				// uni.reLaunch({
				//     url: getApp().globalData.prePagePath
				// });
			   
			},
			handleXyFlag() {
				this.xyFlag = !this.xyFlag
			},
			async getCode() {
				this.isClick = true
				let res = await this.$https.get('/Home/Jzbxcx/phone_code', {params: {phone: this.form.phone}})
				console.log(res)
			},
			countDownEnd() {
				this.isClick = false
			},
			prePage() {
				if(getCurrentPages().length == 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}else {
					uni.navigateBack({
						delta: 1
					});
					
				}
			},
			async getReg() {
				let res = await this.$refs.uForm.validate();
				if (res) {
					console.log('验证通过');
					//注册请求
					let checkRes = await this.checkPhoneCode()
					console.log(checkRes)
					// this.$store.commit('checkPhoneReg', true)
					if(checkRes.data.code == 1) {
						let res2 = await this.$getlogin()
						uni.reLaunch({
							url: '/pages/personal/personal',
							success:() => {
								uni.showToast({
									title: '注册成功',
									duration: 1500,
								})
							}
						})
					}else {
						uni.showToast({
							title: '注册失败',
							duration: 1500,
							icon: 'none'
						})
					}
					
				} else {
					console.log('验证失败');
				}
			},
			async checkPhoneCode() {
				let res = await this.$https.get('/Home/Jzbxcx/check_phone_code', {params: {phone: this.form.phone, code: this.form.code}})
				return res
			},
		}
	}
</script>

<style scoped lang="scss">
	.title {
		font-weight: bold;
		text-align: center;
		font-size: 38rpx;
		line-height: 80rpx;
		margin: 30rpx;
	}
	.acontent {
		color: #fff;
		width: 100%;
	}
	.content {
		font-size: 32rpx;
		margin-bottom: 120rpx;
	}
	.content-item {
		line-height: 60rpx;
		margin-bottom: 10rpx;
	}
	.content-ans {
		padding: 10rpx 20rpx;
		position: relative;
	}
	.content-ans:after {
		content: '';
		position: absolute;
		left: 0;
		top: 35rpx;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #fff;
	}
	.authorize-btn {
		border: 0;
		background-color: #aa55ff;
		color: #fff;
		font-size: 32rpx;
	}
	.xy {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		font-size: 26rpx;
	}
	.xy-btn {
		color: $jzb-theme-color;
	}
	.sub-btn {
		padding: 40rpx 0 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.sub-item {
		flex: 0 0 45%
	}
	
	.box {
		background-color: #fff;
		padding: 40rpx;
		border-radius: 20rpx;
		width: 100%;
	}
	.testPage {
	  height: 100%;
	  overflow: hidden;
	}
	.dybgArea {
	  height: 100%;
	  .dyContent {
	    width: 100%;
	    height: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
		padding: 30rpx;
	    h2 {
	      text-align: center;
	      font-size: 50rpx;
	      font-weight: lighter;
	      color: rgba(255, 255, 255, 0.9);
	      text-shadow: 0 8rpx 8rpx rgba(0,0,0,0.2);
	    }
	    p {
	      font-size: 30rpx;
	      color: rgba(255, 255, 255, 0.5);
	      text-shadow: 0 4rpx 4rpx rgba(0,0,0,0.1);
	    }
	  }
	}
	.text {
		margin-left: 8rpx;
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 200;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50rpx;
		flex-direction: column;
	}
	.cell-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
</style>
