<template>
	<view>
		<u-grid :col="2">
			<u-grid-item
				v-for="(item, index) in navList"
				:key="index"
				@click="handleToData(index)"
			>
				<!-- <u-badge count="9" :offset="[20, 20]"></u-badge> -->
				<template v-if="item.custom">
					<u-icon :name="item.value" color="#007aff" :size="46" custom-prefix="custom-icon"></u-icon>
				</template>
				<template v-else>
					<u-icon :name="item.value" color="#007aff" :size="46"></u-icon>
				</template>
				
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
		<rz-select-modal
			:show="rzModalShow"
			@change-flag="handleChangeRzModalShow"
		></rz-select-modal>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import rzSelectModal from '@/components/rzSelectModal/rzSelectModal.vue'
	export default {
		data() {
			return {
				navList: [
					{
						name: '全球电商',
						value: 'qq',
						custom: true,
					},
					{
						name: '电商行业',
						value: 'hy',
						custom: true,
					},
					{
						name: '跨境综试区',
						value: 'zsq',
						custom: true,
					},
					{
						name: '电商产业园',
						value: 'cyy',
						custom: true,
					},
					{
						name: '电商评级',
						value: 'pj',
						custom: true,
					},
					{
						name: '上市财报',
						value: 'cb',
						custom: true,
					},
					{
						name: '新三板财报',
						value: 'xsb',
						custom: true,
					},
					{
						name: '独角兽',
						value: 'djs',
						custom: true,
					},
					{
						name: '死亡电商',
						value: 'sw',
						custom: true,
					},
					{
						name: '百强电商',
						value: 'bq',
						custom: true,
					},
					{
						name: '电商投融资',
						value: 'trz',
						custom: true,
					},
				],
				name: '',
				rzModalShow: false,
			}
		},
		computed: {
			...mapState(['infoAuthorize', 'phoneReg'])
		},
		components: {
			rzSelectModal
		},
		methods: {
			handleToData(index) {
				let v = this.navList[index].value
				if(!this.phoneReg) {
					uni.navigateTo({
						url: '/pagesPersonal/wxAuthorize/wxAuthorize?phone=1'
					})
					return
				}
				if(this.infoAuthorize.auth_status != 2) {
					this.handleChangeRzModalShow()
					return
				}
				uni.navigateTo({
					url: '/pagesPersonal/dataItem/dataItem?value=' + v
				})
				
			},
			handleChangeRzModalShow() {
				this.rzModalShow = !this.rzModalShow
			},
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		color: #666;
		margin-top: 10rpx;
	}
</style>
