<template>
	<view class="list-w">
		<template v-if="dataList.length == 0">
			<view class="empty">
				<u-empty text="列表为空" mode="list"></u-empty>
			</view>
		</template>
		
		
		<view class="list-item" v-for="(item, index) in dataList" :key="index">
			
			<template v-if="item.title">
				<navigator :url="`/pages/qaDetail/qaDetail?id=${item.id}&type=${type}`" class="title">{{item.title}}</navigator>
			</template>
			<template v-if="isIndexList">
				<navigator :url="`/pages/homePage/homePage?id=${item.poster}`" class="user-info" :class="{'author': item.title}">
					<view class="user-avatar">
						<image :src="item.pic"></image>
					</view>
					<view class="user-profile">
						<view class="user-profile-item">
							<view class="user-name">{{item.name}}</view>
							<view class="user-label">{{item.type | typeToLabel}}</view>
						</view>
						<view class="user-profile-sub">{{item.auth_title || item.company}}</view>
					</view>
				</navigator>
			</template>
			
			<navigator :url="`/pages/qaDetail/qaDetail?id=${item.id}&type=${type}`" class="user-content">
				<view class="content">{{item.intro}}</view>
				<view class="post-time">{{(item.post_time || item.uptime) | timeFilter}}</view>
			</navigator>
			<template v-if="!item.title">
				
				<navigator :url="`/pages/qaDetail/qaDetail?id=${item.id}&type=${type}`" class="a-to-q-wrap">
					
					<template v-if="isIndexList">
						<view class="q-user-profile">
							<text class="user-name">{{item.q.name}}</text>
							<text class="user-label">{{item.q.label}}</text>
							<text class="user-profile-sub">{{item.q.sub}}</text>
							<u-icon class="q-ans-icon" name="chat" size="28"></u-icon>
							<text class="q-ans-num">{{item.q.answer}}<!-- {{item.isQuestion? '解答' : '留言'}} --></text>
							
						</view>
					</template>
					<view class="q-info">
						<text class="q-label">{{item.end_time? '提问' : '发声'}}</text>
						<text class="q-title">{{item.q_title}}</text>
					</view>
				</navigator>
				<template v-if="isIndexList">
					<q-a-item-tools
						:uid="item.id"
						:type="type"
						:isAuthor="item.title? true : false"
						:goods="item.info.goods"
					></q-a-item-tools>
				</template>
			</template>
			<template v-else-if="isIndexList">
				<q-a-item-tools
					:uid="item.id"
					:type="type"
					:isQ="item.end_time ? true : false"
					:isAuthor="item.title ? true : false"
					:goods="item.info.goods"
					:ansNum="Number(item.reply_num) + (item.comment_num ? Number(item.comment_num) : 0)"
				></q-a-item-tools>
			</template>
		</view>
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
			}
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
				this.changeData(newV)
			}
		},
		created() {
			
			this.changeData(this.list)
		},
		methods: {
			changeData(data) {
				this.dataList = data
			},
		}
	}
</script>

<style scoped lang="scss">
	.empty {
		padding: 80rpx 0;
	}
	.list-w {
		background-color: #f8f8f8;
	}
	.list-item {
		padding: 40rpx 40rpx 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
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
		width: 60rpx;
		height: 60rpx;
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
		margin-bottom: 10rpx;
	}
	.author .user-profile-item {
		margin-bottom: 0;
	}
	.user-name {
		font-weight: bold;
		font-size: 32rpx;
		margin-right: 10rpx;
	}
	.user-label {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		display: inline-block;
		font-size: 24rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		font-weight: bold;
		margin-right: 10rpx;
		border: 1rpx solid #54c9ff;
	}
	.user-profile-sub {
		color: #999;
		font-size: 26rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}
	.content {
		font-size: 30rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #666;
		line-height: 50rpx;
		padding: 10rpx 0;
		white-space: pre-wrap;
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
		font-size: 34rpx;
		line-height: 50rpx;
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
</style>
