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
			<template v-if="list.length == 0">
				<u-empty text="数据为空" mode="data" margin-top="90"></u-empty>
			</template>
		</view>
		
		
	</view>
</template>

<script>
	import obj from '@/static/js/data.js';
	import dataListTrz from '@/components/DataListTrz/DataListTrz.vue'
	import dataListDjs from '@/components/DataListDjs/DataListDjs.vue'
	import dataNav from '@/components/dataNav/dataNav.vue'
	export default {
		data() {
			return {
				searchName: '',
				value: '',
				config: '',
				httpParams: {},
				sortObj: {
					trz: ['time', 0],
					djs: ['shares', 0]
				},
				list: [],
				isSearch: 0,
			}
		},
		components: {
			dataNav,
			dataListTrz,
			dataListDjs
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
			setHttpParams(obj) {
				console.log(obj)
				// console.log(this.httpParams)
				let flag = false
				for(let k in obj) {
					if(!this.httpParams[k] || obj[k] != this.httpParams[k]) {
						
						flag = true
						this.httpParams[k] = obj[k]
						if(k == 'cate') {
							this.$set(this.httpParams, 'cate', obj[k].split('-')[0])
							this.$set(this.httpParams, 'sub', obj[k].split('-')[1])
						}
					}
				}
				console.log(this.httpParams)
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
					title: '加载中',
					mask: true
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
					title: '加载中',
					mask: true
				})
				this.searchName = ''
				this.isSearch = 0
				let res = await this.getApiFunc(this.config.sjkInfo.api, this.httpParams)
				this.tbNavValue()
				let data = this.filterData(res.data.list)
				this.list = this.sortData(data)
				this.$nextTick(()=>{
					uni.hideLoading()
				})
			},
			async getApiFunc (api, obj) {
				if(api.includes('new_data_json')) {
					return await this.$https.post(api, obj)
				}else {
					return await this.$https.get(api, {params: obj})
				}
				
			},
			tbNavValue() {
				let ym = this.httpParams['ym1']
				let area = this.httpParams['area']
				let round = this.httpParams['round']
				let field = this.httpParams['field']
				let sub = this.httpParams['sub']
				let cate = this.httpParams['cate']
				let chen = this.httpParams['chen']
				let time = this.httpParams['time']
				let nav = this.config.sjkInfo.nav
					
				if(this.value == 'trz') {
					if(ym) nav[3].value = ym.slice(0, 4) + '-' + ym.slice(4, 6) 
					nav[2].value = area 
					nav[1].value = round 
					if(cate) nav[0].value = cate + '-' + sub
					else nav[0].value = ''
				}
				else if(this.value == 'djs') {
					nav[1].value = cate 
					if(chen) nav[0].value = chen 
					if(time) nav[2].value = time + '年'
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
							return a[arr[0]] - b[arr[0]]
						}else {
							return b[arr[0]] - a[arr[0]]
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
					round = this.config.dataRound.filter(ele => {
						if(this.httpParams.round == ele.label ) {
							return ele.value
						}
					})[0].value
					data = data.filter(ele => {
						return ele.shares.includes(round)
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
		font-size: 36rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f8f8f8;
	}
</style>
