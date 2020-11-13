<template>
	<view>
		<u-grid :col="3">
			<u-grid-item
				v-for="(item, index) in navList"
				:key="index"
				@click="handleToData(index)"
			>
				<!-- <u-badge count="9" :offset="[20, 20]"></u-badge> -->
				<u-icon name="photo" :size="46"></u-icon>
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue'
	export default {
		data() {
			return {
				navList: [
					{
						name: '全球电商',
						value: 'qq'
					},
					{
						name: '电商行业',
						value: 'hy'
					},
					{
						name: '跨境综试区',
						value: 'zsq'
					},
					{
						name: '电商产业园',
						value: 'cyy'
					},
					{
						name: '电商评级',
						value: 'pj'
					},
					{
						name: '上市财报',
						value: 'cb'
					},
					{
						name: '新三板财报',
						value: 'xsb'
					},
					{
						name: '独角兽',
						value: 'djs'
					},
					{
						name: '死亡电商',
						value: 'sw'
					},
					{
						name: '百强电商',
						value: 'bq'
					},
					{
						name: '投融资',
						value: 'trz',
						path: '/pages/dataTrz/dataTrz'
					},
					{
						name: '投资者',
						value: 'tzz'
					}
				],
				name: '',
			}
		},
		components: {
			tabBar
		},
		methods: {
			handleToData(index) {
				console.log(index)
				let v = this.navList[index].value
				if( v == 'trz' || v == 'djs') {
					uni.navigateTo({
						url: '/pages/dataItem/dataItem?value=' + this.navList[index].value
					})
				}
				else if(v == 'cb' || v == 'xsb') {
					uni.navigateTo({
						url: '/pages/dataNavCell/dataNavCell?value=' + this.navList[index].value
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
