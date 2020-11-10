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
			:list="navList[current].data"
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
						type: 'dz'
					},
					// {
					// 	name: '我的提问',
					// 	type: 'q'
					// },
					// {
					// 	name: '我的解答',
					// 	type: 'a'
					// },
					{
						name: '我的留言',
						type: 'f'
					},
				],
				dzList: [
					{
						isQuestion: false,
						isAuthor: false,
						info: {
							avatar: 'https://www.100ec.cn/Public/home/images/dyz.jpg',
							name: '网经社',
							label: '专家',
							sub: '浙江省杭州市某某公司CEO',
							post_date: '2020-10-13 06:52:07',
							content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
						},
						q: {
							title: '问题所在问题所在问题所在'
						}
					},
					{
						isQuestion: false,
						isAuthor: true,
						info: {
							avatar: 'https://www.100ec.cn/Public/home/images/dyz.jpg',
							name: '网经社',
							label: '专家',
							sub: '浙江省杭州市某某公司CEO',
							post_date: '2020-10-13 06:52:07',
							content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
						},
						q: {
							title: '问题所在问题所在问题所在'
						}
					},
					{
						isQuestion: true,
						isAuthor: true,
						info: {
							title: '问题所在问题所在问题所在',
							avatar: 'https://www.100ec.cn/Public/home/images/dyz.jpg',
							name: '网经社',
							label: '专家',
							sub: '浙江省杭州市某某公司CEO',
							post_date: '2020-10-13 06:52:07',
							content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
						},
						q: {
							title: '问题所在问题所在问题所在'
						}
					}
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
				console.log(type)
				uni.showLoading({
					title: '加载中',
					success: () => {
						setTimeout(() => {
							if(type == 'dz' ) this.$set(this.navList[this.current], 'data', this.dzList.filter(ele => !ele.isAuthor))
							// if(type == 'q' ) this.$set(this.navList[this.current], 'data', this.dzList.filter(ele => ele.isQuestion))
							if(type == 'a' ) this.$set(this.navList[this.current], 'data', [])
							if(type == 'f' ) this.$set(this.navList[this.current], 'data', [])
							console.log(this.navList)
							uni.hideLoading()
						}, 1500)
					}
				})
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
