<template>
	<view class="feed">
		<view class="sub">
			{{'2020-10-13 13:35:25' | timeFilter}} 回复了你：
		</view>
		<view class="content">
			<u-read-more ref="uReadMore" toggle close-text="展开" show-height="200">
				<navigator url="/pages/qaDetail/qaDetail"><rich-text :nodes="content"></rich-text></navigator>
			</u-read-more>
		</view>
		<navigator url="/pages/qaDetail/qaDetail" class="reply-title">
			{{content}}
		</navigator>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		data() {
			return {
				content: `内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容`
			};
		},
		components: {
			QAUserProfile,
		}
	}
</script>

<style scoped lang="scss">
	.sub {
		padding: 20rpx 10rpx 15rpx;
		color: #999;
	}
	.content {
		font-size: 30rpx;
		line-height: 50rpx;
		padding: 0 10rpx;
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
	.feed {
		padding: 20rpx 0;
	}
</style>
