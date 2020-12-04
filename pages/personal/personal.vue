<template>
	<view>
		<view class="personal-header" @click="handleShowRzBox">
			<template v-if="infoAuthorize.auth_status != 2">
				<open-data class="top-img" type="userAvatarUrl"></open-data>
				<view class="per-h-item center">
					
					<open-data class="top-name" type="userNickName"></open-data>
					<view class="per-info">
						<view class="per-info-item per-label limit">
							{{infoAuthorStatus}}
						</view>
					</view>
					
				</view>
			</template>
			<template v-else>
				<image class="top-img" :src="infoAuthorize.pic" />
				<view class="per-h-item center">
					<view class="top-name">
						{{infoAuthorize.name}}
					</view>
					<view class="per-info">
						<view class="per-info-item per-label ">
							{{infoAuthorType}}
						</view>
						<view class="per-info-item per-sub">
							{{infoAuthorize.company || infoAuthorize.title}}
						</view>
					</view>
				</view>
			</template>
		</view>
		<template v-if="phoneRegFlag">
			<view class="reg-btn">
				<u-button type="warning" plain @click="gotoReg">普通用户注册</u-button>
			</view>
			<view class="msg">
				温馨提示：手机注册成功后，即可开放所有“我的”后台功能。并且认证身份后可与行业专家在线互动、参与话题采访、发布个人观点、获取电商数据等。
			</view>
		</template>
		<template v-else>
			<view class="personal-list">
				<u-cell-group>
					<u-cell-item  title="认证" hover-class="cell-hover-class" :value="infoAuthorStatus" @click="handleShowRzBox">
						<u-icon name="info-circle-fill" class="cell-icon" size="40" color="#007aff" slot="icon"></u-icon>
						
					</u-cell-item>
					<template v-if="infoAuthorize.type == 0 && infoAuthorize.auth_status == 2">
						<u-cell-item  title="采访" hover-class="cell-hover-class" @click="handleToPage('cf')">
							<u-icon name="file-text-fill" class="cell-icon" size="40" color="#aa21ff" slot="icon"></u-icon>
						</u-cell-item>
					</template>
					<template v-else-if="(infoAuthorize.type == 1 || infoAuthorize.type == 2) && infoAuthorize.auth_status == 2">
						<u-cell-item  title="解读" hover-class="cell-hover-class" @click="handleToPage('jd')">
							<u-icon name="file-text-fill" class="cell-icon" size="40" color="#aa21ff" slot="icon"></u-icon>
						</u-cell-item>
					</template>
					
					<u-cell-item  title="关注" hover-class="cell-hover-class" @click="handleToPage('follow')">
						<u-icon name="eye-fill" class="cell-icon" size="40" color="#ff5500" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="动态" hover-class="cell-hover-class" @click="handleToPage('update')">
						<u-icon name="heart-fill" class="cell-icon" size="40" color="#dd524d" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="收藏" hover-class="cell-hover-class" @click="handleToPage('collection')">
						<u-icon name="star-fill" class="cell-icon" size="40" color="#f90" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="消息" hover-class="cell-hover-class" @click="handleToPage('messageList')">
						<u-icon name="bell-fill" class="cell-icon" size="40" color="#079cff" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="名片" hover-class="cell-hover-class" @click="handleToPage('friendsList')">
						<u-icon name="account-fill" class="cell-icon" size="40" color="#079cff" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="积分" hover-class="cell-hover-class" @click="handleToPage('score')">
						<u-icon name="integral-fill" class="cell-icon" size="40" color="#ffd608" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="EDM" hover-class="cell-hover-class" @click="handleToPage('edm')">
						<u-icon name="email-fill" class="cell-icon" size="40" color="#007aff" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="邀请好友" hover-class="cell-hover-class" :border-bottom="false" @click="handleToPage('invite')">
						<u-icon name="plus-people-fill" class="cell-icon" size="40" color="#8215ff" slot="icon"></u-icon>
					</u-cell-item>
				</u-cell-group>
			</view>
		</template>
		
		<rz-select-modal
			:show="rzModalShow"
			@change-flag="handleShowRzBox"
		></rz-select-modal>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {getuserauthinfo} from '@/static/js/common.js'
	import {mapState} from 'vuex'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import rzSelectModal from '@/components/rzSelectModal/rzSelectModal.vue'
	export default {
		data() {
			return {
				rzModalShow: false,
			}
		},
		onShow() {
			if(this.infoAuthorize.auth_status != 2 && this.phoneReg) {
				getuserauthinfo()
			}
		},
		components: {
			tabBar,
			rzSelectModal
		},
		computed: {
			...mapState(['infoAuthorize', 'phoneReg']),
			phoneRegFlag() {
				return !this.$store.state.phoneReg
			},
			infoAuthorType() {
				if(this.infoAuthorize.type == 0) return '记者'
				if(this.infoAuthorize.type == 1) return '专家'
				if(this.infoAuthorize.type == 2) return '公关'
			},
			infoAuthorStatus() {
				if(this.infoAuthorize.auth_status == 0 && this.infoAuthorize.auth_date) {
					return '等待认证'
				}
				if(this.infoAuthorize.auth_status == 1) return '等待认证'
				if(this.infoAuthorize.auth_status == 2) return '认证成功'
				if(this.infoAuthorize.auth_status == 3) return '认证失败'
				return '未认证'
			}
			
		},
		methods: {
			handleShowRzBox() {
				if(!this.phoneReg) return 
				if(this.infoAuthorize.auth_status == 2) {
					uni.navigateTo({
						url: `/pages/homePage/homePage?id=${this.infoAuthorize.poster}`
					})
					return
				}
				this.rzModalShow = !this.rzModalShow
			},
			handleToPage(name) {
				uni.navigateTo({
				    url: '/pages/'+name+'/'+name
				});
			},
			handleGetUserInfo(e) {
				console.log(e)
				let {rawData, signature, iv, encryptedData, errMsg, userInfo} = e.detail
				if(errMsg == 'getUserInfo:ok' ) {
					
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							console.log(loginRes)
							return this.$https.get('/Home/Jzbxcx/login_wx', {
								params: {
									code: loginRes.code,
									rawData: rawData,
									signature: signature,
									iv: iv,
									encryptedData: encryptedData
								}
							})
							.then(res => {
								this.$store.commit('checkAuthorize', true)
								console.log(res)
							})
						}
					})
					
				}
				
			},
			gotoReg() {
				uni.navigateTo({
					url: '/pages/wxAuthorize/wxAuthorize?phone=1'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.msg {
		padding: 0 30rpx;
		color: #999;
		line-height: 40rpx;
	}
	.reg-btn {
		padding: 30rpx;
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
	.personal-list {
		padding: 20rpx;
	}
	.personal-header {
		box-sizing: border-box;
		background-color: $jzb-theme-color;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20rpx;
	}
	.top-img {
		flex: 0 0 120rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 15rpx;
		background-image: url('@/static/img/icon-user.png');
		background-repeat: no-repeat;
		background-size: 100%; 
		background-position: center 0;
		background-color: #fff;
		border: 4rpx solid $jzb-sup-color;
		overflow: hidden;
	}
	.top-name {
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
	}
	.per-h-item {
		margin-left: 20rpx;
	}
	.per-h-item.center {
		flex: 1
	}
	.per-info-item {
		margin-right: 15rpx;
		color: $jzb-sup-color;
		white-space: nowrap;
	}
	.per-info {
		display: flex;
		padding: 10rpx 0rpx;
		flex-wrap: wrap;
	}
	.per-label {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		font-size: 24rpx;
		padding: 0rpx 8rpx;
		border-radius: 5rpx;
	}
	.per-label.limit {
		background-color: #eee;
		color: #666;
	}
</style>
