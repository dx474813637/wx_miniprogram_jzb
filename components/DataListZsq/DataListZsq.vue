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
						{{item.a111}}
					</view>
				</view>
				<view class="item-content">
					<view class="content-invest-info type2">
						<view class="info-item" v-if="item.shares">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>跨境电商交易额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.shares)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a100">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>跨境电商交易额增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a100)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a101">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>跨境电商渗透率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a101)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a102">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>出口跨境电商交易额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a102)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a103">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>出口跨境电商交易额增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a103)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a104">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>进口跨境电商交易额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a104)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a105">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>进口跨境电商交易额增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a105)}}%
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
				sortName: 'a111'
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
