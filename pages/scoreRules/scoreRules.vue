<template>
	<view>
		<u-cell-group
			title="积分规则"
		>
			<u-cell-item
				v-for="(item, index) in scoreRules"
				:key="index"
				:arrow="false"
				:value="item.cate == 1? '可重复' :'唯一'"
			>
				<view class="title" slot="title">
					<text>{{index+1}}.{{item.name}}</text>
				</view>
				<view class="label" slot="label">
					<text :class="item.score > 0 ? 'add' : 'dec'">{{item.score > 0 ? `+${item.score}` : item.score}}</text>
					<text class="line">/</text>
					<text>
						<template v-if="item.toplimit == 0">
							无上限
						</template>
						<template v-else>
							每日上限：{{item.toplimit}}
						</template>
					</text>
				</view>
			</u-cell-item>
		</u-cell-group>
		<view class="rules-sub">
			注：若实际积分变化与“积分规则”不符，则“积分规则”已更新，以前积分变化将不受影响，最新变化以“积分规则”列表为准。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scoreRules: []
			}
		},
		onLoad() {
			this.renderList()
		},
		methods: {
			
			async renderList() {
				uni.showLoading({
					title: '加载中'
				})
				let res = await this.getData()
				if(res.data.code == 1) {
					this.scoreRules = res.data.optionlist.filter(ele => ele.id != 3).sort((a, b) => a.id - b.id)
				}
				
				uni.hideLoading()
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/my_score', {params: {p: this.p}})
			},
		}
	}
</script>

<style scoped lang="scss">
	.label {
		display: flex;
		align-items: center;
	}
	.add {
		color: $jzb-theme-color;
	}
	.dec {
		color: #ff0000;
	}
	.line {
		padding: 0 10rpx;
	}
	.rules-sub {
		padding: 30rpx;
		color: #999;
		
	}
</style>
