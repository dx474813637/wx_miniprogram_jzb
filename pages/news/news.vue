<template>
	<view class="news-page">
		<view class="news-top">
			<u-tabs 
				:list="tabsList" 
				:current="current" 
				bar-width="80"
				:bar-style="barStyle"
				@change="tabsChange"
				:is-scroll="true"
			></u-tabs>
		</view>
		<swiper 
			:current="current"
			class="swiper-w"
			@change="swiperChange"
		>
			<swiper-item
				v-for="(item, index) in list"
				:key="index"
			>	
				<scroll-view 
					class="list" 
					scroll-y
					@scrolltolower="handleScrollLower(index)"
				>
					<navigator :url="`/pages/newsDetail/newsDetail?id=${ele.id}`"
						class="list-item" 
						v-for="(ele, i) in item.list" 
						:key="i"
					>
						<view class="title">{{ele.title}}</view>
						<view class="post-date">
							{{ele.post_date}}
						</view>
					</navigator> 
					<view class="loading">
						<u-loading :show="item.loading" size="40" mode="circle"></u-loading>
					</view>
					
				</scroll-view>
				
				
			</swiper-item>
		</swiper>
		
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue'
	import {sharePage} from '@/utils/sharePage.js'
	export default {
		mixins: [sharePage],
		data() {
			return {
				current: 0,
				tabsList: [
					{
						name: '最新',
						type: 'lm',
						value: ''
					},
					{
						name: '新零售',
						type: 'lm',
						value: '92'
					},
					{
						name: 'B2C研究',
						type: 'lm',
						value: '33'
					},
					{
						name: 'B2C动态',
						type: 'lm',
						value: '21'
					},
					{
						name: '进口电商',
						type: 'lm',
						value: '27'
					},
					{
						name: '出口电商',
						type: 'lm',
						value: '28'
					},
					{
						name: '电商人物',
						type: 'lm',
						value: '20'
					},
					{
						name: '行业研究',
						type: 'lm',
						value: '24'
					},
					{
						name: '行业动态',
						type: 'lm',
						value: '22'
					},
					{
						name: '投诉案例',
						type: 'lm',
						value: '110'
					},
					{
						name: '买家实操',
						type: 'lm',
						value: '31'
					},
					{
						name: '物流科技',
						type: 'lm',
						value: '44'
					},
					{
						name: '在线教育',
						type: 'lm',
						value: '15'
					},
				],
				list: [],
				wzApi: {
					'lm': '/searchjsonb.html',
					'title': '/searchjson.html'
				},
				barStyle: {
					borderRadius: '15rpx 15rpx 0 0'
				}
			}
		},
		components: {
			tabBar
		},
		onLoad() {
			this.initList()
			this.handleChange(0)
			this.$https.get('/Home/Jzbxcx/category')
		},
		methods: {
			initList() {
				this.list.length =this.tabsList.length
			},
			tabsChange(index) {
				this.current = index
			},
			swiperChange(e) {
				this.current = e.detail.current
				uni.hideLoading();
				this.handleChange(this.current)
			},
			handleChange(index) {
				if(!this.list[index]) this.getData(index)
			},
			async getData(index) {
				if(!this.list[index]) {
					uni.showLoading({
						title: '加载中'
					});
					this.list.splice(index, 1, {list: []})
				}
				let curData = this.list[index].list
				this.list[index].p ? '' : this.list[index].p = 1
				// this.wzApi[this.tabsList[index].type]
				let res = await this.$https.get('/Home/Jzbxcx/news_list', {
					params: {
						p: this.list[index].p,
						cid: this.tabsList[index].value
						// n: curData.length + 10,
						// terms: this.tabsList[index].value
					}
				})
				if(curData && curData.length > 0) {
					this.list[index].list = [].concat(...curData, ...res.data.list)
				}else {
					this.list[index].list = res.data.list
				}
				// this.$set(this.list[index], 'list', res.data.list)
				this.$set(this.list[index], 'loading', false)
				uni.hideLoading();
			},
			handleScrollLower(index) {
				if(this.list[index].loading) return
				this.list[index].p ++
				this.$set(this.list[index], 'loading', true)
				this.getData(index)
			}
		}
	}
</script>

<style scoped lang="scss">
	.loading  {
		display: flex;
		justify-content: center;
		padding-bottom: 80rpx;
	}
	.news-top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.news-page {
		height: 100%;
		overflow: hidden;
		padding-top: 95rpx;
		background-color: #fff;
	}
	.swiper-w {
		height: calc(100% - 100rpx);
		width: 100%;
	}
	.list {
		background-color: #f8f8f8;
		padding: 0 20rpx 15rpx;
		height: 100%;
		box-sizing: border-box;
	}
	.list-item {
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.title {
		color: $jzb-theme-color;
		// font-weight: bold;
		line-height: 50rpx;
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.post-date {
		color: #999;
		font-size: 24rpx;
	}
</style>
