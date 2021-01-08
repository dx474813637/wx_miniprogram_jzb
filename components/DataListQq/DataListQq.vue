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
						{{item.name}}
					</view>
				</view>
				<view class="item-content">
					<view class="content-invest-info type2">
						<view class="info-item" v-if="item.dtime">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>电子商务交易额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.dtime)}}亿美元
							</view>
						</view>
						<view class="info-item" v-if="item.shares">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>电子商务交易额增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.shares)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a100">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网络零售交易额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a100)}}亿美元
							</view>
						</view>
						<view class="info-item" v-if="item.a101">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网络零售交易额增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a101)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a102">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>互联网普及率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a102)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a103">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>互联网用户</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a103)}}亿人
							</view>
						</view>
						<view class="info-item" v-if="item.a104">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>互联网用户渗透率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a104)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a105">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>移动用户</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a105)}}亿人
							</view>
						</view>
						<view class="info-item" v-if="item.a106">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>移动用户渗透率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a106)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a107">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网购用户</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a107)}}亿人
							</view>
						</view>
						<view class="info-item" v-if="item.a108">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网购用户渗透率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a108)}}%
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
				sortName: 'name'
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
