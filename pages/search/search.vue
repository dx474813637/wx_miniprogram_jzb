<template>
	<view class="s">
		<u-search 
			placeholder="请输入关键词" 
			v-model="keyword"
			shape="round"
			:show-action="false"
			:animation="true"
			margin="20rpx"
			@search="handleSearch"
		></u-search>
		<view class="s-history">
			<view class="s-h-title">
				<view class="s-h-title">历史搜索记录</view>
				<view class="trash-btn" @click="handleTrash">
					<u-icon name="trash"></u-icon>
					<text class="btn-text">全部清除</text>
				</view>
				
			</view>
			<view class="s-h-content">
				<template v-if="keyHis.length > 0">
					<view
						class="key-item" 
						v-for="(item, index) in keyHis"
						:key="index"
						@click="handleKeySearch(item)"
					>{{item}}</view>
				</template>
				<template v-else>
					<view class="empty-res">
						<u-empty text="暂无搜索记录" mode="history" icon-size="60"></u-empty>
					</view>
				</template>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				keyHis: []
			}
		},
		onLoad() {
		},
		onShow() {
			this.keyHis = uni.getStorageSync('jzb_search_history') || []
		},
		methods: {
			handleKeySearch(k) {
				uni.navigateTo({
					url: `/pages/searchRes/searchRes?kw=${k}`
				})
			},
			handleSearch(res) {
				res = res.trim()
				if(!res) return
				let index = this.keyHis.indexOf(res)
				if(index != -1) {
					this.keyHis.splice(index, 1)
				}
				this.keyHis.unshift(res)
				
				
				uni.setStorageSync('jzb_search_history', this.keyHis)
				this.handleKeySearch(res)
			},
			handleTrash() {
				if(this.keyHis.length > 0) uni.showToast({title: '清除成功'})
				this.keyHis = []
				uni.setStorageSync('jzb_search_history', this.keyHis)
			}
		}
	}
</script>

<style scoped lang="scss">
	.s {
		background-color: #fff;
	}
	.s-history  {
		padding: 20rpx;
		border-top: 1rpx solid #f2f2f2;
	}
	.s-h-title {
		color: #666;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}
	.trash-btn {
		color: #999;
		font-size: 24rpx;
	}
	.s-h-content {
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx 0 40rpx;
	}
	.key-item {
		margin-right: 10rpx;
		margin-bottom: 15rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		background-color: #f8f8f8;
		color: #606266;
		padding: 0 20rpx;
	}
	.empty-res {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		width: 100%;
		height: 160rpx;
		border-radius: 20rpx;
		// background-color: #f8f8f8;
	}
</style>
