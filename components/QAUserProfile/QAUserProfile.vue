<template>
	<view class="q-user">
		<navigator :url="userHomePath" class="q-user-item user-avatar">
			<image :src="avatar"></image>
		</navigator>
		<navigator :url="userHomePath" class="q-user-item user-profile">
			<view class="user-profile-item">
				<view class="user-name">{{name}}</view>
				<view class="user-label">{{slabel}}</view>
			</view>
			<view class="user-profile-sub">{{sub}}</view>
		</navigator>
		<view class="q-user-item">
			<u-button v-show="!isFollow" type="primary" size="mini" shape="circle">关注ta</u-button>
			<u-button v-show="isFollow" type="default" size="mini" :plain="true" shape="circle">已关注</u-button>
	
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			userid: {
				type: Number | String,
				default: 0
			},
			avatar: {
				type: String,
				default: 'https://www.100ec.cn/Public/home/images/icon-rw.png'
			},
			name: {
				type: String,
				default: '姓名'
			},
			label: {
				type: String,
				default: '未认证'
			},
			sub: {
				type: String,
				default: '头衔/公司'
			},
			isFollow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		computed: {
			slabel() {
				let label = this.label
				if(label == '未认证') return '未认证'
				if(label == '0') return '记者'
				if(label == '1') return '专家'
				if(label == '2') return '公关'
			},
			userHomePath() {
				return `/pages/homePage/homePage?id=${this.userid}`
			}
		}
	}
</script>

<style scoped lang="scss">
	.q-user {
		display: flex;
		align-items: center;
		// background-color: $jzb-sup2-color;
		// border: 1px solid $jzb-sup3-color;
		// padding: 20rpx;
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
	.user-profile {
		flex: 1
	}
	.user-profile-item {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}
	.user-name {
		font-weight: bold;
		font-size: 34rpx;
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
		border: 2rpx solid #54c9ff;
	}
	.user-profile-sub {
		color: #999;
		font-size: 26rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	
	}
</style>
