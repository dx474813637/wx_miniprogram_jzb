<template>
	<view class="list">
		<view class="list-item">
			<view class="user-row">
				<q-a-user-profile></q-a-user-profile>
			</view>
			<view class="qa-content">
				<u-read-more ref="uReadMore">
					<rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
			<view class="content-sub">
				<view class="post-time">
					{{'2020-10-8 8:28:17' | timeFilter}}
				</view>
			</view>
			
			<view class="qa-reply">
				<view class="qa-reply-item">
					<text>李四</text>回复<text>张三</text>：收到您的回复，致谢！收到您的回复，致谢！收到您的回复，致到您的回复，致谢！收到您的回复，致谢！收到您的回复，致谢！
				</view>
				<view class="qa-reply-item">
					<text>张三</text>回复<text>李四</text>：收到您的回复，致谢！收到您的回复，致谢！收到您的回复，致到您的回复，致谢！收到您的回复，致谢！收到您的回复，致谢！
				</view>
				<view class="qa-reply-footer">
					<navigator url="/pages/search/search">共2条回复></navigator>
				</view>
			</view>
			
			<q-a-item-tools
				:isAuthor="false"
				:goods="10"
			></q-a-item-tools>
		</view>
		
			<view class="list-item">
				<view class="user-row">
					<q-a-user-profile></q-a-user-profile>
				</view>
				<view class="qa-content">
					<u-read-more ref="uReadMore">
						<rich-text :nodes="content"></rich-text>
					</u-read-more>
				</view>
				<view class="content-sub">
					<view class="post-time">
						{{'2020-10-9 8:28:17' | timeFilter}}
					</view>
				</view>
				
				<view class="qa-reply">
					<view class="qa-reply-item">
						<text>李四</text>回复<text>张三</text>：收到您的回复，致谢！收到您的回复，致谢！收到您的回复，致到您的回复，致谢！收到您的回复，致谢！收到您的回复，致谢！
					</view>
					<view class="qa-reply-item">
						<text>张三</text>回复<text>李四</text>：收到您的回复，致谢！收到您的回复，致谢！收到您的回复，致到您的回复，致谢！收到您的回复，致谢！收到您的回复，致谢！
					</view>
					<view class="qa-reply-footer">
						<navigator url="/pages/search/search">共2条回复></navigator>
					</view>
				</view>
				
				<q-a-item-tools
					:isAuthor="false"
					:goods="10"
				></q-a-item-tools>
			</view>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue';
	import QAItemTools from '@/components/QAListItemTools/QAListItemTools.vue';
	
	export default {
		data() {
			return {
				content: `内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容`
			};
		},
		components: {
			QAUserProfile,
			QAItemTools
		}
	}
</script>

<style scoped lang="scss">
	.qa-reply {
		background-color: $jzb-bg-color;
		padding: 15rpx;
		border-radius: 10rpx;
		color: #666;
		font-size: 30rpx;
	}
	.qa-reply-item {
		line-height: 50rpx;
		margin-bottom: 10rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.qa-reply-item text {
		color: $jzb-theme-color;
	}
	.qa-reply-footer {
		text-align: right;
		color: $jzb-theme-color;
	}
	.list-item {
		padding: 20rpx 0;
		margin-bottom: 30rpx;
		border-bottom: 2rpx solid #f2f2f2;
	}
	.user-row {
		margin-bottom: 20rpx;
	}
	.qa-content {
		font-size: 36rpx;
		line-height: 55rpx;
		// overflow : hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 8;
		// -webkit-box-orient: vertical;
	}
	.content-sub {
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		align-items: center;
	}
	.post-time {
		color: #999;
	}
	.more-btn {
		font-weight: bold;
		color: $jzb-theme-color;
		font-size: 30rpx;
	}
</style>
