<template>
	<view>
		<view class="send-info">
			<u-icon name="checkmark-circle-fill" color="#007aff"></u-icon>
			<text>成功发送</text>
		</view>
		<view class="list-w">
			<view class="list-item" v-for="(item, index) in list" :key="index">
				<view class="header">
					<view class="header-item">
						<u-checkbox v-model="item.checked"></u-checkbox>
					</view>
					<view class="header-item info">
						<q-a-user-profile
							:isFollow="item.isFollow"
						></q-a-user-profile>
					</view>
				</view>
				<view class="content">
					{{item.intro}}
				</view>
				<view class="label">
					<view class="label-item" v-for="(ele, i) in item.kwLabel" :key="i">
						{{ele}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="main">	
			<u-button type="primary" @click="handleFindZJ">下一步</u-button>
		</view>	
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		props: {
			// list: {
			// 	type: Array,
			// 	default: () => {
			// 		return []
					
			// 	}
			// }
		},
		data() {
			return {
				list: [
					{	
						name: '网经社0',
						label: '专家',
						sub: '浙江省杭州市某某某公司1',
						isFollow: true,
						intro: `内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
						`,
						kwLabel: ['标签标签1', '标签2', '标签标3', '标签4', '标签4', '标签4', '标签5'],
						checked: false
					},
					{	
						name: '网经社1',
						label: '专家',
						sub: '浙江省杭州市某某某公司2',
						isFollow: false,
						intro: `内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
						`,
						kwLabel: ['标签4', '标签21', '标签32', '标签42', '标签5'],
						checked: false
					},
					{	
						name: '网经社2',
						label: '专家',
						sub: '浙江省杭州市某某某公司2',
						isFollow: false,
						intro: `内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
						`,
						kwLabel: ['标签4', '标签21', '标签32', '标签42', '标签5'],
						checked: false
					},
				]
			};
		},
		components: {
			QAUserProfile
		},
		methods: {
			handleFindZJ() {
				this.$emit('change-step', 2)
			}
		}
	}
</script>

<style scoped lang="scss">
	.send-info text {
		margin-left: 10rpx;
	}
	.send-info {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 150rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		font-size: 36rpx;
		color: $jzb-theme-color;
	}
	.header {
		display: flex;
		align-items: center;
	}
	.list-w {
		background-color: #fff;
		margin-bottom: 160rpx;
	}
	.list-item {
		padding: 30rpx;
	}
	.header-item.info {
		flex: 1
	}
	.content {
		padding-left: 50rpx;
		margin: 20rpx auto;
		line-height: 50rpx;
		font-size: 32rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		color: #666;
	}
	.label {
		display: flex;
		padding-left: 50rpx;
		flex-wrap: wrap;
	}
	.label-item {
		background-color: #f8f8f8;
		color: #666;
		border: 1rpx solid #ddd;
		border-radius: 30rpx;
		display: inline-block;
		padding: 6rpx 18rpx;
		margin-right: 10rpx;
		margin-bottom: 20rpx;
		
	}
	.list-item {
		border-bottom: 1rpx solid #f8f8f8;
	}
	.main {
		padding: 20rpx 40rpx;
		color: #666;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		z-index: 200;
	}
</style>
