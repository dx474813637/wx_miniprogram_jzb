<template>
	<view class="list">
		<template v-if="!loading && list.length == 0">
			<view class="e">
				<u-empty text="无内容" mode="list"></u-empty>
			</view>
			
		</template>
		<template v-else>
			<navigator
				class="list-item" 
				v-for="(item, index) in list" 
				:key="index"
				:url="`/pages/newsDetail/newsDetail?id=${item.id}`"
			>
				<view class="title" :class="{'weightbold': titleWeight}">{{item.title}}</view>
				<view class="post-date">
					{{item.post_date}}
				</view>
			</navigator> 
			<u-loadmore :status="loadStatus" :icon-type="iconType" :load-text="loadText" />
		</template>
			
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			loading: {
				type: Boolean,
				default: false
			},
			endFlag: {
				type: Boolean,
				default: false
			},
			titleWeight: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			};
		},
		computed: {
			loadStatus() {
				if(this.endFlag) return 'nomore'
				if(this.loading) return 'loading'
				return 'loadmore'
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.list {
		background-color: #f8f8f8;
		padding: 0 20rpx 50rpx;
		height: 100%;
		box-sizing: border-box;
		
		.e {
			padding-top: 80rpx;
		}
		
		.list-item {
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			
			.title {
				// color: $jzb-theme-color;
				color: #333;
				// font-weight: bold;
				line-height: 50rpx;
				font-size: 28rpx;
				margin-bottom: 10rpx;
				&.weightbold {
					font-weight: bold;
				}
			}
			.post-date {
				color: #999;
				font-size: 24rpx;
			}
		}
	}
</style>
