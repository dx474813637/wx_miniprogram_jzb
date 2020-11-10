<template>
	<view class="content">
		
		<view class="list">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="item-header">
					<view class="xuhao">
						#{{index+1}}
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
				<view class="item-content">
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="calendar"></u-icon>
								<text>成立时间</text>
							</view>
							<view class="info-text">
								{{item.dtime}}年
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="rmb-circle"></u-icon>
								<text>估值</text>
							</view>
							<view class="info-text">
								{{item.shares + (item.a106 == '独角兽'? '亿美元': '亿元')}}
							</view>
						</view>
					</view>
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="grid"></u-icon>
								<text>所在行业</text>
							</view>
							<view class="info-text">
								{{item.a103}}
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="map"></u-icon>
								<text>所在地</text>
							</view>
							<view class="info-text">
								{{item.a100}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">

	.content {
		padding: 10rpx;
	}
	.list {
		background-color: #f8f8f8;
	}
	.list-item {
		background-color: #fff;
		margin-bottom: 15rpx;
	}
	.item-header {
		display: flex;
		align-items: center;
		height: 70rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #f8f8f8;
		margin-bottom: 15rpx;
		padding: 5rpx 20rpx;
	}
	.xuhao {
		font-style: italic;
		margin-right: 20rpx;
		color: #999;
	}
	.name {
		font-weight: bold;
		font-size: 32rpx;
		color: $jzb-theme-color;
	}
	.content-invest-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}
	.info-label {
		color: #999;
	}
	.info-label text {
		margin-left: 5rpx;
	}
	.item-content {
		padding: 5rpx 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.info-item {
		flex: 0 0 50%
	}
	.info-text {
		line-height: 45rpx;
		padding-left: 5rpx;
		// color: $jzb-theme-color;
	}
</style>
