<template>
	<view class="list">
		<template v-if="list.length > 0">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>	
				<template v-if="item.isQuestion">
					<navigator url="/pages/qaDetail/qaDetail" class="title">{{item.info.title}}</navigator>
				</template>
				<template v-if="!item.isQuestion">
					<navigator url="/pages/homePage/homePage" class="user-info author">
						<view class="user-avatar">
							<image :src="item.info.avatar"></image>
						</view>
						<view class="user-profile">
							<view class="user-profile-item">
								<view class="user-name">{{item.info.name}}</view>
								<view class="user-label">{{item.info.label}}</view>
							</view>
							<view class="user-profile-sub">{{item.info.sub}}</view>
						</view>
					</navigator>
				</template>
				<navigator url="/pages/qaDetail/qaDetail" class="user-content">
					<view class="content">{{item.info.content}}</view>
					<view class="post-time">{{item.info.post_date | timeFilter}}</view>
				</navigator>
				<template v-if="!item.isQuestion">
					<navigator url="/pages/qaDetail/qaDetail" class="a-to-q-wrap">
						<view class="q-info">
							<text class="q-label">{{item.isQuestion? '提问' : '发声'}}</text>
							<text class="q-title">{{item.q.title}}</text>
						</view>
					</navigator>
				</template>
				
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
		width: 30px;
		height: 30px;
	}
	.user-avatar image {
		width: 100%;
		height: 100%;
	}
	.author .user-profile {
		display: flex;
		align-items: center;
	}
	.user-profile-item {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
	}
	.user-name {
		font-weight: bold;
		font-size: 17px;
		margin-right: 5px;
	}
	.user-label {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		display: inline-block;
		font-size: 12px;
		padding: 1px 8px;
		border-radius: 3px;
		font-weight: bold;
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
		font-size: 17px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #666;
		line-height: 25px;
		padding: 5px 0px;
	}
	.post-time {
		color: #999;
		font-size: 13px;
		// margin-bottom: 10px;
	}
	.a-to-q-wrap {
		background-color: #f5f5f5;
		padding: 10px;
		border-radius: 3px;
		margin-top: 10px;
	}
	.q-user-profile {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.q-user-profile .user-profile-sub {
		flex: 1
	}
	.q-user-profile .q-ans-num {
		color: #999;
		font-size: 12px;
	}
	.q-label {
		background-color: #f90;
		color: #fff;
		display: inline-block;
		font-size: 12px;
		padding: 1px 8px;
		border-radius: 3px;
		margin-right: 5px;
	}
	.q-title {
		color: #666;
		line-height: 25px;
	}
	.title {
		font-weight: bold;
		font-size: 18px;
		line-height: 35px;
		// margin-bottom: 5px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.q-ans-icon {
		color: #999;
		margin-right: 3px;
	}
</style>
