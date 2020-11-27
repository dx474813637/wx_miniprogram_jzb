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
		<update-list
			:list="list"
		></update-list>
		
		
		
	</view>
</template>

<script>
	import updateList from '@/components/updateList/updateList.vue'
	export default {
		data() {
			return {
				current: 0,
				navList: [
					{
						name: '关注动态',
						type: 'dt',
						api: '/Home/Jzbxcx/follow_viewpoint_list'
					},
					{
						name: '我的留言',
						type: 'f'
					},
				],
				list: [],
				p: 1
			}
		},
		onLoad() {
			this.change(this.current)
		},
		components: {
			updateList
		},
		methods: {
			async renderData (index) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let res = await this.getData(this.navList[index].api)
				this.list = res.data.list
				uni.hideLoading()
			},
			async getData(api) {
				return await this.$https.get(api, {params: {p: this.p}})
			},
			change (index) {
				this.current = index;
				this.p = 1
				this.renderData(index)
				
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabs-w {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.w {
		padding-top: 120rpx;
		background-color: #fff;
	}
</style>
