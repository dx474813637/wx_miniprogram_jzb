<template>
	<view>
		<view class="tabs-w">
			<u-tabs 
				:list="navList" 
				:is-scroll="false" 
				:current="current" 
				@change="change"
				:show-bar="false"
			>
			</u-tabs>
		</view>
		 
		<view class="list">
			<navigator 
				class="list-item"
				v-for="(item, index) in list"
				:key="index"
				:url="`/pages/qaDetail/qaDetail?id=${item.id}&type=${current}`"
			>
				<view class="title">{{item.title}}</view>
				<view class="title-post-time">{{(item.post_time || item.uptime) | timeFilter}}</view>
			</navigator>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				navList: [
					{
						name: '提问'
					},
					{
						name: '发声'
					}
				],
				list: []
			}
		},
		watch: {
			current(newV) {
				this.renderList()
			}
		},
		onLoad() {
			this.renderList()
		},
		methods: {
			async renderList() {
				this.list = []
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let res = await this.getData({cate: this.current == 1 ? 2 : 1})
				this.list = res.data.list
				uni.hideLoading()
			},
			async getData(params) {
				return await this.$https.get('/Home/Jzbxcx/collection_list', {params})
			},
			change(index) {
				this.current = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		background-color: #fff;
	}
	.list-item {
		border-bottom: 1rpx solid #f8f8f8;
		padding: 30rpx 30rpx 40rpx
	}
	.title {
		font-size: 30rpx;
		line-height: 50rpx;
		margin-bottom: 10rpx;
	}
	.title-post-time {
		font-size: 24rpx;
		color: #666;
	}
</style>
