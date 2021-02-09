<template>
	<view class="list-w" :class="{'noIndex': !isIndexList}">
		
		<template v-if="list.length > 0">
			<view 
				v-for="(ele, i) in list" 
				:key="i"
			>
				<view class="list-item" v-for="(item, index) in ele" :key="index">
					
					<navigator :url="`/pages/qaDetail/qaDetail?id=${item.id}&type=${type}`">
						<view class="title">{{item.title}}</view>
					</navigator>
					<navigator :url="`/pages/homePage/homePage?id=${item.poster}`" class="user-info" :class="{'author': item.title}">
						<view class="user-avatar">
							<image :src="item.pic" class="avatar-img"></image>
						</view>
						<view class="user-profile">
							<view class="user-profile-item">
								<view class="user-name">{{item.name}}</view>
								<view class="user-label">{{item.type | typeToLabel}}</view>
							</view>
							<view class="user-profile-sub">{{item.type != 0 ? item.auth_title : item.company}}</view>
						</view>
					</navigator>
					
					<navigator :url="`/pages/qaDetail/qaDetail?id=${item.qid || item.id}&type=${type}`" class="user-content">
						<view class="content">{{item.intro}}</view>
						<view class="item-footer-tools">
							<view class="tools-item">
								<navigator :url="url" class="item-data">
									<u-icon name="chat" size="36" color="#999"></u-icon>
									<text class="num">{{item.ansNum}}</text>
								</navigator>
								<template v-if="item.post_time || item.uptime">
									<view class="item-data item-time">
										<u-icon name="clock" size="32" color="#999"></u-icon>
										<text class="num">{{(item.post_time || item.uptime) | timeFilter}}</text>
									</view>
								</template>
								
							</view>
						</view>
					</navigator>
					
				</view>
			</view>
			
			<template v-if="endFlag">
				<u-divider bg-color="transparent">没有更多了</u-divider>
			</template>
		</template>
		
		<template v-else>
			<view class="empty">
				<u-loading :show="loading" mode="circle" size="50" color="#007aff"></u-loading>
				<u-empty :show="!loading" text="列表为空" mode="list"></u-empty>
			</view>
		</template>
	</view>
</template>

<script>
	import QAItemTools from '@/components/QAListItemTools/QAListItemTools.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			isIndexList: {
				type: Boolean,
				default: true
			},
			type: {
				type: Number | String,
				default: 0
			},
			loading: {
				type: Boolean,
				default: false
			},
			endFlag: {
				type: Boolean,
				default: false
			},
			isAnswer: {
				type: Number | String,
				default: 0
			},
		},
		
		components: {
			QAItemTools
		},
		data() {
			return {
				dataList: [],
			};
		},
		watch:{
			list(newV) {
				// console.log(newV)
				// this.changeData(newV)
			},
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	.item-footer-tools {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		font-size: 28rpx;
		color: #666;
		
	}
	.num {
		margin-left: 6rpx;
	}
	.tools-item {
		display: flex;
		align-items: center;
	}
	.tools-item .icon-name{
		margin-left: 5px;
	}
	.item-time {
		margin-left: 20rpx;
	}
	.item-data {
		display: flex;
		align-items: center;
		color: #999;
	}
	.empty {
		padding: 80rpx 0;
		background-color: #fff;
		display: flex;
		justify-content: center;
		
	}
	.list-w {
		background-color: #f8f8f8;
	}
	.list-item {
		padding: 20rpx 40rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
	}
	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}
	.user-avatar {
		width: 90rpx;
		height: 90rpx;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.author .user-avatar {
		width: 50rpx;
		height: 50rpx;
	}
	.user-avatar .avatar-img {
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
		margin-bottom: 10rpx;
	}
	.author .user-profile-item {
		margin-bottom: 0;
	}
	.user-name {
		// font-weight: bold;
		font-size: 28rpx;
		margin-right: 10rpx;
	}
	.user-label {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		display: inline-block;
		font-size: 22rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		// font-weight: bold;
		margin-right: 10rpx;
		border: 1rpx solid #54c9ff;
	}
	.user-profile-sub {
		color: #999;
		font-size: 24rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}
	.content {
		font-size: 28rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #666;
		line-height: 48rpx;
		// padding: 10rpx 0;
		// margin-bottom: 10rpx;
		// white-space: pre-wrap;
		// word-break: break-all;
	}
	.post-time {
		color: #999;
		font-size: 26rpx;
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
		margin-right: 5px;
	}
	.q-title {
		color: #666;
		line-height: 50rpx;
	}
	.title {
		font-weight: bold;
		font-size: 30rpx;
		// line-height: 50rpx;
		margin-bottom: 15rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.q-ans-icon {
		color: #999;
		margin-right: 6rpx;
	}
	.noIndex-sub {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #666;
		margin-bottom: 10rpx;
	}
	.sub-title, .sub-time {
		color: $jzb-theme-color;
		display: inline;
		// word-break: break-all;
	}
	
	.noIndex .user-content {
		background-color: #f8f8f8;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.noIndex .content {
		color: $jzb-theme-color;
	}
</style>
