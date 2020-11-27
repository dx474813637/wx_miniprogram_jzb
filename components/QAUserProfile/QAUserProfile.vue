<template>
	<view>
		<view class="q-user u-skeleton">
			<navigator :url="userHomePath" class="q-user-item user-avatar u-skeleton-circle">
				<image :src="avatar" class="avatar-img"></image>
			</navigator>
			<navigator :url="userHomePath" class="q-user-item user-profile">
				<view class="user-profile-item u-skeleton-fillet">
					<view class="user-name">{{name}}</view>
					<view class="user-label">{{slabel}}</view>
				</view>
				<view class="user-profile-sub u-skeleton-fillet">{{sub}}</view>
			</navigator>
			<template v-if="phoneReg && followBtn">
				<view class="q-user-item">
					<u-button v-if="!followStatus" type="primary" size="mini" shape="circle" @click="handleEyeFlag(followStatus)">关注ta</u-button>
					<u-button v-else type="default" size="mini" :plain="true" shape="circle" @click="handleEyeFlag(followStatus)">已关注</u-button>
					
				</view>
			</template>
		</view>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
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
			},
			followBtn: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				followStatus: false
			};
		},
		created() {
			this.followStatus = this.isFollow
		},
		watch: {
			isFollow(newV) {
				this.followStatus = newV
			},
		},
		computed: {
			...mapState(['phoneReg']),
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
		},
		methods: {
			async handleEyeFlag(isFollow) {
				let res
				if(isFollow) {
					res = await this.cancelFollowUser(this.userid)
				}else {
					res = await this.followUser(this.userid)
				}
				if(res.data.code == 1) {
					this.followStatus = !isFollow
					uni.showToast({
						title: (isFollow? '取消关注' : '关注成功'),
						icon: 'success',
						duration: 1000,
					})
					setTimeout(() => {
						this.$emit('follow-event')
					}, 1000)
					
				}
			},
			async followUser(userid) {
				return await this.$https.get('/Home/Jzbxcx/follow_user', {params: {id: userid}})
			},
			async cancelFollowUser(userid) {
				return await this.$https.get('/Home/Jzbxcx/follow_cancel', {params: {id: userid}})
			},
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
		width: 80rpx;
		height: 80rpx;
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
	.user-profile {
		flex: 1
	}
	.user-profile-item {
		display: flex;
		align-items: center;
		margin-bottom: 5rpx;
	}
	.user-name {
		font-weight: bold;
		font-size: 30rpx;
		margin-right: 10rpx;
	}
	.user-label {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		display: inline-block;
		font-size: 24rpx;
		padding: 0rpx 16rpx;
		border-radius: 6rpx;
		// font-weight: bold;
		margin-right: 10rpx;
		border: 2rpx solid #54c9ff;
	}
	.user-profile-sub {
		color: #999;
		font-size: 24rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	
	}
</style>
