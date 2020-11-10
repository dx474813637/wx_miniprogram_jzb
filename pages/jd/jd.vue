<template>
	<view class="w">
		<view class="w-name">
			<view class="name-item">
				<u-icon name="file-text-fill" color="#007aff" size="36"></u-icon>
				<text>我的采访解读</text>
			</view>
			
		</view>
		
		<view class="w-list">
			<view class="list-item">
				<view class="item-title">
					标题内容标题内容标题内容标题内容标题内容标题内容
				</view>
				<view class="item-sub">
					<view class="sub-date">
						{{'2020-10-20 09:25:33' | timeFilter}}发出采访邀请
					</view>
					<view class="sub-status">
						<u-icon name="info-circle-fill" color="#f90" size="34"></u-icon>
						<text>采访待处理</text>
					</view>
				</view>
				<view class="item-sub">
					<view class="sub-date">
						<text>23小时59分</text>后采访邀请失效
					</view>
				</view>
				<view class="item-footer">
					<view class="footer-item">
						<u-button type="primary" @click="handleSeeDetail">处理详情</u-button>
					</view>
					<view class="footer-item">
						<u-button type="primary" @click="handleSeeOrigin">查看原文</u-button>
					</view>
				</view>
			</view>
			<view class="list-item">
				<view class="item-title">
					标题内容标题内容标题内容标题内容标题内容标题内容
				</view>
				<view class="item-sub">
					<view class="sub-date">
						{{'2020-10-20 05:25:33' | timeFilter}}发出采访邀请
					</view>
					<view class="sub-status">
						<u-icon name="checkmark-circle-fill" color="#00aa00" size="34"></u-icon>
						<text>采访已处理</text>
					</view>
				</view>
				<view class="item-footer">
					<view class="footer-item">
						<u-button type="primary" @click="handleSeeDetail">处理详情</u-button>
					</view>
					<view class="footer-item">
						<u-button type="primary" @click="handleSeeOrigin">查看原文</u-button>
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
				
			}
		},
		onLoad() {
			this.renderList()
		},
		methods: {
			async renderList() {
				let res = await this.getData()
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/answer_list')
			},
			handleSeeOrigin() {
				uni.navigateTo({
					url: '/pages/qaDetail/qaDetail'
				})
			},
			handleSeeDetail() {
				uni.navigateTo({
					url: '/pages/jdDetail/jdDetail'
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
		padding: 20rpx 0;
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
		margin-bottom: 25rpx;
	}
	.sub-date {
		color: #999;
	}
	.item-title {
		font-weight: bold;
		font-size: 32rpx;
		line-height: 50rpx;
		margin-bottom: 20rpx;
		
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
