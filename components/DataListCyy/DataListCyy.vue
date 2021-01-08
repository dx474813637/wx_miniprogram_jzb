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
								<u-icon name="map"></u-icon>
								<text>所在地</text>
							</view>
							<view class="info-text">
								{{item.cate}} {{item.a100}}
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
