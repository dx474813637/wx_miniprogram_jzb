<template>
	<view class="content">
		<template v-if="isSearch === 1 && list.length != 0">
			<view class="is-search-sub">
				{{list.length}}条相关搜索结果
			</view>
		</template>
		
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
								<u-icon name="clock"></u-icon>
								<text>时间</text>
							</view>
							<view class="info-text">
								{{item.dtime}}
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="info-circle"></u-icon>
								<text>轮次</text>
							</view>
							<view class="info-text">
								{{item.shares}}
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="rmb-circle"></u-icon>
								<text>金额</text>
							</view>
							<view class="info-text">
								{{item.a100.includes('未') ? item.a100 :item.a100 + item.a101}}
							</view>
						</view>
					</view>
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="account"></u-icon>
								<text>投资方</text>
							</view>
							<view class="info-text">
								{{item.a102}}
							</view>
						</view>
					</view>
				</view>
				<view class="item-footer">
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="grid"></u-icon>
							</view>
							<view class="info-text">
								{{item.cate+'-'+item.a103}}
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="map"></u-icon>
							</view>
							<view class="info-text">
								{{item.a106 == item.a107 ? item.a107 :item.a106+'-'+item.a107}}
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
			isSearch: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		},
		
	}
</script>

<style scoped lang="scss">
	.is-search-sub {
		background-color: #fff;
		padding: 10rpx 20rpx;
		color: #999;
		
	}
	.content {
		padding: 10rpx;
	}
	.list {
		background-color: #f8f8f8;
	}
	.list-item {
		background-color: #fff;
		margin-bottom: 15rpx;
		border-radius: 20rpx;
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
		font-size: 30rpx;
		color: $jzb-theme-color;
	}
	.content-invest-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}
	.info-label {
		color: #999;
		margin-bottom: 5rpx;
	}
	.info-label text {
		margin-left: 5rpx;
	}
	.item-content {
		padding: 5rpx 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.info-item {
		// flex: 0 0 33.3%
	}
	.info-text {
		line-height: 45rpx;
		padding-left: 5rpx;
		// color: $jzb-theme-color;
	}
	.item-footer .info-text {
		color: #666;
	}
	.item-footer {
		padding: 0 20rpx;
	}
	.item-footer .info-item {
		display: flex;
		align-items: center;
		height: 80rpx;
	}
</style>
