<template>
	<view class="w">
		<view class="data-title">
			{{config.sjkInfo.name || '数据库'}}
		</view>
		<template v-if="value == 'trz'">
			<view class="data-search">
				<u-input 
					v-model="searchName" 
					height="60" 
					border 
					confirm-type="search"
					:placeholder="placeholder"
					@confirm="handleSearch"
				></u-input>
				
			</view>
		</template>
		
		
		<data-nav
			:value="value"
			:nav-list="config.sjkInfo.nav"
			:params="httpParams"
			@changeParamas="setHttpParams"
		></data-nav>
		
		<view class="list">
			<template v-if="value == 'trz'">
				<data-list-trz
					:list="list"
					:isSearch="isSearch"
				></data-list-trz> 
			</template>
			<template v-else-if="value == 'djs'">
				<data-list-djs
					:list="list"
				></data-list-djs> 
			</template>
			<template v-else-if="value == 'bq'">
				<data-list-bq
					:list="list"
				></data-list-bq> 
			</template>
			<template v-else-if="value == 'sw'">
				<data-list-sw
					:list="list"
				></data-list-sw> 
			</template>
			<template v-else-if="value == 'cyy'">
				<data-list-cyy
					:list="list"
				></data-list-cyy> 
			</template>
			<template v-else-if="value == 'qq'">
				<data-list-qq
					:list="list"
				></data-list-qq> 
			</template>
			<template v-else-if="value == 'hy'">
				<data-list-hy
					:list="list"
				></data-list-hy> 
			</template>
			<template v-else-if="value == 'cb'">
				<data-list-cb
					:list="list"
				></data-list-cb> 
			</template>
			<template v-else-if="value == 'zsq'">
				<data-list-zsq
					:list="list"
				></data-list-zsq> 
			</template>
			<template v-else-if="value == 'xsb'">
				<data-list-xsb
					:list="list"
				></data-list-xsb> 
			</template>
			<template v-else-if="value == 'pj'">
				<data-list-pj
					:list="list.list"
				></data-list-pj> 
			</template>
			<template v-if="list.length == 0">
				<u-empty text="数据为空" mode="data" margin-top="90"></u-empty>
			</template>
		</view>
		
		
	</view>
</template>

<script>
	import obj from '@/pagesPersonal/static/js/data.js';
	import dataListTrz from '@/pagesPersonal/components/DataListTrz/DataListTrz.vue'
	import dataListDjs from '@/pagesPersonal/components/DataListDjs/DataListDjs.vue'
	import dataListBq from '@/pagesPersonal/components/DataListBq/DataListBq.vue'
	import dataListSw from '@/pagesPersonal/components/DataListSw/DataListSw.vue'
	import dataListCyy from '@/pagesPersonal/components/DataListCyy/DataListCyy.vue'
	import dataListQq from '@/pagesPersonal/components/DataListQq/DataListQq.vue'
	import dataListHy from '@/pagesPersonal/components/DataListHy/DataListHy.vue'
	import dataListCb from '@/pagesPersonal/components/DataListCb/DataListCb.vue'
	import dataListZsq from '@/pagesPersonal/components/DataListZsq/DataListZsq.vue'
	import dataListXsb from '@/pagesPersonal/components/DataListXsb/DataListXsb.vue'
	import dataListPj from '@/pagesPersonal/components/DataListPj/DataListPj.vue'
	import dataNav from '@/pagesPersonal/components/dataNav/dataNav.vue'
	export default {
		data() {
			return {
				searchName: '',
				value: '',
				config: '',
				httpParams: {},
				sortObj: {
					trz: ['time', 0],
					djs: ['shares', 0],
					bq: ['shares', 0],
					sw: ['dtime', 0],
					qq: ['name', 0],
					xsb: ['dtime', 0],
					cb: ['dtime', 0],
					pj: [],
					hy: ['dtime', 0],
					zsq: ['a111', 0],
					cyy: []
				},
				list: [],
				isSearch: 0,
				tabsArr: []
			}
		},
		components: {
			dataNav,
			dataListTrz,
			dataListDjs,
			dataListBq,
			dataListSw,
			dataListCyy,
			dataListQq,
			dataListHy,
			dataListCb,
			dataListZsq,
			dataListXsb,
			dataListPj
		},
		computed: {
			placeholder() {
				let text = '输入内容'
				if(this.value == 'trz') text = '搜索融资方/投资方'
				return text
			}
		},
		onLoad(opt) {
			this.value = opt.value
			this.config = obj[this.value]
		},
		methods: {
			setHttpParams(obj, arr)  {
				this.tabsArr = arr
				if(arr && arr.length != 0) {
					this.config.sjkInfo.nav.forEach((ele, index) => {
						ele.value = arr[index][ele.name]
					})
				}
				let flag = false
				for(let k in obj) {
					if(!this.httpParams[k] || obj[k] != this.httpParams[k]) {
						
						flag = true
						this.httpParams[k] = obj[k]
						if(k == 'cate') {
							// this.$set(this.httpParams, 'cate', obj[k].split('-')[0])
							this.httpParams.cate = obj[k].split('-')[0]
							let sub = obj[k].split('-')[1]
							this.httpParams.sub = sub=='全部'? '': sub
							// this.$set(this.httpParams, 'sub', sub=='全部'? '': sub)
						}
					}
				}
				for(let k in this.httpParams) {
					if(!this.httpParams[k]) {
						delete this.httpParams[k]
					}
				}
				if(flag) {
					this.getData()
				}
			},
			async handleSearch() {
				if(!this.searchName) {
					this.getData()
					return
				}
				uni.showLoading({
					title: '加载中'
				})
				let [res1, res2] = await Promise.all([
				    this.getSearchData('tz'),
				    this.getSearchData()
				  ])
				// console.log(res1, res2)
				let list = [...res1.data.list, ...res2.data.list]
				this.list = this.sortData(list)
				this.isSearch = 1
				this.$nextTick(()=>{
					uni.hideLoading()
				})
			},
			async getSearchData(type) {
				if(type == 'tz') return await this.$https.get('/Index/investment_json',{params: {tz: this.searchName}})
				return await this.$https.get('/Index/investment_json',{params: {name: this.searchName, mh:1}})
			},
			async getData() {
				uni.showLoading({
					title: '加载中'
				})
				this.searchName = ''
				this.isSearch = 0
				let res = await this.getApiFunc(this.config.sjkInfo.api, this.httpParams)
				// console.log(res)
				// this.tbNavValue()
				let data = this.filterData(res.data.list)
				this.list = this.sortData(data)
				this.$nextTick(()=>{
					uni.hideLoading()
				})
			},
			async getApiFunc (api, obj) {
				// console.log(obj)
				if(api.includes('new_data_json') || api.includes('json_315_post')) {
					return await this.$https.request({
						method: 'POST',
						url: api,
						data: obj
					})
					// post(api, obj)
				}else {
					return await this.$https.get(api, {params: obj})
				}
				
			},
			sortData(data) {
				let arr = this.sortObj[this.value]
				if(arr && arr.length == 2) {
					data.forEach(ele => {
						let year = ele.a104;
						let month = ele.a105
						let index = ele.dtime.indexOf('月')
						let day = ele.dtime.slice( index + 1, -1) 
						ele.time = '' + year + (month < 10 ? '0' + month : month) + (day < 10 ? '0' + day : day)
						
					})
					data = data.sort((a, b) => {
						if(arr[1] === 1) {
							return parseFloat(a[arr[0]]) -parseFloat(b[arr[0]])
						}else {
							return parseFloat(b[arr[0]]) -parseFloat(a[arr[0]])
						}
					})
				}
				
				return data
			},
			filterData(data) {
				let area, round, sub
				if( this.httpParams.area) {
					area = this.httpParams.area.split('-')
					if(area[0].indexOf('自治区') != -1) {
						area[0] = area[0].replace('自治区', '')
					}
					data = data.filter(ele => {
						if(area[1] == '市辖区') {
							return ele.a106.includes(area[0]) || ele.a107.includes(area[1])
						}
						if(area[1] == '全部') {
							return ele.a106.includes(area[0])
						}
						return ele.a106.includes(area[0]) && ele.a107.includes(area[1])
					})
				}
				if( this.httpParams.round) {
					// round = this.config.dataRound.filter(ele => {
					// 	if(this.httpParams.round == ele.label ) {
					// 		return ele.value
					// 	}
					// })[0].value
					
					data = data.filter(ele => {
						return ele.shares.includes(this.httpParams.round)
					})
				}
				if( this.httpParams.sub) {
					sub =  this.httpParams.sub
					if(sub != '全部') {
						
						data = data.filter(ele => {
							return ele.a103 == sub
						})
					}
				}
				
				
				return data
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.data-search {
		padding: 15rpx 20rpx;
		background-color: #fff;
	}
	.data-title {
		text-align: center;
		line-height: 70rpx;
		font-weight: bold;
		font-size: 32rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f8f8f8;
	}
</style>
