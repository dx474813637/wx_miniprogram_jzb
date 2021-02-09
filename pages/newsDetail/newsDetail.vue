<template>
	<view class="news">
		<view class="news-title" v-if="list.title">{{list.title}}</view>
		<view class="news-sub">
			<view class="news-time item-sub" v-if="list.post_date">{{list.post_date | timeFilter}}</view>
			<view class="news-source item-sub" v-if="list.source">来源：{{list.source}}</view>
			<view class="news-author item-sub" v-if="list.author">作者：{{list.author}}</view>
		</view>
		<view class="news-content">
			<u-parse 
				:html="list.text"
				lazy-load
				selectable
				show-with-animation
				:tag-style="tagStyle"
				domain="https://www.100ec.cn"
			></u-parse>
		</view>
		<view class="news-keywords">
			<view 
				class="kw-itme"
				v-for="(item, index) in kwArr"
				:key="index"
			>
				{{item}}
			</view>
		</view>
		<view class="news-bqsm">
			【版权声明】秉承互联网开放、包容的精神，网经社欢迎各方(自)媒体、机构转载、引用我们原创内容，但要严格注明来源网经社；同时，我们倡导尊重与保护知识产权，如发现本站文章存在版权问题，烦请将版权疑问、授权证明、版权证明、联系方式等，发邮件至law@netsun.com，我们将第一时间核实、处理。
		</view>
		<button class="share-btn" open-type="share" @click="handelShareNews">
			<u-icon name="zhuanfa" size="34"></u-icon>
			<text class="share-text">分享</text>
		</button>
	</view>
</template>

<script>
	import {sharePage} from '@/utils/sharePage.js'
	export default {
		mixins: [sharePage],
		data() {
			return {
				sharePageOpt: {},
				id: '',
				kwArr: [],
				list: {},
				tagStyle: {
					h1: 'margin-bottom: 20rpx',
					h2: 'margin-bottom: 20rpx',
					h3: 'margin-bottom: 20rpx',
					h4: 'margin-bottom: 20rpx',
					p: 'line-height: 60rpx;font-size: 32rpx;margin-bottom: 20rpx',
					image: 'margin-bottom: 20rpx'
				}
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.renderData()
		},
		methods: {
			async renderData (){
				uni.showLoading()
				let res = await this.getData()
				
				this.list = res.data.list
				this.sharePageOpt.title = res.data.list.title
				this.kwArr = this.list.keywords.split(' ')
				uni.hideLoading()
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/news_detail', {params: {id: this.id}})
			},
			handelShareNews() {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.news {
		padding: 10rpx 20rpx 80rpx;
		background-color: #fff;
		
		.news-title {
			font-size: 40rpx;
			padding: 10rpx 0;
		}
		
		.news-sub {
			display: flex;
			flex-wrap: wrap;
			color: #999;
			padding: 20rpx 0 20rpx;
			align-items: center;
			// border-bottom: 8rpx double #55aaff;
			
			.item-sub {
				margin-right: 40rpx;
			}
		}
		
		.news-content {
			padding: 0rpx 0 30rpx;
		}
		
		.news-keywords {
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 40rpx;
			// border-bottom: 8rpx double #55aaff;
			// margin-bottom: 40rpx;
			
			.kw-itme {
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				padding: 0rpx 20rpx;
				line-height: 40rpx;
				background-color: $jzb-sup-color;
				// border: 1rpx solid $jzb-theme-color;
				color: $jzb-theme-color;
				border-radius: 22rpx;
				font-size: 24rpx;
				
			}
		}
		
		.news-bqsm {
			// border: 8rpx dotted #55aaff;
			// padding: 20rpx;
			font-size: 26rpx;
			line-height: 50rpx;
			color: #999;
		}
		
		.share-btn {
			position: fixed;
			right: 20rpx;
			bottom: 160rpx;
			background-color: $jzb-theme-color;
			border: 8rpx solid #fff;
			color: #fff;
			// font-weight: bold;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 130rpx;
			height: 130rpx;
			font-size: 30rpx;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0 0 10rpx rgba(0,0,0,0.1);
			
			.share-text {
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
	}
</style>
