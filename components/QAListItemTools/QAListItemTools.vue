<template>
	<view>
		
		<view class="item-footer-tools" :class="{'rep': !isAnswer && !isAuthor}">
			<template v-if="!isAuthor">
				<template v-if="isAnswer">
					<view class="tools-item" @click="handleGoodsBtn">
						<template v-if="goods == 1">
							<u-icon name="thumb-up-fill" size="38" color="#007aff"></u-icon>
							<text class="icon-name">已赞</text>
						</template>
						<template v-else>
							<u-icon name="thumb-up" size="38"></u-icon>
							<text class="icon-name">点赞</text>
						</template>
						
					</view>
					<view class="tools-item" @click="handleReplyBtn">
						<u-icon name="chat" size="38"></u-icon>
						<text class="icon-name">回复</text>
					</view>
					<view class="tools-item" @click="handleShare">
						<u-icon name="zhuanfa" size="38"></u-icon>
						<text class="icon-name">分享</text>
					</view>
				</template>
				
				<view class="tools-item" @click="handleMoreBtn">
					<u-icon name="more-dot-fill" size="38"></u-icon>
				</view>
			</template>
			<template v-else>
				<view class="tools-item">
					<navigator :url="url" class="item-data">
						<u-icon name="chat" size="36" color="#999"></u-icon>
						<text class="num">{{ansNum}}</text>
					</navigator>
					<template v-if="time">
						<view class="item-data item-time">
							<u-icon name="clock" size="32" color="#999"></u-icon>
							<text class="num">{{time}}</text>
						</view>
					</template>
					
				</view>
				
				<!-- <navigator :url="url" class="tools-item ans-btn">评论</navigator> -->
			</template>
			
		</view>
		
		<share-modal
			:show="shareShow"
			:opt="options"
			@change-flag="handleShareBtn"
		></share-modal>
		<u-action-sheet 
			:list="listMoreBtn" 
			v-model="listMoreShow"
			@click="getActionSheetIndex"
		></u-action-sheet>
		<q-a-reply
			:show="replyShow"
			:repPerson="name"
			@reply-event="handleReply"
			@change-flag="handleReplyBtn"
		></q-a-reply>
	</view>
	
</template>

<script>
	import shareModal from '@/components/shareModal/shareModal.vue'
	import QAReply from '@/components/QAReply/QAReply.vue'
	import {mapMutations} from 'vuex'
	export default {
		props: {
			time: {
				type: String,
				default: ''
			},
			uid: {
				type: Number | String,
				default: 0
			},
			qid: {
				type: Number | String,
				default: 0
			},
			aid: {
				type: Number | String,
				default: 0
			},
			type: {
				type: Number | String,
				default: 0
			},
			isAnswer: {
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
			name: {
				type: String,
				default: ''
			},
			reportInfo: {
				type: String,
				default: ''
			},
			qTitle: {
				type: String,
				default: ''
			},
			itemInfo: {
				type: Object,
				default: {
					pic: '',
					name: '',
					type: '',
					company: '',
					title: '',
					intro: '',
					uptime: ''
				}
			}
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
				replyApi: '',
				options: {}
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
		created() {
			this.replyApi = this.type == 1 ? '/Home/Jzbxcx/reply_viewpoint' : '/Home/Jzbxcx/add_questions_comment'
		},
		methods: {
			...mapMutations(['changeShareOptions']),
			//点赞
			async handleGoodsBtn() {
				if(this.goods == 1) return
				await this.handleReply(this.$store.state.goodStr)
			},
			async handleReply(intro) {
				// console.log(intro)	
				uni.showLoading({
					title: '操作提交中...',
					mask: true
				})
				let res = await this.$https.get(this.replyApi, {
					params: {
						id: this.qid, 
						cate: this.aid, 
						intro: intro, 
						title: 'reply_a_title',
					},
				})
				uni.hideLoading()
				if(res.data.code == 1) {
					uni.showToast({
						title: '操作成功',
						icon: 'success',
						duration: 1000,
					})
					this.$emit('follow-event')
				}
			},
			//回复
			handleReplyBtn() {
				this.replyShow = !this.replyShow
			},
			//分享
			handleShareBtn() {
				this.shareShow = !this.shareShow
			},
			handleShare() {
				this.options = {
					title: '网经社采访解读海报',
					posterImgUrl: this.itemInfo.pic,
					name: this.itemInfo.name,
					label: this.itemInfo.type,
					sub: this.itemInfo.title || this.itemInfo.company,
					contentTitle: `${this.itemInfo.name}于${this.itemInfo.uptime}接受采访解读${this.qTitle}：`,
					contentText: this.itemInfo.intro,
					curPageUrl: getCurrentPages()[0]['$page'].fullPath.slice(1),
				}
				this.handleShareBtn()
				// this.changeShareOptions(options)
				// this.$nextTick(() => {
				// 	this.$refs.hchPoster.posterShow()
				// })
			},
			//更多
			handleMoreBtn() {
				this.listMoreShow = true
			},
			getActionSheetIndex(index) {
				if(index == 0) {
					//举报
					this.handleReportBtn()
				}
			},
			handleReportBtn() {
				uni.navigateTo({
					url: `/pages/ideaFeed/ideaFeed?cate=${Number(this.type)+1}&tid=${this.qid}&uid=${this.uid}&reportInfo=${this.reportInfo}`
				})
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
		height: 70rpx;
		font-size: 28rpx;
		color: #666;
		
	}
	.item-footer-tools.rep {
		justify-content: flex-end;
	}
	.tools-item {
		display: flex;
		align-items: center;
	}
	.tools-item .icon-name{
		margin-left: 5px;
	}
	.item-time {
		margin-left: 20rpx;
	}
	.item-data {
		display: flex;
		align-items: center;
		color: #999;
	}
	.ans-btn {
		background-color: $jzb-theme-color;
		color: #fff;
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		justify-content: center;
		border-radius: 10rpx;
		font-size: 24rpx;
	}
</style>
