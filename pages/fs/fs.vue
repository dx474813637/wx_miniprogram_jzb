<template>
	<view class="w">
		<view class="w-name">
			<view class="name-item">
				<u-icon name="file-text-fill" color="#007aff" size="36"></u-icon>
				<text>我的发声</text>
			</view>
			<view class="name-item">
				<navigator url="/pages/send/send">
					<u-icon name="edit-pen" color="#007aff"></u-icon>
				</navigator>
				
			</view>
			
		</view>
		<view class="w-list">
			<view 
				class="list-item"
				v-for="(item, index) in list"
				:key="index"
				@click="handleSeeOrigin(item.id)"
			>
				<view class="item-title">
					{{item.title}}
				</view>
				<view class="item-data">
					<view class="data-item">
						<u-icon name="chat"></u-icon>
						<text>{{item.reply_num}}</text>
					</view>
					<view class="data-item">
						<u-icon name="thumb-up"></u-icon>
						<text>{{item.like_num}}</text>
					</view>
					<view class="data-item">
						<u-icon name="star"></u-icon>
						<text>{{item.like_num}}</text>
					</view>
					<view class="data-item">
						<u-icon name="clock"></u-icon>
						<text>{{item.uptime | timeFilter}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
		},
		async onShow() {
			uni.showLoading({
				title: '加载中',
			})
			await this.getList()
			uni.hideLoading()
		},
		methods: {
			async getList() {
				let res = await this.$https.get('/Home/Jzbxcx/viewpoint_list')
				// console.log(res)
				this.list = res.data.list
			},
			handleSeeOrigin(id) {
				uni.navigateTo({
					url: '/pages/qaDetail/qaDetail?type=1&id=' + id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.w {
		background-color: #fff;
		
		.w-name {
			font-size: 34rpx;
			font-weight: bold;
			padding: 20rpx;
			border-bottom: 1rpx solid #f8f8f8;
			display: flex;
			justify-content: space-between;
			text {
				margin-left: 10rpx;
				color: #333;
			}
		}
		.w-list {
			.list-item {
				padding: 30rpx;
				border-bottom: 1rpx solid #f8f8f8;
				.item-title {
					font-weight: bold;
					font-size: 28rpx;
					line-height: 50rpx;
					margin-bottom: 5rpx;
				}
				.item-data {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60rpx;
					color: #666;
					.data-item {
						flex: 0 0 25%;
						display: flex;
						// justify-content: center;
						align-items: center;
						text {
							margin-left: 5rpx;
						}
					}
				}
			}
		}
		
	}
	
	.sub-date {
		color: #999;
	}
	
	
	 
</style>
