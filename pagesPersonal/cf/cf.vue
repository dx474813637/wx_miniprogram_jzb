<template>
	<view class="w">
		
		<view class="w-name">
			<view class="name-item">
				<u-icon name="file-text-fill" color="#007aff" size="36"></u-icon>
				<text class="name-title">我的采访提问</text>
			</view>
			<view class="name-item">
				<navigator url="/pages/send/send">
					<u-icon name="edit-pen" color="#007aff"></u-icon>
					<text class="name-sub">新增</text>
				</navigator>
				
			</view>
			
		</view>
		<u-notice-bar
			:list="['点击查看记者采访提问完整版攻略']"
			close-icon
			type="primary"
			:autoplay="false"
			mode="vertical"
			play-state="paused"
			:show="noticeShow"
			@click="lookQuestion"
			@close="this.noticeShow = false"
		></u-notice-bar>
		
		
		
		<view class="w-list">
			<view 
				class="list-item"
				v-for="(item, index) in handleData"
				:key="index"
			>
				<view class="item-title">
					<template v-if="item.new_msg">
						<text class="new-msg-label">[新消息]</text>
					</template>
					{{item.title}}
				</view>
				<view class="item-sub">
					<template v-if="item.zt == '1'">
						<view class="sub-status">
							<u-icon name="checkmark-circle-fill" color="#00aa7f" size="34"></u-icon>
							<text>采访完成</text>
						</view>
					</template>
					<template v-else>
						<view class="sub-status">
							<u-icon name="info-circle-fill" color="#f90" size="34"></u-icon>
							<text>采访未完成</text>
						</view>
					</template>
					
					<view class="sub-date">
						{{item.post_time}}
					</view>
				</view>
				<view class="item-footer">
					<view class="footer-item">
						<u-button type="primary" size="mini" :custom-style="customStyle" plain @click="handleSeeStep(index)">查看进度</u-button>
					</view>
					<view class="footer-item">
						<u-button type="primary" size="mini" :custom-style="customStyle" plain @click="handleSeeOrigin(item.id)">查看原文</u-button>
					</view>
				</view>
					
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {mixinMsg} from '@/utils/mixin_msg.js'
	export default {
		mixins: [mixinMsg],
		data() {
			return {
				list: [],
				customStyle: {
					fontSize: '28rpx'
				},
				p: 1,
				pFlag: true,
				pLoading: false,
				noticeShow: true,
			}
		},
		async onShow() {
			uni.showLoading({
				title: '加载中',
			})
			await this.getList()
			uni.hideLoading()
		},
		onReachBottom() {
			if(!this.pFlag || this.pLoading) return
			this.pLoading = true
			this.p++
			this.getList()
			
		},
		computed: {
			...mapState({
				newMsg: 'mixinMsg'
			}),
			handleData() {
				// let msgArr = this.newMsg.list && this.newMsg.list.map(ele => ele.mid)
				if(!this.newMsg.list) return this.list
				let arr = this.list.map(ele => {
					let arr= []
					this.newMsg.list.forEach(item => {
						if(item.mid.split(',')[0] == ele.id) {
							arr.push(item.id)
						}
					})
					ele.new_msg = arr.join(',')
					return ele
				})
				return arr
			}
		},
		methods: {
			lookQuestion() {
				uni.navigateTo({
					url: `/pagesPersonal/handbook/handbook`
				})
			},
			async getList() {
				// let res = await this.$https.post('/Home/Jzbxcx/my_questions_list', {p: this.p})
				let res = await this.$https.get('/Home/Jzbxcx/my_questions_list', {params: {p: this.p}})
				// console.log(res)
				if(res.data.code == 1) {
					this.list = res.data.list
					if(this.p == res.data.pages) {
						this.pFlag = false
					}
				}
				if(this.loading) this.pLoading = false
			},
			handleSeeStep(index) {
				let id = this.list[index].id
				let isEnd = this.list[index].zt
				let cur
				if(isEnd == '1') {
					cur = 3
				}else {
					cur = 2
				}
				uni.navigateTo({
					url: '/pages/send/send?id=' + id + '&current=' + cur + '&newMsg=' + this.handleData[index].new_msg
				})
			},
			handleSeeOrigin(id) {
				uni.navigateTo({
					url: `/pages/qaDetail/qaDetail?id=${id}&type=0`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.w {
		.w-name {
			
			background-color: #fff;
			font-size: 30rpx;
			font-weight: bold;
			padding: 20rpx;
			border-bottom: 1rpx solid #f8f8f8;
			display: flex;
			justify-content: space-between;
			.name-title {
				margin-left: 10rpx;
				color: #333;
			}
			.name-sub {
				font-weight: normal;
				color: $jzb-theme-color;
				margin-left: 5rpx;
				font-size: 24rpx;
				
			}
		}
		.w-list {
			padding: 10rpx;
			.list-item {
				padding: 30rpx;
				// border-bottom: 1rpx solid #f8f8f8;
				margin-bottom: 10rpx;
				background: #fff;
				border-radius: 20rpx;
				.item-title {
					font-weight: bold;
					font-size: 30rpx;
					margin-bottom: 5rpx;
					.new-msg-label {
						color: #ff0000;
						padding-right: 10rpx;
					}
				}
				.item-sub {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10rpx;
					padding: 20rpx 0;
					.sub-status {
						display: flex;
						align-items: center;
						text {
							margin-left: 10rpx;
						}
					}
					.sub-date {
						color: #999;
					}
				}
				.item-footer {
					display: flex;
					justify-content: space-between;
					.footer-item {
						// flex: 0 0 45%;
						font-size: 28rpx;
					}
				}
			}
		}
		
	}
	
</style>
