<template>
	<view class="w">
		<view class="w-main">
			<view class="user-header">
				<view class="user-avatar">
					<image :src="list.pic"></image>
				</view>
				<view class="header-item">
					<u-button type="primary" shape="circle" size="mini" ripple  :custom-style="!eyeFlag? eyeStyle: noEyeStyle " @click="handleEyeFlag">
						<u-icon :name="!eyeFlag? 'heart': 'eye-off'" size="30"></u-icon>
						<text class="eye">{{eyeFlag? '取消': ''}}关注</text>
					</u-button>
					<template v-if="eyeFlag">
						<u-button type="primary" shape="circle" size="mini" ripple :custom-style="cfStyle">
							<u-icon name="phone-fill" size="30"></u-icon>
							<text class="eye">互换手机</text>
						</u-button>
					</template>
					<u-button type="primary" shape="circle" ripple size="mini" :custom-style="cfStyle">
						<u-icon name="plus" size="30"></u-icon>
						<text class="eye">采访</text>
					</u-button>
					
				</view>
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
						<text class="num">4657</text>
						<text>关注Ta的</text>
					</view>
					<view class="data-item">
						<text class="num">27</text>
						<text>Ta关注的</text>
					</view>
					<view class="data-item">
						<text class="num">4.8</text>
						<text>评分</text>
					</view>
					<view class="data-item">
						<text class="num">888</text>
						<text>采访数</text>
					</view>
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
						<!-- <textarea 
							class="itro-input" 
							auto-height 
							:value="list.intro" 
							disabled 
							:maxlength="-1" 
						/> -->
					</u-read-more>
				</view>
			</view>
			
			<view class="box">
				<view class="box-card">
					<u-tabs 
						:list="tabsList" 
						:is-scroll="false" 
						:current="tabsCurrent" 
						@change="tabsChange"
						:show-bar="false"
						active-color="#007aff"
						inactive-color="#666"
					></u-tabs>
					<q-a-list
						:list="dataList"
						:isIndexList="false"
					></q-a-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QAList from '@/components/QAList/QAList.vue'
	export default {
		data() {
			return {
				id: '',
				tabsCurrent: 0,
				tabsList: [
					{
						name: 'Ta的提问',
						isAuthor: true,
						isQuestion: true
						
					},
					{
						name: 'Ta的解读',
						isAuthor: false,
						isQuestion: true
					},
					{
						name: 'Ta的发声',
						isAuthor: true,
						isQuestion: false
					},
					{
						name: 'Ta的留言',
						isAuthor: false,
						isQuestion: false
					},
				],
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
				answer: []
			}
		},
		components: {
			QAList
		},
		async onLoad(opt) {
			if(opt.id) {
				this.id = opt.id
				let res = await this.getUser()
				let {field, follow_me, my_follow, list, questions, answer} = res.data
				this.field = field
				this.follow_me = follow_me
				this.my_follow = my_follow
				this.list = list
				this.questions = questions
				this.answer = answer
				console.log(list.intro)
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
				// console.log(res)
				
			}
		},
		computed: {
			dataList() {
				return []
				let arr = this.qaData
				let isA = this.tabsList[this.tabsCurrent].isAuthor
				let isQ = this.tabsList[this.tabsCurrent].isQuestion
				return arr.filter(ele => {
					return (isA? ele.isAuthor : !ele.isAuthor) && (isQ? ele.isQuestion : !ele.isQuestion)
				})
				
			}
		},
		methods: {
			async getUser() {
				return await this.$https.get('/Home/Jzbxcx/user_auth_detail', {params: {id: this.id}})
			},
			async followUser() {
				return await this.$https.get('/Home/Jzbxcx/follow_user', {params: {id: this.id}})
			},
			async cancelFollowUser() {
				return await this.$https.get('/Home/Jzbxcx/follow_cancel', {params: {id: this.id}})
			},
			async handleEyeFlag() {
				
				uni.showLoading({
					title: '正在处理中...',
					mask: true
				})
				if(!this.eyeFlag) {
					await this.followUser()
				}else {
					await this.cancelFollowUser()
				}
				uni.hideLoading()
				this.eyeFlag = !this.eyeFlag 
				uni.showToast({
					title: this.eyeFlag ? '关注成功' : '取消关注成功',
					duration: 1000,
					icon: 'success'
				})
				
			},
			tabsChange(index) {
				this.tabsCurrent = index
			}
		}
	}
</script>

<style scoped lang="scss">
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
		// margin-right: 10rpx;
	}
	// .data-item:last-child {
	// 	margin-right: 0;
	// }
	.user-data {
		display: flex;
		justify-content: space-between;
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
		padding: 100rpx 0rpx 10rpx;
	}
	.w-main {
		border-radius: 20rpx;
		background-color: #001f33;
		min-height: 1500rpx;
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
</style>
