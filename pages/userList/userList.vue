<template>
	<view class="w">
		<view class="header">
			<view class="search-w">
				<u-subsection 
					:list="subList" 
					:current="subCurrent" 
					height="60" 
					font-size="24"
					@change="subChange"
				></u-subsection>
				<!-- <search-bar></search-bar> -->
			</view>
			<navigator class="search-icon" url="/pages/search/search">
				<u-icon name="search" size="34" color="#999"></u-icon>
			</navigator>
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
						:show-bar="false"
						:is-scroll="false" 
						:current="tabsCurrent" 
						@change="handleTabsChange"
					></u-tabs>
				</view>
				<scroll-view 
					class="list-box" 
					scroll-y
					enable-back-to-top
					@scrolltolower="handleScrollLower"
					
				>
					<view class="list">
						<template v-if="userList.length == 0">
							<view class="empty">
								<u-empty margin-top="100" text="列表为空" mode="list"></u-empty>
							</view>
						</template>
						<template v-else>
							<u-cell-group>
								<u-cell-item
									:arrow="subCurrent == 0 ? true : false"
									v-for="(item, index) in userList"
									:key="index"
									@click="handlePath({id: subCurrent == 0 ?item.poster : item.id, cate: tabsCurrent + 2})"
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
										<text class="label-item" >
											<template v-if="subCurrent == 0">
												{{item.title}}
											</template>
											<template v-else-if="subCurrent == 1">
												<template v-if="tabsCurrent == 0">
													{{item.field}}
												</template>
												<template v-else-if="tabsCurrent == 1">
													{{`${item.company}-${item.position}`}}
												</template>
											</template>
										</text>
										<!-- <text class="label-item">评分：<text class="label-color">{{item.score}}</text></text>
										<text class="label-item">采访次数：<text class="label-color">{{item.count}}</text></text>
										 -->
										
									</view>
								</u-cell-item>
								
							</u-cell-group>
						</template>
						
						
					</view>
					
				</scroll-view>
			</view>
		</view>
		<navigator class="score-top" url="/pages/scoreTop/scoreTop">
			<u-icon name="scoretop" color="#fff" size="40" custom-prefix="custom-icon"></u-icon>
			<view class="score-top-text">活跃榜</view>
		</navigator>
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
						value: ['']
					},
					{
						name: '零售',
						value: ['零售']
					},
					{
						name: '产业',
						value: ['产业']
					},
					{
						name: '跨境',
						value: ['跨境']
					},
					{
						name: '服务',
						value: ['服务']
					},
					{
						name: '金融',
						value: ['金融']
					},
					{
						name: '物流',
						value: ['物流']
					},
					{
						name: '法律',
						value: ['法律']
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
				subList: [
					{
						name: '已激活'
					},
					{
						name: '全部'
					},
				],
				subCurrent: 0,
				dataList: [],
				p: 1,
				flag: true,
				loading: false
			}
		},
		components: {
			tabBar,
			searchBar
		},
		onLoad() {
			this.initData()
		},
		computed: {
			userList() {
				if(this.current == 0) return this.dataList
				let key = this.navList[this.current].value;
				let arr = this.dataList.filter(ele => key.some(item => {
					if(this.tabsCurrent == 1 && this.subCurrent == 1) {
						return ele.lingyu && ele.lingyu.includes(item)
					}
					return ele.field && ele.field.includes(item)
				}) )
				return arr
			}
		},
		methods: {
			async initData() {
				this.p = 1
				this.flag = true
				this.dataList = []
				this.loading = true
				await this.renderList(this.tabsCurrent, this.subCurrent)
				this.loading = false
			},
			async renderList(index, subIndex) {
				if(!this.flag) return 
				uni.showLoading({
					title: '加载中',
				})
				let params
				let data
				let res 
				if(subIndex == 1) {
					params = {p: this.p, cate: index + 2}
					res = await this.getData('/Home/Jzbxcx/ku_list', params)
					data = res.data.list.map(ele => {
						if(this.tabsCurrent == 1 && this.subCurrent == 1) {
							ele.pic = ele.logo || "https://www.100ec.cn/Public/home/images/icon-rw.png"
						}else if(ele.pic_name1 && ele.pic_name1.includes('/Public/attached')){
							ele.pic = 'https://www.100ec.cn' + ele.pic_name1
						}else {
							ele.pic = "https://www.100ec.cn/Public/home/images/icon-rw.png"
						}
						
						if(!ele.field) ele.field = ''
						return ele
					})
				}else if(subIndex == 0) {
					params = {p: this.p, cid: index + 1}
					res = await this.getData('/Home/Jzbxcx/user_auth_list', params)
					data = res.data.list
					
				}
				
				this.dataList = [...this.dataList, ...data]
				
				if(res.data.pages == this.p) {
					this.flag = false
				}
				uni.hideLoading()
				uni.showToast({
					title: '加载成功',
					icon: 'none'
				})
				
			},
			async getData(api, params) {
				return await this.$https.get(api, {params})
			},
			handleNavClick(index) {
				this.current = index
			},
			handleTabsChange(index) {
				this.tabsCurrent = index
				this.initData()
			},
			subChange(index) {
				this.subCurrent = index
				this.initData()
			},
			handlePath(opt) {
				if(this.subCurrent == 0) {
					uni.navigateTo({
						url: `/pages/homePage/homePage?id=${opt.id}`
					})
				}
				if(this.subCurrent == 1) {
					uni.navigateTo({
						url: `/pages/homePageInactive/homePageInactive?id=${opt.id}&cate=${opt.cate}`
					})
				}
				
			},
			async handleScrollLower() {
				if(!this.flag || this.loading) return
				this.loading = true
				this.p += 1
				await this.renderList(this.tabsCurrent, this.subCurrent)
				this.loading = false
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.score-top {
		position: fixed;
		right: 20rpx;
		bottom: 160rpx;
		background-color: #aa00ff;
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
	}
	.score-top-text {
		font-size: 24rpx;
	}
	.search-icon {
		position: absolute;
		top: 0;
		bottom: 0;
		margin-top: auto;
		margin-bottom: auto;
		right: 30rpx;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top-btn {
		position: absolute;
		top: 0;
		bottom: 0;
		margin-top: auto;
		margin-bottom: auto;
		left: 20rpx;
		line-height: 40rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		color: #007AFF;
	}
	.search-w {
		width: 350rpx;
		position: relative;
	}
	.empty {
		background-color: #f8f8f8;
	}
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
		position: relative;
		background-color: #fff;
		padding: 8px 15px 8px;
		display: flex;
		justify-content: center;
		border-bottom: 1rpx solid #f8f8f8;
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
