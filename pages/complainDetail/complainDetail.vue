<template>
	<view class="w">
		<view class="header">
			<skeleton
			  :showAvatar="false"
			  :loading="load"
			  :titleWidth="100"
			  :row="5"
			>
				<view class="title">
					【电诉宝】{{info.title}}
				</view>
				<view class="title-sub">
					<view class="sub-item">
						<u-icon name="map-fill"></u-icon>
						<view class="address">
							{{info.category}}
						</view>
						<view class="time">
							{{info.time1 | timeFilter}}发布
						</view>
					</view>
					<view class="sub-item" @click="handleShare">
						<u-icon name="zhuanfa"></u-icon>
						<view class="">分享</view>
					</view>
				</view>
				<view>
					<text selectable decode space="ensp" class="content">
						{{info.remark2 | personalInfoFilter}}
					</text>
				</view>
			</skeleton>
			
		</view>
		<view class="main-cell">
			<u-cell-group>
				<u-cell-item  title="投诉编号" :value="info.order_num | personalInfoFilter" :arrow="false"></u-cell-item>
				<u-cell-item  title="投诉对象" :value="info.to_company" :arrow="false"></u-cell-item>
				<template v-if="info.money">
					<u-cell-item  title="投诉金额" :value="info.money" :arrow="false"></u-cell-item>
				</template>
				
				<u-cell-item  title="投诉领域" :value="info.remark" :arrow="false"></u-cell-item>
				<u-cell-item  title="投诉类型" :value="info.concrete_area" :arrow="false"></u-cell-item>
				<u-cell-item  title="投诉状态" :value="info.state | dsbStatusToLabel" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="info-step">
			<template v-if="info.state >= 4">
				<view class="step-item">
					<view class="step-img">
						<view class="step-line"></view>
						<u-icon name="star-fill"></u-icon>
					</view>
					<view class="step-title">用户评价</view>
					<view class="step-content">{{info.review | dsbPjToLevel}}</view>
					<view class="step-time">{{info.time4}}</view>
				</view>
			</template>
			<template v-if="info.state >= 3">
				<view class="step-item">
					<view class="step-img">
						<view class="step-line"></view>
						<u-icon name="chat-fill"></u-icon>
					</view>
					<view class="step-title">反馈</view>
					<view class="step-content">平台/商家已回复</view>
					<view class="step-time">{{info.time3}}</view>
				</view>
			</template>
			<template v-if="info.state >= 2">
				<view class="step-item">
					<view class="step-img">
						<view class="step-line"></view>
						<image src="https://www.100ec.cn/Public/home/images/complain/gf.png"></image>
					</view>
					<view class="step-title">电诉宝</view>
					<view class="step-content">已移交 {{info.company_name}}</view>
					<view class="step-time">{{info.time2}}</view>
				</view>
			</template>
			<template v-if="info.state >= 1">
				<view class="step-item">
					<view class="step-img">
						<u-icon name="account-fill"></u-icon>
					</view>
					<view class="step-title">用户</view>
					<view class="step-content">发起投诉</view>
					<view class="step-time">{{info.time1}}</view>
				</view>
			</template>
		</view>
		
		<view class="news-bqsm">
			<view class="">声明：</view>
			<view class="">1.以上内容仅代表投诉者本人，不代表电诉宝投诉立场。</view>
			<view class="">2.如果有人冒充电诉宝投诉工作人员向企业组织或个人实施违法行为，请及时向我们举报，举报邮箱 law@netsun.com。</view>
		</view>
		<share-modal
			:show="shareShow"
			:opt="options"
			:complainFlag="true"
			@change-flag="handleShare"
		></share-modal>
	</view>
</template>

<script>
	import Skeleton from '@/components/skeleton/index.vue'
	import {sharePage} from '@/utils/sharePage.js'
	import shareModal from '@/components/shareModal/shareModal.vue'
	export default {
		mixins: [sharePage],
		data() {
			return {
				id: '',
				info: {},
				stepArr: [],
				shareShow: false,
				options: {},
				load: true
			}
		},
		async onLoad(opt) {
			if(opt.id) {
				uni.showLoading({
					title: '加载中...'
				})
				this.id = opt.id
				await this.renderData(this.id)
				uni.hideLoading()
			}
		},
		components: {
			Skeleton,
			shareModal
		},
		methods: {
			//分享
			handleShare() {
				this.shareShow = !this.shareShow
			},
			async renderData(id) {
				let res = await this.getData(id)
				if(res.data.code == 1) {
					this.info = res.data.list
					this.load = false
					console.log(this)
					this.options = {
						complain: true,
						innerLR: 30,
						innerTB: 30,
						fillColor: '#00aa7f',
						title: '电诉宝 电商维权直通车',
						logo: 'https://www.100ec.cn/Public/home/images/complain/tslogo10.png',
						posterBgUrl: 'https://www.100ec.cn/Public/home/images/dsb_haibao_bg.jpg',
						contentTitle: `【电诉宝】${this.$options.filters['personalInfoFilter'](this.info.title.slice(0, 30))}`,
						contentText: this.$options.filters['personalInfoFilter'](this.info.remark2),
						curPageUrl: getCurrentPages()[getCurrentPages().length - 1]['$page'].fullPath.slice(1),
						kw: [this.info.to_company, this.info.remark, this.info.concrete_area]
					}
				}
			},
			async getData(id) {
				return await this.$https.post('/Home/Jzbxcx/json_315_post_product', {
					f: 'complain_profile',
					id: id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.w {
		.header {
			background-color: #fff;
			margin-bottom: 10rpx;
			padding: 20rpx;
			.title {
				font-size: 36rpx;
				padding: 10rpx 0;
			}
			.title-sub {
				display: flex;
				align-items: center;
				height: 90rpx;
				justify-content: space-between;
				color: #999;
				.sub-item {
					display: flex;
					align-items: center;
				}
				.address {
					padding: 0 20rpx 0 8rpx;
				}
			}
			.content {
				line-height: 55rpx;
				font-size: 30rpx;
			}
		}
		.main-cell {
			margin-bottom: 10rpx;
		}
		.info-step {
			background-color: #fff;
			margin-bottom: 10rpx;
			.step-item {
				position: relative;
				padding: 20rpx 20rpx 40rpx 120rpx;
				height: 200rpx;
				.step-img {
					position: absolute;
					width: 80rpx;
					height: 80rpx;
					top: 20rpx;
					left: 20rpx;
					border-radius: 50%;
					border: 10rpx solid #e7e7e7;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #007AFF;
					font-size: 40rpx;
					.step-line {
						position: absolute;
						top: calc(100% + 10rpx);
						left: 30rpx;
						width: 4rpx;
						height: 120rpx;
						background-color: #e7e7e7;
						&:before {
							content: '';
							position: absolute;
							bottom: -5rpx;
							left: -14rpx;
							width: 0;
							height: 0;
							border-top: 0;
							border-left: 16rpx solid transparent;
							border-right: 16rpx solid transparent;
							border-bottom: 16rpx solid #e7e7e7;
						}
					}
					image {
						width: 70%;
						height: 70%;
					}
				}
				.step-content {
					color: #007AFF;
					padding: 10rpx 0;
				}
				.step-time {
					color: #999;
				}
			}
		}
		.news-bqsm {
			padding: 20rpx;
			font-size: 26rpx;
			line-height: 50rpx;
			color: #999;
			background-color: #fff;
		}
	}
	
	
	
	
	
	// .share {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	padding: 40rpx;
	// }
	// .share-btn {
	// 	width: 80rpx;
	// 	height: 80rpx;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	// border: 1rpx solid #007AFF;
	// 	background-color: #007AFF;
	// 	border-radius: 50%;
	// }
	
	
	
	
	
	
	
	
	
</style>
