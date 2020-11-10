<template>
	<view class="qa-detail">
		<view class="q-detail qa-wrap">
			<view class="q-user-card-wrap">
				<q-a-user-profile></q-a-user-profile>
			</view>
			<view class="q-header">
				<view class="q-title">
					很疯狂较深的好看如何大奖快睡觉解决将的卡上问题？
				</view>
				<view class="q-post-date">
					<view class="date-item">
						{{ '2020-10-20 12:04:35' | timeFilter}}发出邀请
					</view>
					<view class="date-item">
						<text>23小时59分</text>后邀请失效
					</view>
				</view>
			</view>
			
			<view class="q-content">
				<rich-text >
					内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
					内容内容内容内容内容内容内容内容内容内容内容内容
				</rich-text>
				
			</view>
		</view>
		<template v-if="aContent.length > 0">
			<view class="a-box">
				<view class="a-box-title">
					<u-icon name="chat" color="#007aff" size="40"></u-icon>
					<text>我的回复</text>
				</view>
				<view class="a-content">
					<rich-text :nodes="aContent"></rich-text>
				</view>
			</view>
		</template>
		<template>
			<view class="a-box">
				<view class="a-box-title">
					<u-icon name="chat" color="#007aff" size="40"></u-icon>
					<text>评价采访</text>
				</view>
				<view class="w-item">
					<view class="info-rate">
						<text class="info">网经社</text>
						<u-rate :count="5" v-model="score" active-color="#007aff" size="40"></u-rate>
					</view>
				</view>
			</view>
		</template>
		
		
		
		
		<!-- <template v-if="aContent.length == 0"> -->
			<view class="bottom">
				<template v-if="aContent.length == 0">
					<template v-if="!flag">
						<view class="bottom-item">
							<u-button type="error" size="medium" plain @click="handleSelectFlag">拒绝</u-button>
						</view>
						<view class="bottom-item">
							<u-button type="primary" size="medium" @click="handleGet">接受采访</u-button>
						</view>
					</template>
					<template v-else>
						<view class="bottom-item bw">
							<u-button type="primary" @click="handleShowReply">在线回复</u-button>
						</view>
					</template>
				</template>
				<template v-else>
						<view class="bottom-item bw">
							<u-button type="primary" @click="handleSubmitScore" :disabled="score == 0">提交评价</u-button>
						</view>
				</template>
				
			</view>
		<!-- </template> -->
		
		
		<u-select 
			v-model="showSelect" 
			:default-value="dV"
			:list="selectList"
			@confirm="handleSelectConfirm"
		></u-select>
		<u-modal 
			v-model="showModal" 
			:content="modalContent"
			@confirm="handleModalConfirm"
			show-cancel-button
			mask-close-able
		></u-modal>
		<q-a-reply
			:show="showReply"
			@change-flag="handleShowReply"
			@rep="handleRep"
		></q-a-reply>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue';
	import QAReply from '@/components/QAReply/QAReply.vue'
	export default {
		data() {
			return {
				flag: false,
				dV: [0],
				showSelect: false,
				showModal: false,
				showReply:false,
				modalContent: '',
				aContent: '',
				score: 0,
				selectList: [
					{
						value: 0,
						label: '原因1'
					},
					{
						value: 1,
						label: '原因2'
					}
				]
			}
		},
		components: {
			QAUserProfile,
			QAReply
		},
		methods: {
			handleSelectFlag() {
				this.showSelect = true
			},
			handleSelectConfirm(v) {
				this.dV = [v[0].value]
				this.modalContent = '是否以该原因（' + v[0].label + '）拒绝此次采访邀请？'
				this.showModal = true
			},
			handleModalConfirm() {
				//拒绝事件
				console.log('拒绝')
			},
			handleGet() {
				uni.showModal({
				    title: '提示',
				    content: '你接受了采访邀请，请在邀请有效期内在线回复，谢谢配合！',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				this.flag = true
			},
			handleShowReply(content) {
				this.showReply = !this.showReply
			},
			handleRep(content) {
				//点击回复的回调事件
				console.log(content)
				this.aContent = content
			},
			handleSubmitScore() {
				if(this.score != 0) {
					uni.showToast({
						title: '评价成功'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.w-item {
		padding: 20rpx;
	}
	.info-rate {
		display: flex;
		justify-content: space-between;
	}
	.info-rate .info {
		font-weight: bold;
	}
	.a-box {
		background-color: #fff;
		padding: 20rpx 30rpx;
		margin-bottom: 30rpx;
	}
	.a-box-title {
		border-bottom: 1rpx solid #f8f8f8;
		font-weight: bold;
		color: $jzb-theme-color;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;
		font-size: 32rpx;
	}
	.a-content {
		line-height: 50rpx;
		font-size: 32rpx;
		margin-bottom: 50rpx;
	}
	.bottom-item.bw {
		width: 100%;
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 25rpx;
	}
	.qa-detail {
		padding-bottom: 100rpx;
	}
	.qa-wrap {
		margin-bottom: 30rpx;
		padding: 20rpx 30rpx;
		background-color: #fff;
	}
	.q-detail {
		padding: 20rpx 30rpx;
	}
	.q-title {
		font-weight: bold;
		font-size: 40rpx;
		line-height: 70rpx;
	}
	.qa-title {
		display: flex;
		align-items: center;
		font-size: 34rpx;
		font-weight: bold;
		color: $jzb-theme-color;
		height: 70rpx;
		border-bottom: 2rpx solid #f8f8f8;
		margin-bottom: 20rpx;
	}
	.qa-title-t {
		margin-left: 20rpx;
	}
	.qa-content {
		padding: 10rpx 20rpx;
		background-color: $jzb-bg-color;
		color: #666;
		border-radius: 10rpx;
		line-height: 60rpx;
	}
	.q-post-date {
		color: #999;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// margin-bottom: 20rpx;
	}
	.q-user-card-wrap {
		background-color: #f8f8f8;
		border: 2rpx solid #eee;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
	}
	
	.q-content {
		line-height: 50rpx;
		font-size: 32rpx;
		margin-bottom: 50rpx;
	}
</style>
