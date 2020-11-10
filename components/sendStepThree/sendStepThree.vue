<template>
	<view>
		<view class="fanhui-w">
			
			<template v-if="time != 0">
				<view class="djs">
					<u-count-down 
						:timestamp="time" 
						separator="zh" 
						:show-days="false" 
						:show-hours="false"
						font-size="50"
					></u-count-down>
				</view>
			</template>
			<view class="sub">
				自对专家发起问题邀请一小时后，若专家均无响应或者均拒绝可返回上一步重新选择专家（每次提问仅一次机会）
			</view>
			
			<template v-if="time == 0">
				<u-button type="primary" @click="handleUpStep">返回上一步，重新找专家</u-button>
			</template>
			
		</view>
		<view class="msg-w">
			<u-cell-group>
				<u-cell-item 
					v-for="(item, index) in dataList"
					:key="index"
					:value="item.time | timeFilter " 
					:arrow="false"
					@click="handleSeeFeedDetail(index)"
				>
					<view class="cell-title" slot="title">
						<text class="name">{{item.name}}</text>
						<text class="label" :class="{'rz': item.label != '未认证'}">{{item.label}}</text>
					</view>
					<view class="cell-label" slot="label">
						<template v-if="item.status == 0">
							<u-icon name="info-circle-fill" color="#ccc" size="34"></u-icon>
						</template>
						<template v-if="item.status == 1">
							<u-icon name="checkmark-circle-fill" color="#f90" size="34"></u-icon>
						</template>
						<template v-if="item.status == 2">
							<u-icon name="close-circle-fill" color="#ff0000" size="34"></u-icon>
						</template>
						<template v-if="item.status == 3">
							<u-icon name="checkmark-circle-fill" color="#00aa00" size="34"></u-icon>
						</template>
						<text>{{msg[item.status]}}</text>
						<text v-if="item.status == 2" class="error-color">[拒绝原因]</text>
						<text v-if="item.status == 3" class="click-color">[点击查看回复]</text>
					</view>	
					<image 
						class="cell-avator"
						slot="icon" 
						:src="item.avatorUrl" 
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
				<rich-text :nodes="feed"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		props: {
		},
		data() {
			return {
				msg: ['待处理', '已接受，等待专家回复', '已拒绝', '已回复'],
				dataList: [
					{
						avatorUrl: 'https://www.100ec.cn/Public/home/images/dyz.jpg',
						name: '网经社',
						label: '记者',
						status: 0, //0：待处理， 1：已处理
						time: '2020-10-14 10:46:44'
					},
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2017/12/27/5a42f77ef17e2.png',
						name: '网经社',
						label: '专家',
						status: 1, //0：待处理， 1：已处理
						time: '2020-10-13 10:46:44'
					},
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2018/07/12/5b471b720cb95.png',
						name: '网经社',
						label: '公关',
						status: 2, //0：待处理， 1：已处理
						time: '2020-10-19 09:10:04'
					}, 
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2017/12/27/5a4361390c6ba.png',
						name: '网经社1',
						label: '公关',
						feed: `内容<br>内容1`,
						status: 3, //0：待处理， 1：已处理
						time: '2020-10-19 08:12:04'
					}, 
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2017/12/27/5a4361390c6ba.png',
						name: '网经社2',
						label: '公关',
						feed: `内容<br>内容2`,
						status: 3, //0：待处理， 1：已处理
						time: '2020-10-19 08:12:04'
					}
				],
				show: false,
				feed: '',
				time: 3600
			};
		},
		components: {
			QAUserProfile
		},
		methods: {
			handleSeeFeedDetail(index) {
				let data = this.dataList[index]
				if(data.status == 3) {
					this.show = true
					this.feed = data.feed
				}
			},
			handleCopy() {
				//复制
				uni.setClipboardData({
				    data: this.feed
				});
			},
			handleUpStep() {
				this.$emit('change-step', 1)
			},
			handleNextStep() {
				this.$emit('change-step', 3)
			}
		}
	}
</script>


<style scoped lang="scss">
	.sub {
		color: #999;
		margin-bottom: 30rpx;
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
	}
</style>
