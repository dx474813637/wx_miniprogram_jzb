<template>
	<view>
		<view class="header">
			<view class="search-w">
				<search-bar></search-bar>
			</view>
			<u-swiper 
				:list="list" 
				:interval="4000" 
				:height="300"
				mode="rect"
				border-radius="15"
				@click="handleNavigator"
			></u-swiper>
		</view>
		
		<view class="content">
			<u-tabs 
				name="cate_name" 
				bar-width="60"
				inactive-color="#999"
				:list="tabs" 
				:is-scroll="false" 
				:current="current"
				@change="tabsChange"
			></u-tabs>
			<qa-list
				:type="current"
				:list="dataList"
			></qa-list>
		</view>
		<view class="add-btn" @click="handleSend">
			{{infoAuthorize.type == 0 ? '提问' : '发声'}}
		</view>
		<rz-select-modal
			:show="rzModalShow"
			@change-flag="handleShowRzBox"
		></rz-select-modal>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import searchBar from '@/components/searchBar/searchBar.vue'
	import qaList from '@/components/QAList/QAList.vue'
	import rzSelectModal from '@/components/rzSelectModal/rzSelectModal.vue'
	
	export default {
		data() {
			return {
				current: 0,
				rzModalShow: false,
				tabs: [
					{
						name: '记者提问'
					},
					{
						name: '专家发声'
					},
				],
				list: [
					{
						image: 'https://www.100ec.cn/zt/upload_data/19s11/images/tout.jpg',
						url: '/pages/search/search'
					},
					{
						image: 'https://www.100ec.cn/zt/upload_data/11_wfgl/images/banner3.jpg',
						url: '/pages/search/search'
					},
					{
						image: 'https://www.100ec.cn/zt/upload_data/19h5/images/top.jpg',
						url: '/pages/search/search'
					}
					
				],
				dataList: [],
				qData: [],
				vData: [],
				allData: []
			}
		},
		components: {
			tabBar,
			searchBar,
			qaList,
			rzSelectModal
		},
		computed: {
			...mapState(['infoAuthorize']),
		},
		watch: {
			current(newV) {
				if(newV == 0 && this.qData.length > 0) {
					this.dataList = this.qData
					return
				}
				else if(newV == 1 && this.vData.length > 0) {
					this.dataList = this.vData
					return
				}
				this.renderList()
			}
		},
		onLoad() {
			this.renderList()
		},
		methods: {
			handleNavigator(index) {
				uni.navigateTo({
					url: this.list[index].url
				})
			},
			tabsChange(index) {
				this.current = index
				// this.renderList()
			},
			async renderList() {
				let res
				if(this.current == 0) {
					res = await this.$https.get('/Home/Jzbxcx/questions_list')
					this.dataList = this.qData = (res.data.list || [])
				}
				else if(this.current == 1) {
					res = await this.$https.get('/Home/Jzbxcx/viewpoint_list')
					this.dataList = this.vData = (res.data.list || [])
				}
				 
				
			},
			handleShowRzBox() {
				this.rzModalShow = !this.rzModalShow
			},
			handleSend() {
				if(this.infoAuthorize.auth_status == 2) {
					uni.navigateTo({
						url: '/pages/send/send?type=' + this.infoAuthorize.type,
					})
				}else {
					this.handleShowRzBox()
				}
					
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.add-btn {
		position: fixed;
		right: 20rpx;
		bottom: 160rpx;
		background-color: $jzb-theme-color;
		border: 8rpx solid #fff;
		color: #fff;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 130rpx;
		height: 130rpx;
		font-size: 30rpx;
		border-radius: 50%;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx rgba(0,0,0,0.1);
	}
	.xx {
		color: $jzb-sup3-color;
	}
	.header {
		background-color: #fff;
		padding: 8px 15px 15px;
		margin-bottom: 15px;
	}
	.search-w {
		margin-bottom: 8px;
	}
	.content {
		background-color: #fff;
	}
</style>
