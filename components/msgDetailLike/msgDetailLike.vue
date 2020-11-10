<template>
	<view class="zan">
		<q-a-user-profile
			isFollow
		></q-a-user-profile>
		<view class="sub">
			{{'2020-10-13 13:35:25' | timeFilter}} 赞了你的回复：
		</view>
		<navigator url="/pages/qaDetail/qaDetail" class="reply-title">
			内容内容内容内容内容内容内容
			内容内容内容内容内容内容内容
			内容内容内容内容内容内容内容
			内容内容内容内容内容内容内容
		</navigator>
		
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			QAUserProfile,
		}
	}
</script>

<style scoped lang="scss">
	
	.zan {
		padding: 20rpx 0;
	}
	.item-card {
		background-color: #f8f8f8;
		padding: 20rpx;
		border-radius: 10rpx;
	}
	.item-card-sub {
		padding: 10rpx;
		color: #666;
		display: flex;
		justify-content: space-between;
	}
	.sub {
		padding: 20rpx 10rpx 15rpx;
		color: #999;
	}
	.reply-title {
		font-size: 30rpx;
		line-height: 50rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		background-color: #f2f2f2;
		color: #666;
		padding: 10rpx;
		border-radius: 5rpx;
	}
</style>
