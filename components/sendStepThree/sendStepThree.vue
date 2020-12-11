<template>
	<view>
		<template v-if="!isTimeLimit && qData.list.zt != 1 && maxNum != 0">
			<view class="fanhui-w">
				<view class="sub">
					补充邀请人数还剩：{{maxNum}}人
				</view>
				<view class="djs">
					<!-- <u-count-down 
						:timestamp="qData.list.timeC" 
						separator="zh" 
						:show-days="false" 
						:show-hours="false"
						font-size="50"
						@end="handleEndTimeCount"
					></u-count-down> -->
					<u-button type="primary" @click="handleUpStep">返回上一步</u-button>
				</view>
			</view>
		</template>
		<view class="msg-w">
			<u-cell-group>
				<u-cell-item 
					v-for="(item, index) in qData.answer"
					:key="index"
					:value="item.uptime | timeFilter " 
					:arrow="false"
					@click="handleSeeFeedDetail(index)"
				>
					<view class="cell-title" slot="title">
						<text class="name">{{item.name}}</text>
						<text class="label" :class="{'rz': item.auth_status == 2}">{{item.type | typeToLabel}}</text>
					</view>
					<view class="cell-label" slot="label">
						<template v-if="item.zt == 0">
							<u-icon name="info-circle-fill" color="#ccc" size="34"></u-icon>
						</template>
						<template v-if="item.zt == 1">
							<u-icon name="checkmark-circle-fill" color="#f90" size="34"></u-icon>
						</template>
						<template v-if="item.zt == 3">
							<u-icon name="close-circle-fill" color="#ff0000" size="34"></u-icon>
						</template>
						<template v-if="item.zt == 2">
							<u-icon name="checkmark-circle-fill" color="#00aa00" size="34"></u-icon>
						</template>
						<text>{{msg[item.zt]}}</text>
						<text v-if="item.zt == 3" class="error-color">[{{item.msg}}]</text>
						<text v-if="item.zt == 2" class="click-color">[点击查看回复]</text>
					</view>	
					<image 
						class="cell-avator"
						slot="icon" 
						:src="item.pic" 
					/>
				</u-cell-item>
			</u-cell-group>
			
		</view>
		<view class="fanhui-w">
			<u-button type="primary" @click="handleNextStep">下一步</u-button>
		</view>
		<u-modal 
			v-model="show"
			title="回复详情"
			mask-close-able
			confirm-text="复制"
			show-cancel-button
			@confirm="handleCopy"
		>
			<view class="slot-content">
				{{feed}}
			</view>
		</u-modal>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		props: {
			qid: {
				type: Number | String,
				default: 0
			},
			qData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			maxNum: {
				type: Number | String,
				default: 3
			}
		},
		data() {
			return {
				msg: ['待处理', '已接受，等待专家回复', '已回复', '已拒绝'],
				show: false,
				feed: '',
				time: 3600,
				isTimeLimit: false
			};
		},
		created() {
			if(this.qData.list) {
				this.isTimeLimit = this.qData.list.timeC < 0 ? true: false
			}
			
		},
		watch:{
			qData(newV) {
				if(newV.list && newV.list.timeC < 0) {
					this.isTimeLimit = true
				}
			}
		},
		components: {
			QAUserProfile
		},
		methods: {
			handleSeeFeedDetail(index) {
				let data = this.qData.answer[index]
				if(data.zt == 2) {
					this.show = true
					this.feed = data.intro
				}
			},
			handleCopy() {
				//复制
				uni.setClipboardData({
				    data: this.feed
				});
			},
			handleUpStep() {
				this.$emit('change-step', 1, {newInvite: true})
			},
			handleNextStep() {
				this.$emit('change-step', 3)
			},
			handleEndTimeCount() {
				this.isTimeLimit = false
			}
		}
	}
</script>


<style scoped lang="scss">
	.sub {
		color: #999;
		text-align: center;
	}
	.djs {
		text-align: center;
		font-weight: bold;
		padding: 30rpx;
		color: $jzb-theme-color;
	}
	.fanhui-w {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		padding: 40rpx;
		background-color: #fff;
		margin-bottom: 40rpx;
	}
	.msg-w {
		background-color: #fff;
		margin-bottom: 30rpx;
	}
	.cell-avator {
		width: 90rpx;
		height: 90rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.name {
		font-weight: bold;
	}
	.label.rz {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		border-color: #54c9ff;
	}
	.label {
		margin-left: 16rpx;
		background-color: #f8f8f8;
		color: #666;
		display: inline-block;
		font-size: 24rpx;
		line-height: 32rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		font-weight: bold;
		border: 1rpx solid #ccc;
	}
	.cell-label {
		display: flex;
		align-items: center;
	}
	.cell-label text {
		margin-left: 10rpx;
	}
	.click-color {
		color: $jzb-theme-color;
	}
	.error-color {
		color: #ff0000;
	}
	.slot-content {
		padding: 20rpx;
		white-space: pre-wrap;
	}
</style>
