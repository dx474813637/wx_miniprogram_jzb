<template>
	<view>
		
		<view class="item-footer-tools">
			<template v-if="!isAuthor">
				<view class="tools-item" @click="handleGoodsBtn">
					<u-icon name="thumb-up" size="38"></u-icon>
					<text>{{goods > 0 ? goods : '点赞'}}</text>
				</view>
				<view class="tools-item" @click="handleReplyBtn">
					<u-icon name="chat" size="38"></u-icon>
					<text>回复</text>
				</view>
				<view class="tools-item" @click="handleShareBtn">
					<u-icon name="zhuanfa" size="38"></u-icon>
					<text>分享</text>
				</view>
				<view class="tools-item" @click="handleMoreBtn">
					<u-icon name="more-dot-fill" size="38"></u-icon>
				</view>
			</template>
			<template v-else>
				<navigator :url="url" class="tools-item">
						<u-icon name="chat" size="38"></u-icon>
						<text class="num">{{ansNum}}</text>
				</navigator>
				<navigator :url="url" class="tools-item ans-btn">评论</navigator>
			</template>
			
		</view>
		
		<share-modal
			:show="shareShow"
			@change-flag="handleShareBtn"
		></share-modal>
		<u-action-sheet 
			:list="listMoreBtn" 
			v-model="listMoreShow"
			@click="getActionSheetIndex"
		></u-action-sheet>
		<q-a-reply
			:show="replyShow"
			@change-flag="handleReplyBtn"
		></q-a-reply>
	</view>
	
</template>

<script>
	import shareModal from '@/components/shareModal/shareModal.vue'
	import QAReply from '@/components/QAReply/QAReply.vue'
	export default {
		props: {
			uid: {
				type: Number | String,
				default: 0
			},
			type: {
				type: Number | String,
				default: 0
			},
			isQ: {
				type: Boolean,
				default: false
			},
			isAuthor: {
				type: Boolean,
				default: false
			},
			goods: {
				type: Number | String,
				default: 0
			},
			ansNum: {
				type: Number | String,
				default: 0
			},
		},
		data() {
			return {
				shareShow: false,
				listMoreShow: false,
				listMoreBtn: [
					{
						text: '举报',
						color: 'red'
					}
				],
				replyShow: false,
				
			};
		},
		computed: {
			url() {
				return `/pages/qaDetail/qaDetail?id=${this.uid}&type=${this.type}`
			}
		},
		components: {
			shareModal,
			QAReply
		},
		methods: {
			
			//点赞
			handleGoodsBtn() {
				uni.showToast({
				    title: '已点赞',
				    duration: 1000
				});
			},
			//回复
			handleReplyBtn() {
				this.replyShow = !this.replyShow
			},
			//分享
			handleShareBtn() {
				this.shareShow = !this.shareShow
			},
			//更多
			handleMoreBtn() {
				this.listMoreShow = true
			},
			getActionSheetIndex(index) {
				if(index == 0) {
					//举报
					uni.navigateTo({
						url: '/pages/qFeed/qFeed'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.num {
		margin-left: 6rpx;
	}
	.item-footer-tools {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		font-size: 28rpx;
		color: #666;
		
	}
	.tools-item {
		display: flex;
		align-items: center;
	}
	.tools-item text{
		margin-left: 5px;
	}
	.ans-btn {
		background-color: $jzb-theme-color;
		color: #fff;
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		justify-content: center;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
</style>
