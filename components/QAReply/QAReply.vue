<template>
	<view>
		<u-popup
			v-model="flag" 
			mode="bottom"
			border-radius="8"
			width="650"
			:height="propHeight"
			safe-area-inset-bottom
		>	
			<view class="reply-main-w">
				<textarea 
					class="reply-textarea" 
					:placeholder="plh" 
					v-model="replyV" 
					placeholder-class="t" 
					cursor-spacing="170"
				/>
			</view>
			<view class="reply-bottom-w">
				<view class="rp-bottom-item count" @click="handleTrashBtn">
					清空<u-icon name="trash"></u-icon>
				</view>
				<view class="rp-bottom-item count">
					<text :class="{'error': rpLenError}">{{rpLen}}</text>/500
				</view>
				<view class="rp-bottom-item">
					<u-button type="primary" @click="handleReply" :disabled="rpLenError || replyV.length == 0" size="mini">回复</u-button>
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
			},
			repPerson: {
				type: String,
				default: '网经社'
			}
		},
		data() {
			return {
				flag: false,
				replyV: '',
				maxlength: 500
			};
		},
		created() {
			this.flag = this.show
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
		computed: {
			plh () {
				return '回复：' + this.repPerson
			},
			rpLen() {
				return this.replyV.length
			},
			rpLenError() {
				return this.replyV.length >= this.maxlength ? true : false
			},
		},
		methods: {
			handleExit() {
				this.flag = false
			},
			handleTrashBtn() {
				this.replyV = ''
			},
			handleReply() {
				this.$emit('reply-event', this.replyV)
				this.handleExit()
			}
		}
	}
</script>

<style scoped lang="scss">
	.reply-main-w {
		padding: 30rpx 30rpx 0rpx;
	}
	.reply-textarea {
		background-color: #eee;
		width: calc(100% - 30rpx);
		padding: 15rpx;
		border-radius: 10rpx;
	}
	.error {
		color: red;
	}
	.reply-bottom-w {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 20rpx 30rpx;
	}
	.rp-bottom-item {
		margin-left: 25rpx;
	}
	.rp-bottom-item.count {
		color: #999;
	}
	.t {
		color: red;
	}
</style>
