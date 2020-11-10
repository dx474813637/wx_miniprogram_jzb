<template>
	<view class="w">
		<view class="w-name">
			<view class="name-item">
				<u-icon name="file-text-fill" color="#007aff" size="36"></u-icon>
				<text>采访提问</text>
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
			>
				<view class="item-title">
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
						<u-button type="primary" @click="handleSeeStep(index)">查看进度</u-button>
					</view>
					<view class="footer-item">
						<u-button type="primary" @click="handleSeeOrigin(item.id)">查看原文</u-button>
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
			this.getList()
			
		},
		methods: {
			async getList() {
				let res = await this.$https.get('/Home/Jzbxcx/my_questions_list')
				console.log(res)
				this.list = res.data.list
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
					url: '/pages/send/send?id=' + id + '&current=' + cur
				})
			},
			handleSeeOrigin(id) {
				uni.navigateTo({
					url: '/pages/qaDetail/qaDetail?id=' + id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.footer-item {
		flex: 0 0 45%
	}
	.item-footer {
		display: flex;
		justify-content: space-between;
	}
	.sub-status {
		display: flex;
		align-items: center;
	}
	.sub-status text {
		margin-left: 10rpx;
	}
	.list-item {
		padding: 50rpx 30rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.item-sub {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;
		padding: 20rpx 0;
	}
	.sub-date {
		color: #999;
	}
	.item-title {
		font-weight: bold;
		font-size: 32rpx;
		line-height: 50rpx;
		margin-bottom: 5rpx;
		
	}
	.w {
		background-color: #fff;
		
	}
	.w-name {
		font-size: 34rpx;
		font-weight: bold;
		padding: 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
		display: flex;
		justify-content: space-between;
	}
	.w-name text {
		margin-left: 10rpx;
		color: #333;
	}
</style>
