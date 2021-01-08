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
					<template v-if="item.list && item.list.length > 0">
						<navigator :url="`/pages/complainDetail/complainDetail?id=${ele.id}`"
							class="list-item" 
							v-for="(ele, i) in item.list" 
							:key="i"
						>	
							<view class="title">【电诉宝】{{ele.title}}</view>
							<view class="location">
								<view class="location-item">
									<u-icon name="map-fill" color="#999"></u-icon>
									<view class="address">{{ele.category}}</view>
									<view class="time">{{ele.post_time | timeFilter}} 发布</view>
								</view>
								<view class="location-item">
									<view class="status-label" :class="{'status-one': ele.state == 1, 'status-two': ele.state == 2, 'status-three': ele.state == 3, 'status-four': ele.state == 4}">
										{{ele.state | dsbStatusToLabel}}
										<template v-if="ele.state == 4">
											：{{ele.review | dsbPjToLevel}}
										</template>
									</view>
								</view>
							</view>
							<view class="item-content">
								{{ele.remark2}}
							</view>
						</navigator> 
					</template>
					
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
						type: 'complain',
						value: ''
					},
					{
						name: '已移交',
						type: 'complain',
						value: '2'
					},
					{
						name: '已受理',
						type: 'complain',
						value: '3'
					},
					{
						name: '已评价',
						type: 'complain',
						value: '4'
					},
				],
				list: [
					{list: []},
					{list: []},
					{list: []},
					{list: []}
				],
				wzApi: {
					'complain': '/Home/Jzbxcx/json_315_post_product',
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
			// this.initList()
			this.handleChange(0)
		},
		methods: {
			initList() {
				let len =this.tabsList.length
				for(let i = 0 ; i < len ; i++) {
					this.list.push(null)
				}
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
				if(this.list[index].list.length == 0) this.getData(index)
			},
			async getData(index) {
				if(this.list[index].list.length == 0) {
					uni.showLoading({
						title: '加载中'
					});
					// this.$set(this.list, index, {list: []})
				}
				this.list[index].p ? '' : this.list[index].p = 0
				// this.wzApi[this.tabsList[index].type]
				let res = await this.$https.post('/Home/Jzbxcx/json_315_post_product', {
					f: this.tabsList[index].type,
					page_record: 10,
					p: this.list[index].p,
					state: this.tabsList[index].value
				})
				//判断是否为下拉刷新决定数据更新类型
				let curData = this.list[index].pullRefresher ? [] : this.list[index].list
				if(curData && curData.length > 0) {
					this.$set(this.list[index], 'list', [].concat(...curData, ...res.data.list.pw_rec_list))
				}else {
					this.$set(this.list[index], 'list', res.data.list.pw_rec_list)
					this.$set(this.list[index], 'refresher', true)
				}
				// this.$set(this.list[index], 'list', res.data.list)
				this.$set(this.list[index], 'loading', false)
				// console.log(this.list)
				uni.hideLoading();
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
	.status-label {
		margin-right: 20rpx;
		font-size: 24rpx;
		padding: 8rpx 20rpx;
		border-radius: 8rpx;
	}
	.status-label.status-one {
		background-color: #eeeeee;
		color: #666;
	}
	.status-label.status-two {
		background-color: #fff6ce;
		color: #ee8f00;
	}
	.status-label.status-three {
		background-color: #007aff;
		color: #fff;
	}
	.status-label.status-four {
		background-color: #00aa7f;
		color: #fff;
	}
	.address {
		padding: 0 10rpx;
	}
	.location {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
		color: #999;
	}
	.location-item {
		display: flex;
		align-items: center;
	}
	.item-content {
		font-size: 28rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #666;
		line-height: 48rpx;
	}
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
		box-shadow: 0 0 8rpx rgba(0,0,0,.1);
		// border-bottom: 1rpx solid #f8f8f8;
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
		// color: $jzb-theme-color;
		color: #333;
		font-weight: bold;
		line-height: 50rpx;
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.post-date {
		color: #999;
		font-size: 24rpx;
	}
</style>
