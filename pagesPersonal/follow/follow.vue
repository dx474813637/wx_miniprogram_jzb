<template>
	<view>
		<view class="tabs-w">
			<u-tabs 
				:list="navList" 
				:is-scroll="false" 
				:current="current" 
				@change="change"
				:show-bar="false"
			>
			</u-tabs>
		</view>
		<view class="list">
			<view 
				class="list-item" 
				v-for="(item, index) in list"
				:key="index"
			>	
				<q-a-user-profile
					:userid="current == 0 ? item.follow : item.poster"
					:name="item.name"
					:avatar="item.pic"
					:label="item.type"
					:sub="item.type != 0 ?item.auth_title : item.company"
					:isFollow="true"
					:followBtn="current == 0 ? true : false"
				></q-a-user-profile>
			</view>
			
		</view>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	
	export default {
		data() {
			return {
				current: 0,
				navList: [
					{
						name: '关注',
						p: 1,
						flag: true,
						loading: false
					},
					{
						name: '粉丝',
						p: 1,
						flag: true,
						loading: false
					},
				],
				list: [{
					name: ' ',
					label: ' ',
					sub: ' ',
					auth_title: ' ',
					company: ' '
				}],
			}
		},
		onLoad(opt) {
			this.change(opt.v || 0)
			this.renderList()
			
		},
		watch: {
			current(newV) {
				this.renderList(newV)
			}
		},
		components: {
			QAUserProfile
		},
		onReachBottom() {
			if(!this.navList[this.current].flag || this.navList[this.current].loading) return
			this.$set(this.navList[this.current], 'loading', true)
			this.$set(this.navList[this.current], 'p', this.navList[this.current].p+1)
			this.renderList()
			
		},
		methods: {
			change (index) {
				this.current = index
			},
			async renderList() {
				this.loading = true
				let res
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				res = await this.getData()
				if(res.data.code == 1) {
					this.list = res.data.list
					if(this.navList[this.current].p == res.data.pages) {
						this.$set(this.navList[this.current], 'flag', false)
					}
				}
				if(this.navList[this.current].loading) this.$set(this.navList[this.current], 'loading', false)	
				uni.hideLoading()
			},
			async getData () {
				this.list = []
				// if(this.current == 0) {
				// 	return await this.$https.get('/Home/Jzbxcx/follow_viewpoint_list', {params: {p: 1}})
				// }
				// else 
				if(this.current == 0) {
					return await this.$https.get('/Home/Jzbxcx/follow_list', {params: {p: this.navList[this.current].p}})
				}
				else if(this.current == 1) {
					return await this.$https.get('/Home/Jzbxcx/follow_me_list', {params: {p: this.navList[this.current].p}})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.author-info {
		display: flex;
		align-items: center;
	}
	.author-pic {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.author-name {
		color: #000;
		margin-left: 10rpx;
	}
	.tabs-w {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.list {
		padding: 120rpx 40rpx 40rpx;
		background-color: #fff;
	}
	.list-item {
		margin-bottom: 30rpx;
		border-bottom: 1rpx solid #f8f8f8;
		padding-bottom: 40rpx;
	}
	.item-title {
		background-color: #f8f8f8;
		padding: 10rpx;
		line-height: 50rpx;
		border-radius: 8rpx;
		color: #666;
		// font-weight: bold;
	}
	.item-sub {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx;
		color: #999;
	}
</style>
