<template>
	<view class="w">
		<view class="w-bg">
			<view class="user-avatar">
				<image class="avatar" :src="info.avatar" ></image>
			</view>
		</view>
		<view class="content">
			<u-cell-group>
				<u-cell-item
					:arrow="false"
					title="所在领域"
					:value="'零售电商'"
				></u-cell-item>
				<u-cell-item
					:arrow="false"
					title="公司"
					:value="'公司名称'"
				></u-cell-item>
				<u-cell-item
					:arrow="false"
					title="职务"
					:value="'ceo'"
				></u-cell-item>
				
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cate: 2,
				id: 540,
				info: {}
			}
		},
		onLoad(opt) {
			// if(opt.cate) {
			// 	this.cate = opt.cate
			// }
			// if(opt.id) {
			// 	this.id = opt.id
			// }
			this.renderList()
		},
		methods: {
			async renderList() {
				let res = await this.getData()
				if(res.data.code == 1) {
					this.info = res.data.list
				}
			},
			async getData() {
				return await this.$https.get("/Home/Jzbxcx/ku_detail", {params: {
					cate: this.cate,
					id: this.id
				}})
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.w {
	}
</style>
