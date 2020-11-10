<template>
	<view>
		<u-popup
			v-model="flag" 
			mode="center"
			border-radius="8"
			width="650"
		>
			<view class="rz-modal-w">
				<view class="rz-modal-header">认证您的身份</view>
				<view class="rz-modal-content">
					<view class="rz-modal-content-sub">
						提示：电商圈是一个专业社区，部分功能需要身份认证成功后使用
					</view>
					<view class="rz-modal-content-btn">
						<view class="btn-item">
							<u-button type="primary" shape="circle" @click="handleRz('0')">记者</u-button>
						</view>
						<view class="btn-item">
							<u-button type="primary" shape="circle" @click="handleRz('1')">专家</u-button>
						</view>
						<view class="btn-item">
							<u-button type="primary" shape="circle" @click="handleRz('2')">公关</u-button>
						</view>
					</view>
				</view>
				<view class="rz-modal-footer" @click="handleExit">
					再考虑一下
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			show(newV) {
				this.flag = newV
			},
			flag(newV) {
				if(!newV) {
					this.$emit('change-flag')
				}
			}
		},
		data() {
			return {
				flag: false
			};
		},
		created() {
			this.flag = this.show
		},
		methods: {
			handleExit() {
				this.flag = false
			},
			handleRz(type) {
				uni.navigateTo({
				    url: "/pages/rzApply/rzApply?type=" + type
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.rz-modal-w {
		padding: 30rpx;
	}
	.rz-modal-header {
		text-align: center;
		font-size: 36rpx;
		color: #000;
	}
	.btn-item {
		margin-bottom: 30rpx;
	}
	.rz-modal-footer {
		color: #999;
		text-align: center;
	}
	.rz-modal-content {
		padding-top: 30rpx;
	}
	.rz-modal-content-sub {
		padding: 20rpx 10rpx;
		line-height: 50rpx;
		border-top: 2rpx solid #f5f5f5;
		color: #999;
		
	}
</style>
