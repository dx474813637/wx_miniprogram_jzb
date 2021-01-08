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
			<view class=""
				v-for="(item, index) in navList"
				:key="index"
			>
				<template v-if="(current == 0 || current == index) && index != 0">
					<search-res-list
						:index="current"
						:list="dataList[item.dataIndex].data"
						:type="index"
						:val="navList[index].value"
						:label="navList[index].name"
						@change-current="tabsChange"
					></search-res-list>
				</template>
			</view>
			<!-- <template v-if="current == 0 || current == 1">
				<search-res-list
					:index="current"
					:list="dataList[0].data"
					type="1"
					:val="navList[1].value"
					:label="navList[1].name"
					@change-current="tabsChange"
				></search-res-list>
			</template>
			<template v-if="current == 0 || current == 2">
				<search-res-list
					:index="current"
					:list="dataList[0].data"
					type="2"
					:val="navList[2].value"
					:label="navList[2].name"
					@change-current="tabsChange"
				></search-res-list>
			</template>
			<template v-if="current == 0 || current == 3">
				<search-res-list
					:index="current"
					:list="dataList[0].data"
					type="3"
					:val="navList[3].value"
					:label="navList[3].name"
					@change-current="tabsChange"
				></search-res-list>
			</template>
			
			<template v-if="current == 0 || current == 4">
				<search-res-list
					:index="current"
					:list="dataList[1].data"
					type="4"
					:label="navList[4].name"
					@change-current="tabsChange"
				></search-res-list>
			</template>
			
			<template v-if="current == 0 || current == 5">
				<search-res-list
					:index="current"
					:list="dataList[2].data"
					type="5"
					:label="navList[5].name"
					@change-current="tabsChange"
				></search-res-list>
			</template> -->
			
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
						count: 0
					},
					{
						name: '提问',
						count: 0,
						dataIndex: 1
					},
					{
						name: '发声',
						count: 0,
						dataIndex: 2
					},
					{
						name: '专家',
						value: 1,
						count: 0,
						dataIndex: 0
					},
					{
						name: '记者',
						value: 0,
						count: 0,
						dataIndex: 0
					},
					{
						name: '公关',
						value: 2,
						count: 0,
						dataIndex: 0
					},
				],
				dataList: [
					{
						data: [],
						loading: false
					},
					{
						data: [],
						p: 1,
						endFlag: false,
						loading: false
					},
					{
						data: [],
						p: 1,
						endFlag: false,
						loading: false
					},
				],
				uList: [],
				qList: [],
				fList: []
			};
		},
		onLoad(opt) {
			this.kw = opt.kw
			// this.$https.get('/Home/Jzbxcx/keywords_user', {params: {keywords: this.kw}})
			this.handleSearch(true)
		},
		components: {
			searchResList
		},
		methods: {
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
				this.dataList.forEach(ele => {
					this.$set(ele, 'data', [])
				})
				
				this.navList.forEach(ele => {
					this.$set(ele, 'count', 0)
				})
			},
			async handleSearch(flag) {
				let keywords = this.kw.trim()
				if(!keywords) return
				if(flag) {
					this.dataInit()
					uni.showLoading({
						title: '搜索中'
					})
				}else {
					
				}
				
				this.handleStore(keywords)
				
				await this.handleSearchUser(keywords)
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
					if(res.data.pages == this.dataList[1].p) this.$set(this.dataList[1], 'endFlag', true)
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
		}
	}
</script>

<style lang="scss" scoped>
	.s-w {
		padding: 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f8f8f8;
	}
</style>
