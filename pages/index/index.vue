<template>
	<view>
		<view class="header">
			<view class="search-w">
				<search-bar></search-bar>
			</view>
			<u-swiper 
				:list="topList" 
				:interval="4000" 
				:height="300"
				title
				border-radius="15"
				@click="handleNavigator"
				mode="number"
				indicator-pos="topRight"
			></u-swiper>
		</view>
		
		<view class="content" >
			<u-tabs 
				name="cate_name" 
				:show-bar="false"
				inactive-color="#999"
				:list="tabs" 
				:is-scroll="false" 
				:current="current"
				@change="tabsChange"
			></u-tabs>
				
			<view
				:style="{'display': current == i? 'block':'none'}"
				v-for="(item, i) in swiperData"
				:key="i"
			>	
					<qa-list
						:type="i"
						:end-flag="item.endFlag"
						:list="item.data"
						:loading="item.loading"
					></qa-list>

			</view>
		</view>
		<template v-if="!freshShow">
			<view class="add-btn" @click="handleSend">
				<u-icon name="plus" color="#fff" size="40"></u-icon>
				<view class="add-btn-text">
					{{infoAuthorize.type == 0 ? '提问' : '发声'}}
				</view>
				
			</view>
		</template>
		<template v-else>
			<view class="add-btn" @click="handleFresh">
				<u-icon name="reload" color="#fff" size="40"></u-icon>
				<view class="add-btn-text">刷新</view>
			</view>
		</template>
		
		<rz-select-modal
			:show="rzModalShow"
			@change-flag="handleShowRzBox"
		></rz-select-modal>
		<new-msg-box
			:show="mixinMsgShow"
			@change-modal-flag="changeModalFlag"
		></new-msg-box>
		<u-top-tips ref="uTips"></u-top-tips>
		<wx-authorize-modal></wx-authorize-modal>
		<tab-bar></tab-bar>
		
	</view>
</template>

<script>
	import {sharePage} from '@/utils/sharePage.js'
	import {mixinMsg} from '@/utils/mixin_msg.js'
	import {mapState} from 'vuex'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import searchBar from '@/components/searchBar/searchBar.vue'
	import newMsgBox from '@/components/newMsgBox/newMsgBox.vue'
	import qaList from '@/components/QAList/QAList.vue'
	import rzSelectModal from '@/components/rzSelectModal/rzSelectModal.vue'
	 
	export default {
		mixins: [sharePage, mixinMsg],
		data() {
			return {
				current: 0,
				rzModalShow: false,
				loading: false,
				tabs: [
					{
						name: '记者提问',
					},
					{
						name: '专家发声'
					},
				],
				list: [],
				topList: [],
				dataList: [],
				swiperData: [
					{
						data: [],
						api: 'questions_list',
						loading: false,
						p: 1,
						endFlag: false,
						scroll: false
					},
					{
						data: [],
						api: 'viewpoint_list',
						loading: false,
						p: 1,
						endFlag: false,
						scroll: false
					}
				],
				qData: [],
				vData: [],
				p: [1, 1],
				endFlag: [false, false],
				wH: 0,
				freshShow: false
			}
		},
		components: {
			tabBar,
			searchBar,
			qaList,
			rzSelectModal,
			newMsgBox
		},
		computed: {
			...mapState(['infoAuthorize', 'phoneReg']),
		},
		watch: {
			current(newV) {
				let obj = this.swiperData[newV]
				if(obj.data.length>0 || obj.endFlag) return
				this.renderList()
			}
		},
		async onPullDownRefresh() {
			// console.log('down')
			this.swiperData.forEach(ele => {
				this.$set(ele, 'data', [])
				this.$set(ele, 'p', 1)
				this.$set(ele, 'endFlag', false)
			})
			// let obj = this.swiperData[this.current]
			// obj.p = 1
			// obj.endFlag = false
			// this.$set(obj, 'data', [])
			await this.renderList()
			uni.stopPullDownRefresh()
			this.$refs.uTips.show({
				title: '刷新成功',
				type: 'success',
				duration: '2000'
			})
		},
		onReachBottom() {
			let obj = this.swiperData[this.current]
			if(obj.endFlag || obj.loading) return
			obj.p++
			this.renderList()
			// console.log('reach')
		},
		onLoad() {
			this.getSwiperData()
			this.renderList()
		},
		onShow(){
			if(uni.getStorageSync('indexRefresh')) {
				uni.startPullDownRefresh()
				uni.removeStorageSync('indexRefresh')
			}
			
		},
		onPageScroll(res) {
			res.scrollTop > 700 ? this.freshShow = true : this.freshShow = false
		},
		methods: {
			handleFresh() {
				uni.pageScrollTo({
					scrollTop: 0,
					success: () => {
						uni.startPullDownRefresh()
					}
				})
				
			},
			handleNavigator(index) {
				uni.navigateTo({
					url: this.topList[index].url
				})
			},
			tabsChange(index) {
				this.current = index
				// this.renderList()
			},
			async getSwiperData() {
				let res = await Promise.all([
					this.$https.get('/Home/Jzbxcx/topping_list', {params: {cate: 1}})
					,this.$https.get('/Home/Jzbxcx/topping_list', {params: {cate: 2}})
					,this.$https.get('/Home/Jzbxcx/topping_list', {params: {cate: 3}})
				])
				res.forEach((ele, index) => {
					if(ele.data.code == 1) {
						this.topList.push(...ele.data.list.map(item => {
							item.image = 'https://www.100ec.cn' + item.pic
							if(index == 0) {
								item.url = `/pages/newsDetail/newsDetail?id=${item.id}`
							}else if(index == 1) {
								item.url = `/pages/qaDetail/qaDetail?id=${item.id}&type=0`
							}else if(index == 2) {
								item.url = `/pages/qaDetail/qaDetail?id=${item.id}&type=1`
							}
							
							return item
						}))
					}
				})
				
			},
			async renderList() {
				// this.loading = true
				let res
				let index = this.current
				let obj = this.swiperData[index]
				let api = '/Home/Jzbxcx/' + obj.api
				let p = obj.p
				let data = obj.data
				this.$set(obj, 'loading', true)
				res = await this.$https.get(api, {params: {p}})
				if(res.data.code == 1) {
					let resData = res.data.list.map(ele => {
						if(index == 1) {
							ele.ansNum = ele.reply_num
						}else {
							let arr = ele.reply_list.filter(el => el.zt == 2)
							ele.ansNum = Number(ele.comment_num) + arr.length
						}
						return ele
					})
					if(obj.p == 1) obj.data = []
					obj.data.push(resData)
					// this.$set(obj.data, p - 1, resData)
				}
				
				if(res.data.pages == p) {
					// obj.endFlag = true
					this.$set(obj, 'endFlag', true)
				}
				// console.log(this.endFlag)
				this.$nextTick(() => {
					// setTimeout(() => {
						this.$set(obj, 'loading', false)
					// }, 1000)
					
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
	.list {
		height: 100%;
	}
	.swiper-w {
		height: 100%;
		width: 100%;
	}
	.add-btn {
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
	}
	.add-btn-text {
		font-size: 24rpx;
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
