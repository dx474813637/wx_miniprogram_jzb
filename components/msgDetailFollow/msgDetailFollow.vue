<template>
	<view>
		<view class="item-card">
			<q-a-user-profile
				isFollow
			></q-a-user-profile>
		</view>
		<view class="item-card-sub">
			<view class="sub-item">
				{{'2020-10-13 11:57:29' | timeFilter}} 关注了你
			</view>
		</view>
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
</style>
