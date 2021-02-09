<template>
	<view class="s">
		<u-sticky>
			<view class="s-w">
				<u-search 
					placeholder="请输入文章标题关键词" 
					v-model="kw"
					shape="round"
					:show-action="false"
					:animation="true"
					@search="handleSearch()"
				></u-search>
			</view>
		</u-sticky>
		
		<view class="news-res">
			<view class="search-title" :class="{'show': count != 0}">
				媒公宝为您找到相关结果{{count}}个
			</view>
			<news-list
				:list="list"
				:end-flag="endFlag"
				:loading="loading"
				titleWeight
			></news-list>
			
		</view>
		
		
	</view>
</template>

<script>
	import newsList from "@/components/newsList/newsList.vue"
	export default {
		data() {
			return {
				kw: '',
				list: [],
				p: 1,
				firstFlag: false,
				loading: false,
				endFlag: false,
				count: 0,
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		components: {
			newsList
		},
		computed: {
			status() {
				if(this.loading) return 'loading'
				if(this.endFlag) return 'nomore'
				return 'loadmore'
			}
		},
		onReachBottom() {
			if(this.endFlag || this.loading) return
			this.p += 1
			this.renderList(this.kw)
		},
		methods: {
			async handleSearch() {
				this.kw = this.kw.trim()
				if(!this.kw) return
				this.p = 1;
				this.endFlag = false
				this.list = []
				this.count = 0
				this.firstFlag = true
				await this.renderList(this.kw)
			},
			async renderList(kw) {
				this.loading = true
				let res = await this.getData(kw)
				if(this.p == res.data.to_page) {
					this.endFlag = true
				}
				this.list = [...this.list, ...res.data.list]
				this.count = res.data.total
				this.loading = false
			},
			async getData(kw) {
				return await this.$https.get("/Home/Jzbxcx/searchjson.html", {params: {
					p: this.p,
					terms: kw,
					n: 20
				}})
			}
		}
	}
</script>

<style scoped lang="scss">
	.s {
		
		.s-w {
			padding: 20rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #f8f8f8;
		}
		.news-res {
			
			.search-title {
				display: none;
				padding: 20rpx;
				color: #999;
				font-size: 24rpx;
				&.show {
					display: block;
				}
			}
		}
	}
</style>
