<template>
	<view class="detail-w">
		<view class="header">
			<q-a-user-profile></q-a-user-profile>
		</view>
		<view class="content">
			<u-time-line>
				<u-time-line-item>
					<template v-slot:content>
						<view class="content-item-title">
							<text>网经社</text>拒绝了<text>你</text>的邀请。
						</view>
						<view class="content-item-time">
							{{'2020-10-14 13:38:51' | timeFilter}}
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view class="content-item-title">
							<text>网经社</text>同意了<text>你</text>的邀请，对方的手机号为<text>18756874589</text>。
						</view>
						<view class="content-item-time">
							{{'2020-10-14 13:38:51' | timeFilter}}
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view class="content-item-title">
							<text>你</text>拒绝了<text>网经社</text>的邀请。
						</view>
						<view class="content-item-time">
							{{'2020-10-14 13:38:51' | timeFilter}}
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view class="content-item-title">
							<text>你</text>同意了<text>网经社</text>的邀请，对方的手机号为<text>18756874589</text>。
						</view>
						<view class="content-item-time">
							{{'2020-10-14 13:38:51' | timeFilter}}
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view class="content-item-title">
							<text>网经社</text>对<text>你</text>发出互换手机号邀请，等待处理。
						</view>
						<view class="content-item-time">
							{{'2020-10-14 13:38:51' | timeFilter}}
						</view>
						<view class="content-item-do">
							<view class="do-item">
								<u-button type="primary" shape="circle" @click="handleExchangeEvent(true)">同意</u-button>
							</view>
							<view class="do-item">
								<u-button type="error" shape="circle" @click="handleExchangeEvent(false)">拒绝</u-button>
							</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view class="content-item-title">
							<text>你</text>对<text>网经社</text>发出互换手机号邀请，等待对方处理。
						</view>
						<view class="content-item-time">
							{{'2020-10-14 13:38:51' | timeFilter}}
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleExchangeEvent (isAgree) {
				let obj = {
					title: (isAgree? '已同意' : '已拒绝') + '对方的邀请',
					type: isAgree? 'success' : 'warning ',
					callback: () => {
						console.log('over')
					}
				}
				uni.showLoading({
				    title: '正在处理中',
					mask: true,
					success: () => {
						setTimeout(() => {
						    uni.hideLoading();
							this.$refs.uToast.show(obj)
						}, 1000);
					}
				});
				
			}
		},
		components: {
			QAUserProfile,
		}
	}
</script>

<style scoped lang="scss">
.detail-w {
	background-color: #fff;
}
.header {
	border-bottom: 1rpx solid #eee;
	padding: 20rpx;
}
.content {
	padding: 40rpx;
}
.content-item-title {
	color: #666;
	line-height: 40rpx;
	margin-bottom: 10rpx;
}
.content-item-title text{
	color: $jzb-theme-color;
	padding: 0 6rpx;
}
.content-item-time {
	color: #999;
}
.content-item-do {
	display: flex;
	padding: 30rpx 0;
}
.do-item {
	flex: 1;
	padding: 0rpx 10rpx;
}
</style>
