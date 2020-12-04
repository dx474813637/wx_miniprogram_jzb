<template>
	<scroll-view class="w" scroll-y>
		<view class="w-icon-btn">
			<button class="zf-btn btn-item" open-type="share">
				<u-icon name="share-fill" color="#fff" size="40"></u-icon>
			</button>
			<view class="btn-item" @click="shareHomePage">
				<u-icon name="moments" color="#fff" size="45"></u-icon>
			</view>
		</view>
		<view class="w-main">
			<skeleton 
				:loading="load"
				:row="10"
				el-color="#17366f"
			>
				<view>
					<view class="user-header">
						<view class="user-avatar">
							<image :src="list.pic"></image>
						</view>
						<template v-if="phoneReg && list.poster != infoAuthorize.poster">
							<view class="header-item">
								<u-button type="primary" shape="circle" size="mini" ripple  :custom-style="!eyeFlag? eyeStyle: noEyeStyle " @click="handleEyeFlag">
									<u-icon :name="!eyeFlag? 'heart': 'eye-off'" size="30"></u-icon>
									<text class="eye">{{eyeFlag? '取消': ''}}关注</text>
								</u-button>
								<template v-if="eyeFlag">
									<u-button type="primary" shape="circle" size="mini" ripple :custom-style="cfStyle" @click="applyBtn">
										<!-- <u-icon name="plus" size="28"></u-icon> -->
										<u-icon name="account-fill" size="28"></u-icon>
										<text class="eye">换名片</text>
									</u-button>
								</template>
								<template v-if="infoAuthorize.type == 0 && list.type != 0">
									<u-button @click="inviteBtn" type="primary" shape="circle" ripple size="mini" :custom-style="cfStyle">
										<u-icon name="mic" size="28"></u-icon>
										<text class="eye">采访</text>
									</u-button>
								</template>
								
								
							</view>
						</template>
						
					</view>
					
					<view class="box user-info">
						<view class="user-name">
							<text class="name">{{list.name}}</text>
							<text class="label">{{list.type | typeToLabel}}</text>
						</view>
						<view class="user-sub">
							{{list.title}}
						</view>
						<view class="user-data">
							<view class="data-item">
								<text class="num">{{follow_me.length}}</text>
								<text class="data-t">粉丝</text>
							</view>
							<view class="data-item">
								<text class="num">{{my_follow.length}}</text>
								<text class="data-t">关注</text>
							</view>
							<view class="data-item">
								<text class="num">{{ list.type != 0 ?answer.length : questions.length}}</text>
								<text class="data-t">{{ list.type != 0 ? '解读' : '采访'}}</text>
							</view>
							<template v-if="score">
								<view class="data-item">
									<text class="num">{{score}}</text>
									<text class="data-t">评分</text>
								</view>
							</template>
							
						</view>
						<view class="user-key-label">
							<view 
								class="key-item"
								v-for="(item, index) in field"
								:key="index"
							>{{item.field}}</view>
						</view>
						<view class="user-intro">
							<u-read-more 
								ref="uReadMore"
								toggle
								:shadow-style="shadowStyle"
								show-height="300"
								close-text="展开"
							>	
								<view class="itro-input" >
									{{list.intro}}
								</view>
							</u-read-more>
						</view>
					</view>
				</view>
			</skeleton>
			
			
			<view class="box">
				<view class="box-card">
					<view class="title">
						<u-icon name="file-text-fill" size="30" color="#007aff"></u-icon>
						<text class="title-name">{{!isAnswer ? 'Ta的提问' : 'Ta的解读'}}</text> 
					</view>
					<q-a-list
						:list="dataList"
						:type="0"
						:isAnswer="isAnswer"
						:isIndexList="false"
					></q-a-list>
				</view>
			</view>
		</view>
		<hch-poster 
			ref="hchPoster" 
			:simpleFlag="simpleFlag" 
			:posterBgFlag="posterBgFlag"
			:billType="billType"
		></hch-poster>
	</scroll-view>
</template>

<script>
	import {sharePage} from '@/utils/sharePage.js'
	import Skeleton from '@/components/skeleton/index.vue'
	import QAList from '@/components/QAList/QAList.vue'
	import hchPoster from "../../components/hch-poster/hch-poster.vue"
	import {mapState, mapMutations} from 'vuex'
	export default {
		mixins: [sharePage],
		data() {
			return {
				id: '',
				eyeFlag: false,
				shadowStyle: {
					backgroundColor: 'none'
				},
				eyeClass: {
					backgroundColor: '#ff007f',
				},
				eyeStyle: {
					backgroundColor: '#ff007f',
					height: '60rpx',
					width: '180rpx'
				},
				cfStyle: {
					height: '60rpx',
					marginLeft: '15rpx'
				},
				noEyeStyle: {
					height: '60rpx',
					backgroundColor: '#aaa',
					width: '180rpx'
				},
				field: [],
				follow_me: [],
				my_follow: [],
				list: {},
				questions: [],
				answer: [],
				isAnswer: 0,
				score: 0,
				load: true,
				shareEwm: '',
			    posterBgFlag: true,//是否展示海报背景图
			    simpleFlag: false,//是否展示简单版海报
				billType: 'user',
				posterObj: {
					title: "网经社名片海报",
				},
			}
		},
		components: {
			QAList,
			Skeleton,
			hchPoster
		},
		async onLoad(opt) {
			
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			if(opt.id) {
				this.id = opt.id
				console.log('home-begin')
				await this.renderInit()
				console.log('home-end')
				// console.log(res)
				
			}
			uni.hideLoading()
		},
		computed: {
			...mapState(['phoneReg', 'infoAuthorize', 'shareOptions']),
			dataList() {
				return this.list.type == 0 ? this.questions : this.answer
			}
		},
		methods: {
			...mapMutations(['changeShareOptions']),
			async getUser() {
				return await this.$https.get('/Home/Jzbxcx/user_auth_detail', {params: {id: this.id}})
			},
			async renderInit() {
				let res = await this.getUser()
				let {field, follow_me, my_follow, list, questions, answer, follow} = res.data
				this.field = field
				this.follow_me = follow_me
				this.my_follow = my_follow
				this.list = list
				this.eyeFlag = follow
				this.questions = questions
				this.answer = answer.filter(ele => ele.zt == 2)
				this.isAnswer = this.list.type
				if(this.isAnswer != 0) {
					this.score = Math.floor(this.answer.reduce((sum, cur) => {
						return sum + Number(cur['score_answer'])
					}, 0) / this.answer.length * 10) / 10 || 0
				}else {
					
				}
				this.load = false
				this.posterObj.posterImgUrl = list.pic
				this.posterObj.name = list.name
				this.posterObj.label = list.type
				this.posterObj.sub = list.title || list.company
				this.posterObj.contentTitle = '个人简介'
				this.posterObj.contentText = list.intro
				this.changeShareOptions(this.posterObj)
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
			},
			async followUser() {
				return await this.$https.get('/Home/Jzbxcx/follow_user', {params: {id: this.id}})
			},
			async cancelFollowUser() {
				return await this.$https.get('/Home/Jzbxcx/follow_cancel', {params: {id: this.id}})
			},
			async handleEyeFlag() {
				let res
				
				if(!this.eyeFlag) {
					res = await this.followUser()
				}else {
					res = await this.cancelFollowUser()
				}
				if(res.data.code == 1) {
					this.eyeFlag = 1 - this.eyeFlag
					uni.showToast({
						title: this.eyeFlag ? '关注成功' : '取消关注成功',
						duration: 1000,
						icon: 'success'
					})
				}
				
				
			},
			tabsChange(index) {
				this.tabsCurrent = index
			},
			applyBtn() {
				if(this.id == this.infoAuthorize.poster) return
				uni.showModal({
					title: '名片交换邀请',
					content: '该邀请对方若接受后，双方均可查看对方的手机信息。',
					success: res => {
						if(res.confirm) {
							this.handleApply()
						}
					}
				})
			},
			async handleApply() {
				uni.showLoading({
					title: '提交申请中...'
				})
				let res = await this.$https.get('/Home/Jzbxcx/friends_apply', {
					params: {
						id: this.id
					}
				})
				uni.hideLoading()
				if(res.data.code == 1) {
					uni.showModal({
						content: '发送成功！是否跳转消息列表？',
						success: res => {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/messageList/messageList'
								})
							}
						}
					})
				}else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
				
			},
			inviteBtn() {
				uni.navigateTo({
					url: `/pages/send/send?uid=${this.id}`
				})
			},
			async shareHomePage() {
				// let res = await this.$https.get('/Home/Jzbxcx/get_xcx_code', {
				// 	params: {
				// 		url: 'pages/homePage/homePage?id=' + this.id
				// 	}
				// })
				// if(res.data.code == 1) {
				// 	this.shareEwm = res.data.ewm
					
				// 	this.$set(this.posterObj, 'posterCodeUrl', res.data.ewm)
					// this.$nextTick(() => {
						this.$refs.hchPoster.posterShow()
					// })
					
				// }
			},
			zfHomePage() {
				uni.showShareMenu({
				  withShareTicket: true,
				  success: res => {
					  console.log(res)
				  }
				})
			},
			canvasCancel(val) {
			  this.canvasFlag = val
			}
		}
	}
</script>

<style scoped lang="scss">
	.w-icon-btn {
		position: absolute;
		top: 0;
		right: 0;
		padding: 20rpx;
		display: flex;
		align-items: center;
	}
	.data-t {
		font-size: 28rpx;
	}
	.title {
		padding: 10rpx 20rpx;
		font-weight: bold;
		color: $jzb-theme-color;
		font-size: 30rpx;
	}
	.title-name {
		margin-left: 5rpx;
	}
	.itro-input {
		width: 100%;
		color: #c8c8c8;
		white-space: pre-wrap;
	}
	.user-key-label {
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx auto 10rpx;
	}
	.key-item {
		margin-right: 20rpx;
		margin-bottom: 14rpx;
		color: #fff;
		background-color: $jzb-theme-color;
		border-radius: 8rpx;
		font-size: 24rpx;
		padding: 3rpx 12rpx;
	}
	.box-card {
		background-color: #fff;
		border-radius: 15rpx;
		padding: 15rpx 0;
	}
	.user-intro rich-text{
		color: #ccc;
	}
	.box {
		padding: 20rpx;
	}
	.data-item {
		flex: 0 0 25%;
		// display: flex;
		justify-content: center;
		align-items: baseline;
		// margin-right: 10rpx;
	}
	.data-item:first-child {
		justify-content: flex-start;
	}
	.data-item:last-child {
		justify-content: flex-end;
	}
	// .data-item:last-child {
	// 	margin-right: 0;
	// }
	.user-data {
		display: flex;
		// justify-content: space-between;
		color: #fff;
		margin-bottom: 15rpx;
		padding-bottom: 25rpx;
		border-bottom: 1rpx solid #182432;
	}
	.num {
		color: $jzb-theme-color;
		// font-family: 'Times New Roman', Times, serif;
		font-family: 'Trebuchet MS';
		font-size: 40rpx;
		padding-right: 10rpx;
	}
	.user-sub {
		color: #c8c8c8;
		margin-bottom: 15rpx;
		padding-bottom: 15rpx;
		border-bottom: 1rpx solid #182432;
		
	}
	.user-info {
		color: #fff;
	}
	.user-name {
		display: flex;
		align-items: baseline;
		margin-bottom: 15rpx;
	}
	.name {
		// font-weight: bold;
		font-size: 40rpx;
		letter-spacing: 4rpx;
	}
	.label {
		color:#fff;
		// border: 1rpx solid $jzb-theme-color;
		background-color: $jzb-theme-color;
		display: inline-block;
		font-size: 24rpx;
		line-height: 32rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		font-weight: bold;
		margin-left: 15rpx;
	}
	.w {
		background-color: $jzb-theme-color;
		padding: 0rpx 0rpx 10rpx;
		height: 100%;
	}
	.w-main {
		border-radius: 20rpx;
		background-color: #001f33;
		min-height: 1500rpx;
		margin-top: 100rpx;
		padding-top: 40rpx;
	}
	.user-header {
		position: relative;
		display: flex;
		justify-content: flex-end;
		height: 90rpx;
		align-items: center;
		padding: 0 20rpx;
	}
	.user-avatar {
		position: absolute;
		left: 20rpx;
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		border: 4rpx solid #001f33;
		bottom: 0;
		overflow: hidden;
	}
	.user-avatar image {
		width: 100%;
		height: 100%;
	}
	.eye {
		margin-left: 15rpx;
	}
	
	.btn-item {
		margin-left: 25rpx;
	}
	.btn-item.zf-btn {
		background-color: transparent;
		border: none;
	}
	button::after {
		border: none;
	}
</style>
