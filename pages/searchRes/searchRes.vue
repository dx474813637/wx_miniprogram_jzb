<template>
	<view class="s">
		<view class="s-w">
			<u-search 
				placeholder="请输入关键词" 
				v-model="kw"
				shape="round"
				:show-action="false"
				:animation="true"
				@search="handleSearch(true)"
			></u-search>
		</view>
		<view class="res">
			<u-sticky>
				<u-tabs
					:list="navList" 
					:is-scroll="false" 
					:current="current" 
					:show-bar="false"
					@change="tabsChange"
				></u-tabs>
			</u-sticky>
			<template v-if="cpyRes.name && current == 0">
				<view class="card-box">
					<view class="icard">
						<view class="title">
							<view class="title-item item-main">企业&平台</view>
						</view>
						<view class="content" @click="handleToWebview">
							<view class="cpy-info">
								<view class="cpy-name">
									{{cpyRes.name}}
								</view>
								<view class="cpy-main">
									{{cpyRes.shares}}
								</view>
								<view class="cpy-icon">
									<u-icon name="youjiantou" size="28" color="#999999" custom-prefix="custom-icon"></u-icon>
								</view>
								
							</view>
							<view class="cpy-info">
								<view class="cpy-content">
									{{cpyRes.a103}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</template>
			
			<view
				v-for="(item, index) in navList"
				:key="index"
				:class="{'hide': current != 0 && current != index}"
			>
				<search-res-list
					:index="current"
					:list="dataList[item.dataIndex].data"
					:typeIndex="index"
					:type="navList[index].type"
					:val="navList[index].value"
					:label="navList[index].name"
					:all-user-res="allUserRes[navList[index].value]"
					@change-current="tabsChange"
					:load-status="loadStatus"
				></search-res-list>
				
			</view>
			
			<template v-if="current == 0 && navList[0].count == 0">
				<u-empty text="没有搜索结果" mode="search" margin-top="80"></u-empty>
			</template>
			
		</view>
	</view>
</template>

<script>
	import searchResList from '@/components/searchResList/searchResList'
	export default {
		data() {
			return {
				kw: '',
				current: 0,
				navList: [
					{
						name: '全部',
						count: null
					},
					{
						name: '提问',
						count: 0,
						dataIndex: 1,
						type: 'question'
					},
					{
						name: '发声',
						count: 0,
						dataIndex: 2,
						type: 'viewpoint'
					},
					{
						name: '专家',
						value: 1,
						count: 0,
						dataIndex: 0,
						type: 'user'
					},
					{
						name: '记者',
						value: 0,
						count: 0,
						dataIndex: 0,
						type: 'user'
					},
					{
						name: '公关',
						value: 2,
						count: 0,
						dataIndex: 0,
						type: 'user'
					},
				],
				dataList: [
					{
						data: [], //user
						loading: false
					},
					{
						data: [], //q
						p: 1,
						endFlag: false,
						loading: false
					},
					{
						data: [], //vp
						p: 1,
						endFlag: false,
						loading: false
					},
				],
				uList: [],
				qList: [],
				fList: [],
				cpyRes: {},
				allUserRes: [
					{ 
						list:[],
						p: 1,
						endFlag: false,
						loading: false
					},
					{ 
						list:[],
						p: 1,
						endFlag: false,
						loading: false
					},
					{ 
						list:[],
						p: 1,
						endFlag: false,
						loading: false
					},
				]
			};
		},
		onLoad(opt) {
			this.kw = opt.kw
			this.handleSearch()
		},
		watch: {
			current(newV) {
				this.handleSearchCpy()
			}
		},
		components: {
			searchResList
		},
		computed: {
			loadStatus() {
				
				let type = this.navList[this.current].type
				let status = 'loadmore'
				if(type == 'question' || type == 'viewpoint' ) {
					let item = this.dataList[this.navList[this.current].dataIndex]
					if(item.endFlag) status = 'nomore'
					if(item.loading) status = 'loading' 
				}
				else if(type == 'user') {
					let item = this.allUserRes[this.navList[this.current].value]
					if(item.endFlag) status = 'nomore'
					if(item.loading) status = 'loading' 
				}
				return status
			}
		},
		async onReachBottom() {
			if(this.current == 0 ) return 
			let type = this.navList[this.current].type
			let keywords = this.kw.trim()
			if(type == 'question' || type == 'viewpoint' ) {
				let item = this.dataList[this.navList[this.current].dataIndex]
				if(item.endFlag) return
				item.p += 1
				this.$set(item, 'loading', true)
				if(type == 'question') await this.handleSearchQuestions(keywords)
				if(type == 'viewpoint') await this.handleSearchViewpoint(keywords)
				this.$set(item, 'loading', false)
				
			}
			else if(type == 'user') {
				let item = this.allUserRes[this.navList[this.current].value]
				if(item.endFlag || item.loading) return
				item.p += 1
				this.$set(item, 'loading', true)
				await this.handleNextUserPage(keywords)
				this.$set(item, 'loading', false)
			}
			
		},
		methods: {
			async handleSearchCpy() {
				if(this.kw == this.cpyRes.name || this.current != 0 ) return
				let res = await this.$https.post('/Home/Jzbxcx/new_data_json?dataid=13', {
					name: this.kw
				})
				if(res.data.code == 1) {
					this.cpyRes = res.data.list[0] || {}
				}
				
			},
			async handleNextUserPage(name) {
				let val = this.navList[this.current].value
				let res = await this.$https.get(`/Home/Jzbxcx/ku_list?cate=${val+1}&keywords=${name}&p=${this.allUserRes[val].p}`)
				if(res.data.code == 1) {
					let data = [...this.allUserRes[val].list, ...res.data.list]
					this.$set(this.allUserRes[val], 'list', data)
					if(res.data.pages == this.allUserRes[val].p) this.$set(this.allUserRes[val], 'endFlag', true)
				}
				
			},
			handleStore(keywords) {
				let arr = uni.getStorageSync('jzb_search_history') || []
				let index = arr.indexOf(keywords)
				if(index != -1) {
					arr.splice(index, 1)
				}
				arr.unshift(keywords)
				uni.setStorageSync('jzb_search_history', arr)
			},
			dataInit() {
				this.dataList.forEach((ele, index) => {
					this.$set(this.dataList, index, {
						data:[],
						p: 1,
						endFlag: false,
						loading: false,
					})
					// this.$set(ele, 'data', [])
					// this.$set(ele, 'p', 1)
				})
				this.allUserRes.forEach((ele, index) => {
					this.$set(this.allUserRes, index, {
						list:[],
						p: 1,
						endFlag: false,
						loading: false,
					})
					// this.$set(ele, 'list', [])
					// this.$set(ele, 'p', 1)
				})
				
				this.navList.forEach(ele => {
					this.$set(ele, 'count', 0)
				})
			},
			async handleSearch(flag) {
				let keywords = this.kw.trim()
				this.handleSearchCpy()
				if(!keywords) return
				uni.showLoading({
					title: '搜索中'
				})
				if(flag) {
					this.dataInit()
				}
				
				this.handleStore(keywords)
				
				await this.handleSearchUser(keywords)
				await this.handleSearchUserAll(keywords)
				await this.handleSearchQuestions(keywords)
				await this.handleSearchViewpoint(keywords)
				this.handleCount()
				uni.hideLoading()
			},
			async search(api, params) {
				return await this.$https.get(api, {params})
			},
			tabsChange(index) {
				this.current = index
			},
			handleCount() {
				let jz_num = 0, zj_num = 0, pr_num = 0
				this.dataList[0].data.forEach(ele => {
					if(ele.type == 0) jz_num++
					else if(ele.type == 1) zj_num++
					else pr_num++
				})
				jz_num += Number(this.allUserRes[0].count)
				zj_num += Number(this.allUserRes[1].count)
				pr_num += Number(this.allUserRes[2].count)
				let q_num = this.dataList[1].data.reduce((sum, cur)=> {return sum+cur.length}, 0)
				let v_num = this.dataList[2].data.reduce((sum, cur)=> {return sum+cur.length}, 0)
				this.$set(this.navList[4], 'count', this.navList[4].count + jz_num)
				this.$set(this.navList[3], 'count', this.navList[3].count + zj_num)
				this.$set(this.navList[5], 'count', this.navList[5].count + pr_num)
				this.$set(this.navList[1], 'count', this.navList[1].count + q_num)
				this.$set(this.navList[2], 'count', this.navList[2].count + v_num)
				let sum = jz_num + zj_num + pr_num + q_num + v_num
				this.$set(this.navList[0], 'count', this.navList[0].count + sum)
				
			},
			async handleSearchUserAll(name) {
				let [res1, res2, res3] = await Promise.all([
					this.$https.get(`/Home/Jzbxcx/ku_list?cate=1&keywords=${name}&p=${this.allUserRes[0].p}`),
					this.$https.get(`/Home/Jzbxcx/ku_list?cate=2&keywords=${name}&p=${this.allUserRes[1].p}`),
					this.$https.get(`/Home/Jzbxcx/ku_list?cate=3&keywords=${name}&p=${this.allUserRes[2].p}`),
				])
				this.isAnalyse(0, res1.data)
				this.isAnalyse(1, res2.data)
				this.isAnalyse(2, res3.data)
			},
			isAnalyse (index, data) {
				let obj = {p: 1, endFlag: data.pages == 1? true :false, loading: false, list: []}
				this.$set(this.allUserRes, index, {...obj, ...data})
			},
			async handleSearchUser(keywords) {
				let uRes = await this.search('/Home/Jzbxcx/name_search_user', {keywords})
				if(uRes.data.code == 1) {
					this.$set(this.dataList[0], 'data', uRes.data.list)
				}
			},
			async handleSearchQuestions(keywords) {
				let res = await this.search('/Home/Jzbxcx/questions_search', {p: this.dataList[1].p, keywords})
				if(res.data.code == 1) {
					let resData = res.data.list.map(ele => {
						let arr = ele.reply_list.filter(el => el.zt == 2)
						ele.ansNum = Number(ele.comment_num) + arr.length
						return ele
					})
					if(res.data.pages == 0 || res.data.pages == this.dataList[1].p) this.$set(this.dataList[1], 'endFlag', true)
					this.dataList[1].data.push(resData)
				}
			},
			async handleSearchViewpoint(keywords) {
				let res = await this.search('/Home/Jzbxcx/viewpoint_search', {p: this.dataList[2].p, keywords})
				if(res.data.code == 1) {
					let resData = res.data.list.map(ele => {
						ele.ansNum = ele.reply_num
						return ele
					})
					if(res.data.pages == this.dataList[2].p) this.$set(this.dataList[2], 'endFlag', true)
					this.dataList[2].data.push(resData)
				}
			},
			handleToWebview() {
				uni.navigateTo({
					url: `/pages/webViewPath/webViewPath?url=https://www.100ec.cn/enterprise/#/Inside`,
					success: res => {
						res.eventChannel.emit('setParams', { params: `?name=${this.cpyRes.name}` })
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s {
		.s-w {
			padding: 20rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #f8f8f8;
		}
		
		.res {
			.hide {
				display: none;
			}
			.card-box {
				padding: 10rpx;
				.icard {
					background-color: #fff;
					border-radius: 20rpx;
					.title {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 80rpx;
						padding: 0 20rpx;
						border-bottom: 1rpx solid #f8f8f8;
						.item-main {
							font-weight: bold;
						}
					}
					.content {
						padding: 20rpx;
						.cpy-info {
							display: flex;
							align-items: baseline;
							margin-bottom: 16rpx;
							.cpy-name {
								color: $jzb-theme-color;
								font-size: 30rpx;
								font-weight: bold;
							}
							.cpy-main {
								color: #999;
								margin-left: 10rpx;
								font-size: 24rpx;
							}
							.cpy-icon {
								flex: 1;
								text-align: right;
								padding-right: 10rpx;
							}
							.cpy-content {
								color: #999;
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
	
	
</style>
