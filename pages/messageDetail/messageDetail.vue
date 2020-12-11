<template>
	<view class="list">
		<view 
			class="list-item" 
			v-for="(item, index) in list" 
			:key="item.id"
		>
			<!-- <msg-detail-feed></msg-detail-feed> -->
			<view class="card-info">
				<view class="info-time">{{item.uptime | timeFilter}}</view>
				<view class="info-btn" v-if="item.cate != 2">
					<u-button plain size="mini" @click="handleToPath(item)">
						<u-icon name="chat" size="30"></u-icon>
						原主题
					</u-button>
				</view>
			</view>
			<!-- <u-read-more
				ref="uReadMore"
				toggle
			> -->
				<view class="card-content">
					{{item.info}}
				</view>
			<!-- </u-read-more> -->
		</view>
		
	</view>
</template>

<script>
	// import msgDetailLike from '@/components/msgDetailLike/msgDetailLike.vue'
	// import msgDetailFeed from '@/components/msgDetailFeed/msgDetailFeed.vue'
	// import msgDetailFollow from '@/components/msgDetailFollow/msgDetailFollow.vue'
	export default {
		data() {
			return {
				list: [],
				p: 1,
				pFlag: true,
				pLoading: false
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.index = opt.index
		},
		// components: {
		// 	msgDetailLike,
		// 	msgDetailFeed,
		// 	msgDetailFollow
		// },
		onLoad() {
			this.renderList()
		},
		onReachBottom() {
			if(!this.pFlag || this.pLoading) return
			this.pLoading = true
			this.p++
			this.renderList()
			
		},
		methods: {
			async renderList() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.getData()
				if(res.data.code == 1) {
					this.list = res.data.list
					this.pLoading = false
					if(this.p == res.data.pages) {
						this.pFlag = false
					}
				}
				uni.hideLoading()
				
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/replymessage_list', {params: {p: this.p}})
			},
			handleToPath(obj) {
				let type = obj.cate == 1? 0 : 1;
				uni.navigateTo({
					url: `/pages/qaDetail/qaDetail?id=${obj.rid}&type=${type}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		background-color: #fff;
	}
	.list-item {
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.card-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #999;
	}
	.card-content {
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #333;
		white-space: pre-wrap;
	}
</style>
