<template>
	<view>
		<u-cell-group>
			<u-cell-item
				:value="score"
				:value-style="scoreStyle"
				:arrow="false"
				icon="integral-fill"
				:icon-style="addIconStyle"
				icon-size="40"
				@click="lookRules"
			>
				<view class="score-title" slot="title">
					<text class="t">积分</text>
					<u-icon name="question-circle" color="#f90"></u-icon>
				</view>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group 
			title="积分记录"
		>
			<u-cell-item 
				v-for="(item, index) in scoreList"
				:key="index"
				:title="item.info"
				:label="item.uptime | timeFilter"
				:value="item.cate == 1 ? `+${item.num}` : item.num"
				:value-style="item.cate == 1 ? addStyle : decStyle "
				:arrow="false"
				icon="info-circle"
				:icon-style="item.cate == 1 ? addIconStyle : decIconStyle"
				icon-size="40"
			></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				score: '-',
				scoreList: [],
				p: 1,
				endFlag: false,
				loading: false,
				addStyle: {
					color: '#007aff'
				},
				scoreStyle: {
					color: '#007aff',
					// fontWeight: 'bold',
					// fontSize: '36rpx'
				},
				decStyle: {
					color: '#ff0000'
				},
				addIconStyle: {
					color: '#007aff',
					marginRight: '20rpx',
				},
				decIconStyle: {
					color: '#ff0000',
					marginRight: '20rpx',
				},
				
			}
		},
		onLoad() {
			this.renderList()
		},
		onReachBottom() {
			if(this.endFlag || this.loading) return
			this.p ++
			this.renderList()
		},
		methods: {
			async renderList() {
				uni.showLoading({
					title: '加载中'
				})
				this.loading = true
				let res = await this.getData()
				if(res.data.code == 1) {
					this.scoreList.push(...res.data.list)
					this.score = res.data.score
				}
				if(res.data.pages == this.p) {
					this.endFlag = true
				}
				this.loading = false
				uni.hideLoading()
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/my_score', {params: {p: this.p}})
			},
			lookRules() {
				uni.navigateTo({
					url: '/pages/scoreRules/scoreRules'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.score-title {
		display: flex;
		align-items: center;
	}
	.score-title .t {
		margin-right: 10rpx;
	}
</style>
