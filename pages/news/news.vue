<template>
	<view class="news-page">
		<view class="news-top">
			<navigator url="/pages/newsSearch/newsSearch" class="news-search">
				<u-icon name="search"></u-icon>
			</navigator>
			<u-tabs 
				:list="tabsList" 
				:current="current" 
				bar-width="80"
				:bar-style="barStyle"
				@change="tabsChange"
				:is-scroll="true"
				font-size="28"
				inactive-color="#666"
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
					enable-back-to-top
					scroll-y
					@scrolltolower="handleScrollLower(index)"
					:refresher-enabled="item.refresher"
					:refresher-triggered="item.pullRefresher"
					@refresherpulling="handleRefresherPulling(index)"
				>
					<news-list
						:list="item.list"
						:end-flag="item.endFlag"
						:loading="item.loading"
						titleWeight
					></news-list>
					
					
				</scroll-view>
				
				
			</swiper-item>
		</swiper>
		
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue'
	import {sharePage} from '@/utils/sharePage.js'
	import newsList from "@/components/newsList/newsList.vue"
	export default {
		mixins: [sharePage],
		data() {
			return {
				current: 0,
				tabsList: [
					{
						name: '原创',
						type: 'key_search',
						value: '原创'
					},
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
			tabBar,
			newsList
		},
		onLoad() {
			this.initList()
			this.handleChange(0)
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
				this.list[index].p ? '' : this.list[index].p = 1
				// this.wzApi[this.tabsList[index].type]
				let res
				if(this.tabsList[index].type == 'lm') {
					res = await this.handleGetLmData({
						p: this.list[index].p,
						cid: this.tabsList[index].value
					})
				}
				else if(this.tabsList[index].type == 'key_search') {
					res = await this.handleGetKeySearchData({
						p: this.list[index].p,
						terms: this.tabsList[index].value
					})
				}
				
				//判断是否为下拉刷新决定数据更新类型
				let curData = this.list[index].pullRefresher ? [] : this.list[index].list
				if(curData && curData.length > 0) {
					this.list[index].list = [].concat(...curData, ...res.data.list)
				}else {
					this.list[index].list = res.data.list
					this.list[index].refresher = true
				}
				// this.$set(this.list[index], 'list', res.data.list)
				this.$set(this.list[index], 'loading', false)
				
				uni.hideLoading();
			},
			async handleGetLmData(params) {
				return await this.$https.get('/Home/Jzbxcx/news_list', { params })
			},
			async handleGetKeySearchData(params) {
				return await this.$https.get('/Home/Jzbxcx/searchjsona.html', { params })
			},
			handleScrollLower(index) {
				if(this.list[index].loading) return
				this.list[index].p ++
				this.$set(this.list[index], 'loading', true)
				this.getData(index)
			},
			async handleRefresherPulling(index) {
				if(this.list[index].pullRefresher) return
				this.$set(this.list[index], 'pullRefresher', true)
				this.$set(this.list[index], 'p', 1)
				await this.getData(index)
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
				this.$set(this.list[index], 'pullRefresher', false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.news-page {
		height: 100%;
		overflow: hidden;
		padding-top: 88rpx;
		background-color: #fff;
		
		.news-top {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			box-shadow: 0 0 8rpx rgba(0,0,0,.1);
			padding-right: 70rpx;
			// border-bottom: 1rpx solid #f8f8f8;
			
			.news-search {
				position: absolute;
				right: 0;
				top: 0;
				width: 70rpx;
				height: 84rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
			}
		}
		
		.swiper-w {
			height: calc(100% - 88rpx);
			width: 100%;
			.list {
				background-color: #f8f8f8;
				padding-bottom: 15rpx;
				height: 100%;
				box-sizing: border-box;
			}
		}
		
	}
	
</style>
