<template>
	<view class="w">
		<view class="header">
			<view class="search-w">
				<search-bar></search-bar>
			</view>
		</view>
		<view class="main">
			<scroll-view class="main-left-nav" scroll-y>
				<view class="left-nav">
					<view 
						class="nav-item"
						:class="{'active': current == index}"
						v-for="(item, index) in navList"
						:key="index"
						@click="handleNavClick(index)"
					>
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<view class="main-right-list">
				<view class="list-label">
					<u-tabs 
						:list="tabsList" 
						height="60" 
						font-size="26" 
						bar-height="4" 
						bar-width="60" 
						:is-scroll="false" 
						:current="tabsCurrent" 
						@change="handleTabsChange"
					></u-tabs>
				</view>
				<scroll-view class="list-box" scroll-y>
					<view class="list">
						<u-cell-group>
							<navigator 
								v-for="(item, index) in dataList"
								:key="index"
								:url="`/pages/homePage/homePage?id=${item.id}`"
							>
								<u-cell-item
									:arrow="false"
								>
									<image 
										class="cell-avator"
										slot="icon" 
										:src="item.pic" 
									/>
									<view class="cell-title" slot="title">
										<text class="name">{{item.name}}</text>
										<!-- <text class="sub" >{{item.sub}}</text> -->
									</view>
									<view class="cell-label" slot="label">
										<text class="label-item" >{{item.title}}</text>
										<!-- <text class="label-item">评分：<text class="label-color">{{item.score}}</text></text>
										<text class="label-item">采访次数：<text class="label-color">{{item.count}}</text></text>
										 -->
										
									</view>
								</u-cell-item>
							</navigator>
							
						</u-cell-group>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import searchBar from '@/components/searchBar/searchBar.vue'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import {sharePage} from '@/utils/sharePage.js'
	export default {
		mixins: [sharePage],
		data() {
			return {
				current: 0,
				tabsCurrent: 0,
				navList: [
					{
						name: '全部',
						value: 0
					},
					{
						name: '零售',
						value: 1
					},
					{
						name: '产业',
						
						
						value: 2
					},
					{
						name: '跨境',
						value: 3
					},
					{
						name: '服务',
						value: 4
					},
					{
						name: '金融',
						value: 5
					},
					{
						name: '物流',
						value: 6
					},
				],
				tabsList: [
					{
						name: '专家',
					},
					{
						name: '公关',
					}
				],
				dataList: [],
				p: 1
			}
		},
		components: {
			tabBar,
			searchBar
		},
		onLoad() {
			this.renderList(this.tabsCurrent + 1)
		},
		methods: {
			async renderList(index) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let params
				params = {p: this.p, cid: index}
				let res = await this.getData(params)
				this.dataList = res.data.list //.filter(ele => ele.)
				uni.hideLoading()
			},
			async getData(params) {
				return await this.$https.get('/Home/Jzbxcx/user_auth_list', {params})
			},
			handleNavClick(index) {
				this.current = index
			},
			handleTabsChange(index) {
				this.tabsCurrent = index
				this.renderList(index + 1)
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.list-box {
		height: calc(100% - 60rpx);
	}
	.list {
		padding-bottom: 40rpx;
	}
	.nav-item {
		width: 100%;
		text-align: center;
		height: 110rpx;
		line-height: 110rpx;
		font-size: 28rpx;
		color: #666;
		position: relative;
		border-bottom: 1rpx solid #f8f8f8;
		transition: all .3s;
	}
	.nav-item.active {
		font-weight: bold;
		color: $jzb-theme-color;
		background-color: $jzb-sup-color;
	}
	.nav-item::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -6rpx;
		width: 6rpx;
		height: 100%;
		margin-top: auto;
		margin-bottom: auto;
		background-color: #fff;
		// border-radius: 0 8rpx 8rpx 0;
		transition: all .3s;
	}
	.nav-item.active::after {
		background-color: $jzb-theme-color;
		left: 0;
	}
	.w {
		height: 100%;
		overflow: hidden;
	}
	.header {
		background-color: #fff;
		padding: 8px 15px 8px;
	}
	.search-w {
		// margin-bottom: 8px;
	}
	.main {
		width: 100%;
		height: calc(100% - 196rpx);
		display: flex;
		
		// background-color: #007AFF;
	}
	.main-left-nav {
		flex: 0 0 140rpx;
		background-color: #fff;
		border-right: 1rpx solid #f8f8f8;
	}
	.main-right-list {
		flex: 1;
	}
	.cell-title {
		display: flex;
	}
	// .cell-label {
	// 	display: flex;
	// 	align-items: center;
	// }
	.cell-label .label-item {
		margin-right: 16rpx;
	}
	.cell-label .label-color {
		color: $jzb-theme-color;
	}
	.sub {
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.cell-avator {
		width: 90rpx;
		height: 90rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.name {
		font-weight: bold;
	}
	.label.rz {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		border-color: #54c9ff;
	}
	.label {
		margin-left: 8rpx;
		background-color: #f8f8f8;
		color: #666;
		display: inline-block;
		font-size: 24rpx;
		line-height: 32rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		font-weight: bold;
		border: 1rpx solid #ccc;
	}
	.label.rz {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		border-color: #54c9ff;
	}
	.sub {
		margin-left: 8rpx;
		color: #999;
	}
</style>
