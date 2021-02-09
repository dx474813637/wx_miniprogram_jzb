<template>
	<view class="w">
		<view class="personal-top">
			<!-- <view class="status-v"></view> -->
			<view class="personal-info">
				<view class="personal-header">
					<view class="home-page-btn" @click="gotoHomePage">
						<!-- <u-icon name="eye"></u-icon> -->
						<view class="btn-text">个人主页</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<template v-if="infoAuthorize.auth_status != 2">
						<!-- #ifdef MP-WEIXIN -->
						<open-data class="top-img no-rz" type="userAvatarUrl"></open-data>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<u-icon name="user1" custom-prefix="custom-icon" size="120" color="#f8f8f8"></u-icon>
						<!-- #endif -->
						<view class="per-h-item center">
							<!-- #ifdef MP-WEIXIN -->
							<open-data class="top-name" type="userNickName"></open-data>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<template v-if="!phoneReg">
								<view class="per-info">
									<navigator url="/pagesPersonal/wxAuthorize/wxAuthorize?phone=1" class="per-info-item per-label limit">
										点我登录
									</navigator>
								</view>
							</template>
							<template v-else>
								<view class="top-name">18757127948</view>
							</template>
							<!-- #endif -->
							<view class="per-info">
								<view class="per-info-item per-label limit">
									{{infoAuthorStatus}}
								</view>
							</view>
							
						</view>
					</template>
					<template v-else>
						<view class="top-img">
							<u-image
								height="100%"
								:src="infoAuthorize.pic"
								shape="circle"
							></u-image>
						</view>
						<view class="per-h-item center">
							<view class="per-info">
								<view class="per-info-item top-name">
									{{infoAuthorize.name}}
								</view>
								<view class="per-info-item per-label ">
									{{infoAuthorize.type | typeToLabel}}
								</view>
							</view>
							<view class="per-info">
								<view class="per-info-item per-sub">
									{{infoAuthorize.type == 0 ? infoAuthorize.company : infoAuthorize.title}}
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
			<view class="personal-info-data">
				<view @click="handleToPage('follow', '?v=1')"  class="item-info-data">
					<view class="info-data">{{info.follow_me? info.follow_me.length : 0}}</view>
					<view class="label-data">粉丝</view>
				</view>
				<view @click="handleToPage('follow', '?v=0')" class="item-info-data">
					<view class="info-data">{{info.my_follow ? info.my_follow.length : 0}}</view>
					<view class="label-data">关注</view>
				</view>
				<template v-if="infoAuthorize.type == 0">
					<view @click="handleToPage('cf')" class="item-info-data">
						<view class="info-data">{{info.questions ? info.questions.length : 0}}</view>
						<view class="label-data">采访</view>
					</view>
				</template>
				<template v-else>
					<view @click="handleToPage('jd')" class="item-info-data">
						<view class="info-data">{{info.answer ? info.answer.length : 0}}</view>
						<view class="label-data">解读</view>
					</view>
				</template>
				
				<view class="item-info-data">
					<view class="info-data">{{scoreNum}}</view>
					<view class="label-data">评分</view>
				</view>
			</view>
			<view class="personal-group">
				<view class="personal-card">
					<u-grid :col="4" :border="false">
						<u-grid-item @click="handleToPage('score')">
							<u-icon name="integral-fill" size="40" color="#ffd608"></u-icon>
							<view class="grid-text">积分</view>
						</u-grid-item>
						<u-grid-item @click="handleToPage('messageList')">
							<u-icon name="bell-fill" size="40" color="#55aaff"></u-icon>
							<view class="grid-text">消息</view>
						</u-grid-item>
						<u-grid-item @click="handleToPage('friendsList')">
							<u-icon name="account-fill" size="40" color="#079cff"></u-icon>
							<view class="grid-text">名片</view>
						</u-grid-item>
						<u-grid-item @click="handleToPage('data')">
							<u-icon name="shuju" custom-prefix="custom-icon" size="40" color="#aa55ff"></u-icon>
							<view class="grid-text">数据</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</view>
		<view class="personal-cell-group">
			<view class="personal-list">
				<u-cell-group>
					<u-cell-item  title="认证" hover-class="cell-hover-class" :value="infoAuthorStatus" @click="gotoHomePage">
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
					
					<u-cell-item  title="动态" hover-class="cell-hover-class" @click="handleToPage('update')">
						<u-icon name="heart-fill" class="cell-icon" size="40" color="#dd524d" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="关注" hover-class="cell-hover-class" @click="handleToPage('follow')">
						<u-icon name="eye-fill" class="cell-icon" size="40" color="#aa21ff" slot="icon"></u-icon>
					</u-cell-item>
					<u-cell-item  title="收藏" hover-class="cell-hover-class" @click="handleToPage('collection')">
						<u-icon name="star-fill" class="cell-icon" size="40" color="#f90" slot="icon"></u-icon>
					</u-cell-item>
					<navigator url="/pages/webViewPath/webViewPath?url=https://www.100ec.cn/Index/Wjsproviders.html&title=产品服务">
						<u-cell-item  title="产品" hover-class="cell-hover-class" >
							<u-icon name="cp2" class="cell-icon" size="40" color="#007aff" slot="icon" custom-prefix="custom-icon"></u-icon>
						</u-cell-item>
					</navigator>
					
				</u-cell-group>
			</view>
		</view>
		
		<rz-select-modal
			:show="rzModalShow"
			@change-flag="handleChangeRzModalShow"
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
				info: {}
			}
		},
		onShow() {
			if(this.infoAuthorize && this.infoAuthorize.auth_status != 2 && this.phoneReg) {
				console.log('show')
				getuserauthinfo()
			}
		},
		components: {
			tabBar,
			rzSelectModal
		},
		computed: {
			...mapState(['infoAuthorize', 'phoneReg']),
			infoAuthorStatus() {
				if(this.infoAuthorize.auth_status == 0 && this.infoAuthorize.auth_date) {
					return '等待认证'
				}
				if(this.infoAuthorize.auth_status == 1) return '等待认证'
				if(this.infoAuthorize.auth_status == 2) return '认证成功'
				if(this.infoAuthorize.auth_status == 3) return '认证失败'
				return '未认证'
			},
			scoreNum() {
				
				return Number((this.info.list && this.info.list.type == 0 ? this.info.questions_avg_score : this.info.answer_avg_score) || 0)
			}
			
		},
		onLoad() {
			this.getUserData()
		},
		methods: {
			gotoHomePage() {
				if(!this.handleAnalysisAuth()) return
				uni.navigateTo({
					url: `/pages/homePage/homePage?id=${this.infoAuthorize.poster}`
				})
			},
			handleChangeRzModalShow() {
				this.rzModalShow = !this.rzModalShow
			},
			handleToPage(name, params='') {
				if(name == 'follow' || name == 'collection' || name == 'score' || name == 'data') {
					if(!this.isReg()) return
				}else if(!this.handleAnalysisAuth()) return
				uni.navigateTo({
					url: `/pagesPersonal/${name}/${name}${params}`
				});
				
			},
			handleAnalysisAuth() {
				if(!this.isReg()) return false
				if(this.infoAuthorize.auth_status != 2) {
					this.handleChangeRzModalShow()
					return false
				}
				return true
			},
			isReg() {
				if(!this.phoneReg) {
					uni.navigateTo({
						url: '/pagesPersonal/wxAuthorize/wxAuthorize?phone=1'
					})
					return false
				}
				return true
			},
			async getUserData() {
				let res = await this.$https.get(`/Home/Jzbxcx/user_auth_detail?id=${this.infoAuthorize.poster}`)
				if(res.data.code == 1) {
					this.info = res.data
				}
			}
		}
	}
	
	
	
</script>

<style scoped lang="scss">
	.w {
		background-color: #fff;
		height: 100%;
		.personal-top {
			padding-top: 120rpx;
			min-height: 500rpx;
			background-size: 100%;
			background-position: 0 0;
			background-repeat: no-repeat;
			background-color: #007aff;
			background-image: url('https://www.100ec.cn/Public/home/images/homePageBg.jpg');
			
			// border-radius: 0 0 120rpx 120rpx;
			.personal-info {
				
				.personal-header {
					box-sizing: border-box;
					// background-color: $jzb-theme-color;
					width: 100%;
					display: flex;
					align-items: center;
					padding: 20rpx;
					position: relative;
					
					.home-page-btn {
						color: #fff;
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						margin-top: auto;
						margin-bottom: auto;
						height: 60rpx;
						display: flex;
						align-items: center;
						border-radius: 30rpx 0 0 30rpx;
						padding: 10rpx 20rpx;
						background-color: rgba(0,0,0,.15);
						font-size: 26rpx;
						
						.btn-text {
							padding: 0 10rpx;
						}
						
						
					}
					.top-img {
						flex: 0 0 140rpx;
						width: 140rpx;
						height: 140rpx;
						&.no-rz {
							overflow: hidden;
							border-radius: 50%;
						}
					}
					
					.per-h-item {
						margin-left: 30rpx;
						&.center {
							flex: 1
						}
						.top-name {
							color: #fff;
							font-size: 32rpx;
						}
						
						.per-info {
							display: flex;
							padding: 10rpx 0rpx;
							flex-wrap: wrap;
							align-items: center;
							
							.per-info-item {
								margin-right: 15rpx;
								color: $jzb-sup-color;
								white-space: nowrap;
								&.top-name {
									color: #fff;
									font-size: 32rpx;
									// font-weight: bold;
								}
								&.per-label {
									background-color: $jzb-sup-color;
									color: $jzb-theme-color;
									font-size: 24rpx;
									padding: 0rpx 16rpx;
									border-radius: 5rpx;
									&.limit {
										background-color: rgba(0,0,0,.1);
										color: #fff;
									}
								}
								&.per-sub {
									font-size: 22rpx;
									padding: 8rpx 18rpx;
									background-color: rgba(0, 0, 0, 0.15);
									border-radius: 20rpx;
								}
							}
						}
					}
				}
			}
			
			.personal-info-data {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;
				color: #fff;
				.item-info-data {
					flex: 1;
					text-align: center;
					.info-data {
						font-family: 'Trebuchet MS';
						font-size: 36rpx;
						margin-bottom: 10rpx;
						min-height: 42rpx;
					}
					.label-data{}
				}
			}
			
			.personal-group {
				padding: 20rpx;
				.personal-card {
					background-color: #fff;
					border-radius: 20rpx;
					padding: 10rpx 30rpx;
					box-shadow: 0 0 10rpx rgba(0,0,0,0.1);
					.grid-text {
						margin-top: 10rpx;
						color: #666;
					}
				}
			}
		}
		
		.personal-cell-group {
			.personal-list {
				padding: 20rpx;
				.cell-icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
	
	
</style>
