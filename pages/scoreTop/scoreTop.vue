<template>
	<view class="score-top">
		<view class="sub-header">
			<u-subsection 
				:list="subList" 
				:current="subCurrent"
				@change="subChange"
				height="60" 
			></u-subsection>
		</view>
		
		<u-tabs 
			:list="tabsList" 
			:is-scroll="false" 
			:current="tabsCurrent" 
			@change="tabsChange"
			:show-bar="false"
		></u-tabs>
		<view class="main">
			<view class="rank">
				<view 
					class="rank-item"
					v-for="(item, index) in topData"
					:key="index"
					:class="{'one': index == 1, 'two': index == 0, 'three': index == 2}"
				>	
					<view class="one-bg" v-if="index == 1"></view>
					<view class="avatar-bg">
						<view class="avatar-bg-icon">
							<u-icon name="wg" custom-prefix="custom-icon"></u-icon>
						</view>
						<u-image 
							:src="item.pic || 'https://www.100ec.cn/Public/home/images/icon-rw.png'"
							shape="circle"
							height="100%"
						></u-image>
					</view>
					<view class="name">
						{{item.name || '虚位以待'}}
					</view>
					<view class="score">
						{{item.total || '--'}}分
					</view>
				</view>
			</view>
			<view class="rank-list">
				<view 
					class="list-item"
					v-for="(item, index) in dataList.slice(3)"
					:key="index"
				>
					<view class="item-v list-rank-num">
						{{index+4}}
					</view>
					<view class="item-v list-avatar">
						<u-image
							height="100%"
							shape="circle"
							lazy-load
							:src="item.pic || 'https://www.100ec.cn/Public/home/images/icon-rw.png'"
						>
							<u-loading slot="loading" mode="flower"></u-loading>
						</u-image>
					</view>
					<view class="item-v list-name">
						{{item.name}}
					</view>
					<view class="item-v list-score">
						{{item.total}}分
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {sharePage} from '@/utils/sharePage.js'
	export default {
		mixins: [sharePage],
		data() {
			return {
				sharePageOpt:{
					title: '【媒公宝】活跃用户排行榜'
				},
				subList: [
					{
						name: '周榜',
						time: 7
					},
					{
						name: '月榜',
						time: 30
					},
					{
						name: '总榜',
						time: ''
					},
				],
				tabsList: [
					{
						name: '记者',
						cate: 1
					}, 
					{
						name: '专家',
						cate: 2
					}, 
					{
						name: '公关',
						cate: 3
					},
				],
				tabsCurrent: 1,
				subCurrent: 0,
				dataList: []
			}
		},
		onLoad() {
			this.dataInit()
		},
		computed: {
			topData() {
				let data = this.dataList.slice(0, 3)
				if(data.length < 3) {
					for(let i = 0; 3 - data.length; i++) {
						data.push({})
					}
				}
				let arr = Array(3)
				arr[1] = data[0]
				arr[0] = data[1]
				arr[2] = data[2]
				
				return arr
			}
		},
		methods: {
			tabsChange(index) {
				this.tabsCurrent = index
				this.dataInit()
			},
			subChange(index) {
				this.subCurrent = index
				this.dataInit()
			},
			async dataInit() {
				uni.showLoading({
					title: '加载中'
				})
				await this.renderList()
				uni.hideLoading()
			},
			async renderList() {
				let res = await this.getData()
				if(res.data.code == 1) {
					this.dataList = res.data.list
				}
				
			},
			async getData() {
				return await this.$https.post('/Home/Jzbxcx/top_score', {
					cate: this.tabsList[this.tabsCurrent].cate,
					time: this.subList[this.subCurrent].time,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.score-top {
		background-color: #fff;
		
		.sub-header {
			margin: 0 auto;
			padding: 20rpx 20% 0;
		}
		
		.main {
			padding: 20rpx;
			
			.rank {
				display: flex;
				// border: 1rpx solid #eee;
				border-bottom: 0;
				border-radius: 30rpx 30rpx 0 0 ;
				box-shadow: 0 -20rpx 30rpx rgba(0,0,0,.1);
				.rank-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-end;
					// border: 1rpx solid #eee;
					// border-bottom: 0;
					padding: 50rpx 0 30rpx;
					position: relative;
					&.one {
						.avatar-bg {
							width: 160rpx;
							height: 160rpx;
							border-color: #ffd832;
							.avatar-bg-icon {
								color: #ffd832;
								font-size: 30rpx;
							}
						}
						
					}
					&.two {
						.avatar-bg {
							border-color: #cddef3;
							.avatar-bg-icon {
								color: #cddef3;
							}
						}
						
					}
					&.three {
						.avatar-bg {
							border-color: #f6b383;
							.avatar-bg-icon {
								color: #f6b383;
							}
						}
					}
					.one-bg {
						position: absolute;
						left: 0;
						top: -20rpx;
						width: 100%;
						height: 100%;
						box-shadow: 0 -10rpx 15rpx rgba(0,0,0,.1);
						border-radius: 20rpx 20rpx 0 0 ;
						background-color: #fff;
					}
					.avatar-bg {
						position: relative;
						width: 120rpx;
						height: 120rpx;
						border: 6rpx solid #eee;
						border-radius: 50%;
						z-index: 200;
						.avatar-bg-icon {
							position: absolute;
							top: -36rpx;
							left: 0;
							right: 0;
							margin-left: auto;
							margin-right: auto;
							// width: 40rpx;
							height: 40rpx;
							display: flex;
							justify-content: center;
						}
					}
					.name {
						position: relative;
						z-index: 200;
						padding: 20rpx 0 10rpx;
					}
					.score {
						position: relative;
						z-index: 200;
						font-size: 24rpx;
					}
				}
			}
			.rank-list {
				padding: 0 20rpx;
				.list-item {
					display: flex;
					align-items: center;
					height: 100rpx;
					.item-v{
						&.list-rank-num {
							padding-right: 20rpx;
							font-size: 30rpx;
							
						}
						&.list-rank-num, 
						&.list-score {
							color: #999;
						}
						&.list-name {
							flex: 1;
							padding: 0 20rpx;
						}
						&.list-avatar {
							position: relative;
							width: 80rpx;
							height: 80rpx;
							border: 6rpx solid #eee;
							border-radius: 50%;
							z-index: 200;
						}
					}
				}
			}
			
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
</style>
