<template>
	<view class="list">
		<template v-if="list && list.length > 0">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="user-row">
					<q-a-user-profile
						:userid="item.poster"
						:avatar="item.pic"
						:name="item.name"
						:label="item.type"
						:sub="item.auth_title || item.company"
						:isFollow="false"
					></q-a-user-profile>
				</view>
				<view class="content-sub">
					<view class="post-time">
						{{item.uptime | timeFilter}}
					</view>
				</view>
				<view class="qa-content">
					<u-read-more 
						ref="uReadMore"
						toggle
					>
						<view class="r-content">{{item.intro}}</view>
					</u-read-more>
				</view>
				
				<!-- <view class="qa-reply">
					<view class="qa-reply-item">
						<text>李四</text>回复<text>张三</text>：收到您的回复，致谢！收到您的回复，致谢！收到您的回复，致到您的回复，致谢！收到您的回复，致谢！收到您的回复，致谢！
					</view>
					<view class="qa-reply-item">
						<text>张三</text>回复<text>李四</text>：收到您的回复，致谢！收到您的回复，致谢！收到您的回复，致到您的回复，致谢！收到您的回复，致谢！收到您的回复，致谢！
					</view>
					<view class="qa-reply-footer">
						<navigator url="/pages/search/search">共2条回复></navigator>
					</view>
				</view> -->
					
				<q-a-item-tools
					:isAuthor="false"
					:goods="10"
				></q-a-item-tools>
			</view>
			
		</template>
		<template v-else>
			<view>
				<u-empty text="暂无评论" mode="message"></u-empty>
			</view>
		</template>
			
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue';
	import QAItemTools from '@/components/QAListItemTools/QAListItemTools.vue';
	
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			isAnswer: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		watch: {
			list(newV) {
				// console.log(this)
				this.$nextTick(() => {
					this.$refs.uReadMore.forEach(ele => ele.init());
				})
			}
		},
		components: {
			QAUserProfile,
			QAItemTools
		}
	}
</script>

<style scoped lang="scss">
	
	.r-content {
		line-height: 50rpx;
		font-size: 28rpx;
		white-space: pre-wrap;
	}
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
		margin-bottom: 10rpx;
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
