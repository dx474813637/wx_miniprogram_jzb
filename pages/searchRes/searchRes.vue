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
						:typeIndex="index"
						:type="navList[index].type"
						:val="navList[index].value"
						:label="navList[index].name"
						:all-user-res="allUserRes[navList[index].value]"
						@change-current="tabsChange"
					></search-res-list>
				</template>
			</view>
			
			
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
				fList: [],
				allUserRes: [
					{ list:[] },
					{ list:[] },
					{ list:[] },
				]
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
					this.$https.get(`/Home/Jzbxcx/ku_list?cate=1&keywords=${name}`),
					this.$https.get(`/Home/Jzbxcx/ku_list?cate=2&keywords=${name}`),
					this.$https.get(`/Home/Jzbxcx/ku_list?cate=3&keywords=${name}`),
				])
				this.$set(this.allUserRes, 0, res1.data)
				this.$set(this.allUserRes, 1, res2.data)
				this.$set(this.allUserRes, 2, res3.data)
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
