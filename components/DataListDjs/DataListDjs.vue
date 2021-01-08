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
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="calendar"></u-icon>
								<text>成立时间</text>
							</view>
							<view class="info-text">
								{{item.dtime}}年
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="rmb-circle"></u-icon>
								<text>估值</text>
							</view>
							<view class="info-text">
								{{item.shares + (item.a106 == '独角兽'? '亿美元': '亿元')}}
							</view>
						</view>
					</view>
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="grid"></u-icon>
								<text>所在行业</text>
							</view>
							<view class="info-text">
								{{item.a103}}
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="map"></u-icon>
								<text>所在地</text>
							</view>
							<view class="info-text">
								{{item.a100}}
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
				
			};
		}
	}
</script>

<style scoped lang="scss">

@import "@/static/css/sjk.scss";
</style>
