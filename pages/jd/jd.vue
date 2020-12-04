<template>
	<view class="w">
		<view class="w-name">
			<view class="name-item">
				<u-icon name="file-text-fill" color="#007aff" size="36"></u-icon>
				<text class="name-title">我的采访解读</text>
				
			</view>
			
		</view>
		
		<view class="w-list">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="item-title">{{item.title}}</view>
				<view class="item-sub">
					<view class="sub-date">
						{{item.post_time | timeFilter}}发出采访邀请
					</view>
					
					
					<view class="sub-status">
						<template v-if="item.zt == 0">
							<template v-if="!item.isTimeLimit">
								<u-icon name="info-circle-fill" color="#f90" size="34"></u-icon>
								<text>待处理</text>
							</template>
							<template v-else>
								<u-icon name="close-circle-fill" color="#bcbcbc" size="34"></u-icon>
								<text>未处理</text>
							</template>
						</template>
						<template v-else-if="item.zt == 1">
							<template v-if="item.intro">
								<u-icon name="info-circle-fill" color="#f90" size="34"></u-icon>
								<text>回复待提交</text>
							</template>
							<template v-else-if="!item.isTimeLimit">
								<u-icon name="edit-pen-fill" color="#007aff" size="34"></u-icon>
								<text>接受待回复</text>
							</template>
							<template v-else>
								<u-icon name="close-circle-fill" color="#d80000" size="34"></u-icon>
								<text>未回复</text>
							</template>
						</template>
						<template v-else-if="item.zt == 2">
							<u-icon name="checkmark-circle-fill" color="#00aa7f" size="34"></u-icon>
							<text>已回复</text>
						</template>
						<template v-else-if="item.zt == 3">
							<u-icon name="close-circle-fill" color="#d80000" size="34"></u-icon>
							<text>已拒绝</text>
						</template>
					</view>
				</view>
				<template v-if="item.zt != 2 && item.zt != 3">
					<view class="item-sub">
						<view class="sub-date">
							<template v-if="!item.isTimeLimit">
								<u-count-down 
									separator="zh" 
									hide-zero-day 
									:timestamp="item.timestamp"
									:show-seconds="false"
									:show-days="item.timestamp > 86400? true : false"
								></u-count-down>后到截稿日期
							</template>
							<template v-else>
								已过截稿日期。
							</template>
							
						</view>
					</view>
				</template>
				
				<view class="item-footer">
					<view class="footer-item">
						<u-button type="primary" plain @click="handleSeeDetail(index)" :custom-style="customStyle">处理详情</u-button>
					</view>
					<view class="footer-item">
						<u-button type="primary" plain @click="handleSeeOrigin(index)" :custom-style="customStyle">查看原文</u-button>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				customStyle: {
					fontSize: '28rpx'
				}
			}
		},
		onShow() {
			this.renderList()
		},
		methods: {
			async renderList() {
				let res = await this.getData()
				// zt 0 邀请中 1接受邀请正在回复 2 完成回复 3拒绝邀请
				this.list = res.data.list.map(ele => {
					let timestamp = Date.parse(new Date(ele.end_time.replace(/-/g,'/'))) - Date.parse(new Date())
					ele.timestamp = timestamp/1000
					ele.isTimeLimit = timestamp > 0 ? false : true
					return ele
				})
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/answer_list')
			},
			handleSeeOrigin(index) {
				let item = this.list[index]
				uni.navigateTo({
					url: `/pages/qaDetail/qaDetail?id=${item.qid}&type=0`
				})
			},
			handleSeeDetail(index) {
				let item = this.list[index]
				uni.navigateTo({
					url: `/pages/jdDetail/jdDetail?id=${item.id}&qid=${item.qid}&zt=${item.zt}`
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.footer-item {
		flex: 0 0 45%
	}
	.item-footer {
		display: flex;
		justify-content: space-between;
		// padding: 20rpx 0;
	}
	.sub-status {
		display: flex;
		align-items: center;
	}
	.sub-status text {
		margin-left: 10rpx;
	}
	.list-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.item-sub {
		display: flex;
		justify-content: space-between;
		margin-bottom: 25rpx;
	}
	.sub-date {
		color: #999;
	}
	.item-title {
		font-weight: bold;
		font-size: 32rpx;
		line-height: 50rpx;
		margin-bottom: 20rpx;
		
	}
	.w {
		background-color: #fff;
		
	}
	.w-name {
		font-size: 30rpx;
		font-weight: bold;
		padding: 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
		display: flex;
		justify-content: space-between;
	}
	.w-name .name-title {
		margin-left: 10rpx;
		color: #333;
	}
</style>
