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
				:show-bar="false"
				inactive-color="#999"
				:list="tabs" 
				:is-scroll="false" 
				:current="current"
				@change="tabsChange"
			></u-tabs>
			<qa-list
				:type="current"
				:end-flag="endFlag[current]"
				:list="dataList"
				:loading="loading"
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
				loading: false,
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
				p: [1, 1],
				endFlag: [false, false]
			}
		},
		components: {
			tabBar,
			searchBar,
			qaList,
			rzSelectModal
		},
		computed: {
			...mapState(['infoAuthorize', 'phoneReg']),
		},
		watch: {
			current(newV) {
				this.dataList = []
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
		async onPullDownRefresh() {
			console.log('down')
			this.p = [1, 1]
			this.endFlag = [false, false]
			await this.renderList()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if(this.endFlag[this.current]) return
			this.p.splice(this.current, 1, this.p[this.current]+1)
			this.renderList()
			console.log('reach')
		},
		onLoad() {
			this.renderList()
		},
		onShow(){
			if(uni.getStorageSync('indexRefresh')) {
				uni.startPullDownRefresh()
				uni.removeStorageSync('indexRefresh')
			}
			
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
				this.loading = true
				let res
				let p = this.p[this.current]
				if(this.current == 0) {
					res = await this.$https.get('/Home/Jzbxcx/questions_list', {params: {p}})
					this.qData = p == 1 ? res.data.list : this.qData.concat(...res.data.list)
					this.dataList = this.qData
				}
				else if(this.current == 1) {
					res = await this.$https.get('/Home/Jzbxcx/viewpoint_list', {params: {p}})
					this.vData = p == 1 ? res.data.list : this.vData.concat(...res.data.list)
					this.dataList = this.vData
				}
				if(res.data.pages == p) {
					this.endFlag.splice(this.current, 1, true)
				}
				this.$nextTick(() => {
					this.loading = false
				})
				
				 
				
			},
			handleShowRzBox() {
				this.rzModalShow = !this.rzModalShow
			},
			handleSend() {
				if(!this.phoneReg) {
					uni.navigateTo({
						url: '/pages/wxAuthorize/wxAuthorize?phone=1'
					})
					return
				}
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
