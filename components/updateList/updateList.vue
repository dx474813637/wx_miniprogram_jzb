<template>
	<view class="list">
		<template v-if="list.length > 0">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>	
				<navigator :url="`/pages/homePage/homePage?id=${item.auth_poster}`" class="user-info author">
					<view class="user-avatar">
						<image :src="item.pic"></image>
					</view>
					<view class="user-profile">
						<view class="user-profile-item">
							<view class="user-name">{{item.name}}</view>
							<view class="user-label">{{item.type | typeToLabel}}</view>
						</view>
						<view class="post-time">更新于{{item.uptime | timeFilter}}</view>
					</view>
				</navigator>
				<navigator :url="`/pages/qaDetail/qaDetail?type=1&id=${item.id}`">
					<view class="q-title">
						{{item.title}}
					</view>
					<view class="user-content">
						<view class="content">{{item.intro}}</view>
					</view>
				</navigator>
				
			</view>

		</template>
		<template v-else>
			<view class="empty">
				<u-empty text="无内容" mode="list" margin-top="100"></u-empty>
			</view>
			
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">

	.list {
		padding: 120rpx 40rpx 40rpx;
		background-color: #fff;
	}
	.list-item {
		margin-bottom: 50rpx;
		border-bottom: 1rpx solid #f8f8f8;
		padding-bottom: 30rpx;
	}
	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
	}
	.user-avatar {
		width: 45px;
		height: 45px;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 10px;
	}
	.author .user-avatar {
		width: 50rpx;
		height: 50rpx;
	}
	.user-avatar image {
		width: 100%;
		height: 100%;
	}
	.author .user-profile {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.user-profile-item {
		display: flex;
		align-items: center;
	}
	.user-name {
		font-weight: bold;
		font-size: 30rpx;
		margin-right: 5px;
	}
	.user-label {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		display: inline-block;
		font-size: 12px;
		padding: 1px 8px;
		border-radius: 3px;
		// font-weight: bold;
		margin-right: 5px;
		border: 1px solid #54c9ff;
	}
	.user-profile-sub {
		color: #999;
		font-size: 13px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	
	}
	.content {
		font-size: 28rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #666;
		line-height: 50rpx;
		margin-bottom: 10rpx;
		white-space: pre-wrap;
	}
	.post-time {
		color: #999;
		font-size: 24rpx;
		// margin-bottom: 10px;
	}
	.a-to-q-wrap {
		background-color: #f5f5f5;
		padding: 20rpx;
		border-radius: 6rpx;
		margin-top: 20rpx;
	}
	.q-user-profile {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.q-user-profile .user-profile-sub {
		flex: 1
	}
	.q-user-profile .q-ans-num {
		color: #999;
		font-size: 24rpx;
	}
	.q-label {
		background-color: #f90;
		color: #fff;
		display: inline-block;
		font-size: 24rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		margin-right: 10rpx;
	}
	.q-title {
		line-height: 50rpx;
		font-weight: bold;
		font-size: 32rpx;
		margin-bottom: 10rpx;
	}
	.q-ans-icon {
		color: #999;
		margin-right: 6rpx;
	}
</style>
