<template>
	<view class="content">
		
		<view class="list">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="item-header">
					<view class="xuhao">
						#{{index+1}}
					</view>
					<view class="name">
						{{item.dtime}}
					</view>
				</view>
				<view class="item-content">
					<view class="content-invest-info type2">
						<view class="info-item" v-if="item.shares">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>营收</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.shares)}}万元
							</view>
						</view>
						<view class="info-item" v-if="item.a100">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>净利润</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a100)}}万元
							</view>
						</view>
						<view class="info-item" v-if="item.a101">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>总资产</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a101)}}万元
							</view>
						</view>
						<view class="info-item" v-if="item.a102">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>净资产</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a102)}}万元
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				sortName: 'dtime'
			};
		},
		computed: {
			// dataSort() {
			// 	return this.list.sort((a, b) => parseInt(b[this.sortName]) - parseInt(a[this.sortName]))
			// }
		}
	}
</script>

<style scoped lang="scss">

@import "@/static/css/sjk.scss";
</style>
