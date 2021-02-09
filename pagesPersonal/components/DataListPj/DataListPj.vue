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
						{{item.company}}
					</view>
					<view class="name-sub">
						{{item.grade}}
					</view>
				</view>
				<view class="item-content">
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="bookmark-fill"></u-icon>
								<text>平台反馈率</text>
							</view>
							<view class="info-text">
								{{item.pre}}%
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="bookmark-fill"></u-icon>
								<text>回复时效性</text>
							</view>
							<view class="info-text">
								{{item.feedback}}
							</view>
						</view>
					</view>
					<view class="content-invest-info">
						<view class="info-item">
							<view class="info-label">
								<u-icon name="bookmark-fill"></u-icon>
								<text>用户满意度</text>
							</view>
							<view class="info-text">
								{{item.score_ave}}
							</view>
						</view>
						<view class="info-item">
							<view class="info-label">
								<u-icon name="bookmark-fill"></u-icon>
								<text>综合指数</text>
							</view>
							<view class="info-text">
								{{item.buy}}
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
