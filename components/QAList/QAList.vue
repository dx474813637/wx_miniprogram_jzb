<template>
	<view class="list-w" :class="{'noIndex': !isIndexList}">
		
		<template v-if="dataList.length > 0">
			<view class="list-item" v-for="(item, index) in dataList" :key="index">
				<template v-if="!isIndexList">
					<view class="noIndex-sub">
						Ta于
						<text class="sub-time">{{(item.post_time || item.uptime) | timeFilter}}</text>
						{{isAnswer ? '解读' : '发布'}}了采访提问：
						<navigator :url="`/pages/qaDetail/qaDetail?id=${item.qid || item.id}&type=${type}`" class="sub-title">{{item.title}}</navigator>
					</view>
				</template>
				<template v-if="item.title && isIndexList">
					<navigator :url="`/pages/qaDetail/qaDetail?id=${item.id}&type=${type}`" class="title">{{item.title}}</navigator>
				</template>
				<template v-if="isIndexList">
					<navigator :url="`/pages/homePage/homePage?id=${item.poster}`" class="user-info" :class="{'author': item.title}">
						<view class="user-avatar">
							<image :src="item.pic" class="avatar-img"></image>
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
				
				<navigator :url="`/pages/qaDetail/qaDetail?id=${item.qid || item.id}&type=${type}`" class="user-content">
					<view class="content">{{item.intro}}</view>
					<template v-if="isIndexList">
						<view class="post-time">{{(item.post_time || item.uptime) | timeFilter}}</view>
					</template>
				</navigator>
				
				<template v-if="isIndexList">
					<q-a-item-tools
						:uid="item.id"
						:type="type"
						:isQ="item.end_time ? true : false"
						:isAuthor="true"
						:ansNum="item.ansNum"
					></q-a-item-tools>
				</template>
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
				load: true
			};
		},
		watch:{
			list(newV) {
				this.changeData(newV)
			}
		},
		created() {
			setTimeout(() => {
				this.load = false;
			}, 2000)
			this.changeData(this.list)
		},
		methods: {
			changeData(data) {
				if(this.isIndexList) {
					if(this.type == 0) {
						this.dataList = data.map(ele => {
							let arr = ele.reply_list.filter(item => item.zt == 2)
							ele.ansNum = Number(ele.comment_num) + arr.length
							return ele
						})
					}
					else if(this.type == 1) {
						this.dataList = data.map(ele => {
							ele.ansNum = ele.reply_num
							return ele
						})
					}
				}else {
					this.dataList = data
				}
				
			},
		}
	}
</script>

<style scoped lang="scss">
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
		// padding: 10rpx 0;
		margin-bottom: 10rpx;
		white-space: pre-wrap;
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
