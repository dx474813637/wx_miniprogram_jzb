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
						name: '我的点赞',
						type: 'dz',
					},
					{
						name: '我的留言',
						type: 'f'
					},
				],
				list: []
			}
		},
		onShow() {
			this.getData('dz')
		},
		components: {
			updateList
		},
		methods: {
			getData (type) {
				
			},
			change (index) {
				this.current = index
				if(!this.navList[index].data) {
					this.getData(this.navList[index].type)
				}
				
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
