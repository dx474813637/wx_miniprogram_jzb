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
					:userid="item.follow"
					:name="item.name"
					:avatar="item.pic"
					:label="item.type"
					:sub="item.auth_title || item.company"
					:isFollow="true"
					:loading="loading"
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
				// 	{
				// 	name: '关注动态'
				// },
				{
					name: '关注'
				},{
					name: '粉丝'
				},],
				list: [{
					name: ' ',
					label: ' ',
					sub: ' ',
					auth_title: ' ',
					company: ' '
				}],
				loading: true
			}
		},
		onLoad() {
			this.renderList(this.current)
			
		},
		watch: {
			current(newV) {
				this.renderList(newV)
			}
		},
		components: {
			QAUserProfile
		},
		methods: {
			change (index) {
				this.current = index
			},
			async renderList(index) {
				this.loading = true
				let res
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				res = await this.getData()
				this.list = res.data.list
				this.loading = false
				uni.hideLoading()
			},
			async getData () {
				this.list = []
				// if(this.current == 0) {
				// 	return await this.$https.get('/Home/Jzbxcx/follow_viewpoint_list', {params: {p: 1}})
				// }
				// else 
				if(this.current == 0) {
					return await this.$https.get('/Home/Jzbxcx/follow_list', {params: {p: 1}})
				}
				else if(this.current == 1) {
					return await this.$https.get('/Home/Jzbxcx/follow_me_list', {params: {p: 1}})
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
