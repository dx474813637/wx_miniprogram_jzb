<template>
	<view class="qa-detail">
		<view class="q-detail qa-wrap">
			<view class="q-user-card-wrap">
				<q-a-user-profile
					:name="authorInfo.name"
					:avatar="authorInfo.pic"
					:sub="authorInfo.company"
					:label="authorInfo.type"
					:userid="authorInfo.poster"
					:isFollow="authorFollow"
				></q-a-user-profile>
			</view>
			<template v-if="qList">
				<view class="q-header">
					<view class="q-title">{{qList.title}}</view>
						<view class="q-post-date">
							<view class="date-item">
								{{ qList.post_time | timeFilter}} 发出邀请
							</view>
							<template v-if="zt != 3 ">
								<view class="date-item">
									<template v-if="!isTimeLimit">
										<u-count-down
											separator="zh" 
											hide-zero-day 
											:timestamp="qList.timestamp"
											:show-seconds="false"
											:show-days="qList.timestamp > 86400? true : false"
										></u-count-down>
										后到对方截稿日期
									</template>
									<template v-else>
										已过截稿日期
									</template>
								</view>
							</template>
						</view>
					
				</view>
				
				<view class="q-content">{{qList.intro}}</view>
				
				<template v-if="qList.zt == 1 && (zt == 1 || zt == 0)">
					<view class="jujue" style="text-align: left;">
						对方已结束本次采访，目前您未处理此次采访提问，如若接受并回复本次采访提问，回复内容依然会公开显示在原文“特邀解读”中，请谨慎操作。
					</view>
				</template>
			</template>
			
		</view>
		<template v-if="isHaveAnswer">
			<view class="a-box">
				<view class="a-box-title">
					<u-icon name="chat" color="#007aff" size="40"></u-icon>
					<text>我的回复</text>
					<template v-if="zt == 1">
						<text class="unchecked">（未确认提交回复）</text>
					</template>
					
				</view>
				<view class="a-content">{{selfAnswer.intro}}</view>
			</view>
		</template>
		
		<template v-if="zt == 2">
			<view class="a-box">
				<view class="a-box-title">
					<u-icon name="file-text-fill" color="#007aff" size="40"></u-icon>
					<text>评价采访</text>
				</view>
				
				
				<view class="w-item">
					<view class="info-rate">
						<text class="info">{{authorInfo.name}}</text>
						<u-rate 
							:count="5" 
							v-model="selfAnswer.score_questions" 
							:disabled="!showSetScoreBtn" 
							active-color="#007aff" 
							inactive-icon="star-fill" 
							inactive-color="#ddd" 
							size="40"
						></u-rate>
					</view>
				</view>
			</view>
		</template>
		<template v-else-if="zt == 3">
			<view class="jujue">
				您已拒绝本次采访邀请
			</view>
		</template>
		
		<template v-if="zt != 3">
			<view class="bottom">
				<template v-if="zt == 0">
					<view class="bottom-item bw">
						<u-button type="error" plain @click="handleSelectFlag">拒绝</u-button>
					</view>
					<view class="bottom-item bw">
						<u-button type="primary" @click="handleGet">接受采访</u-button>
					</view>
				</template>
				<template v-else-if="zt == 1">
					<view class="bottom-item bw">
						<u-button type="primary" @click="handleShowReply">在线编辑回复</u-button>
					</view>
					<view class="bottom-item bw">
						<u-button type="error" :disabled="!isHaveAnswer" plain @click="handlecheckReply">确认提交回复</u-button>
					</view>
				</template>
				<template v-else-if="zt == 2 && showSetScoreBtn">
					<view class="bottom-item ">
						<u-button type="primary" @click="handleSubmitScore" :disabled="selfAnswer.score_questions == 0">提交评价</u-button>
					</view>
				</template>
				
			</view>
		</template>
		
		
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
			@cancel="handleModalCancel"
			show-cancel-button
		></u-modal>
		<q-a-reply
			:show="showReply"
			:rep-person="qList.title"
			:repInfo="selfAnswer.intro"
			:repLen="1500"
			@change-flag="handleShowReply"
			@reply-event="handleReply"
		></q-a-reply>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue';
	import QAReply from '@/components/QAReply/QAReply.vue'
	import { mixinUpRead } from '@/utils/mixin_msg.js'
	export default {
		mixins: [mixinUpRead],
		data() {
			return {
				flag: false,
				dV: [0],
				reason: '',
				showSelect: false,
				showModal: false,
				showReply:false,
				modalContent: '',
				aContent: '',
				score: 0,
				selectList: [
					{
						value: 0,
						label: '话题敏感'
					},
					{
						value: 1,
						label: '时间不充分'
					},
					{
						value: 2,
						label: '专业知识不对口'
					},
					{
						value: 3,
						label: '其他原因'
					}
				],
				zt: 0,
				qid: '',
				iid: '',
				authorInfo: {},
				authorFollow: false,
				qList: '',
				selfAnswer: {},
				isTimeLimit: false,
				showSetScoreBtn: true
			}
		},
		async onLoad(opt) {
			this.zt = opt.zt
			this.qid = opt.qid
			this.iid = opt.id
			try {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				await this.renderList()
			} catch(err) {
				uni.showToast({
					title: '加载失败。'
				})
			}
			uni.hideLoading()
			// zt 0 邀请中 1接受邀请正在回复 2 完成回复 3拒绝邀请
		},
		computed: {
			isHaveAnswer() {
				return this.selfAnswer.intro ? true : false
			}
		},
		components: {
			QAUserProfile,
			QAReply
		},
		methods: {
			async renderList() {
				let res = await this.getData()
				this.authorInfo = res.data.user_info
				this.authorFollow = res.data.follow
				let timestamp = Date.parse(new Date(res.data.list.end_time.replace(/-/g,'/'))) - Date.parse(new Date())
				res.data.list.timestamp = timestamp/1000
				this.isTimeLimit = timestamp > 0 ? false : true
				this.qList = res.data.list
				this.selfAnswer = res.data.answer.filter(ele => {
					return this.$store.state.infoAuthorize.poster == ele.poster
				})[0]
				if(this.selfAnswer.score_questions != 0) this.showSetScoreBtn = false
				
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/questions_detail', {params: {id: this.qid}})
			},
			async handleInvitation() {
				let res = await this.$https.get('/Home/Jzbxcx/questions_answer_handle', {
					params: {
						id: this.iid,
						zt: this.zt,
						msg: this.reason
					}
				})
				if(res.data.code == 1) {
					await this.renderList()
					uni.showToast({
						title: '提交成功',
					})
				}
			},
			handleSelectFlag() {
				this.showSelect = true
			},
			handleSelectConfirm(v) {
				this.dV = [v[0].value]
				this.reason = v[0].label
				this.modalContent = '是否以该原因（' + v[0].label + '）拒绝本次采访邀请？'
				this.showModal = true
			},
			handleModalConfirm() {
				//确认按钮 拒绝事件
				this.zt = 3
				this.handleInvitation()
			},
			handleModalCancel() {
				this.reason = ''
			},
			handleGet() {
				uni.showModal({
				    title: '提示',
				    content: '你接受了本次采访邀请，请在对方截稿日期前在线回复，谢谢您的配合！',
				});
				
				this.zt = 1
				this.handleInvitation()
			},
			handleShowReply(content) {
				this.showReply = !this.showReply
			},
			async handleReply(intro) {
				//点击回复的回调事件
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let res = await this.handleReplyHttp(intro)
				if(res.data.code == 1) {
					uni.hideLoading()
					await this.renderList()
					uni.showModal({
					    title: '提示',
					    content: '编辑成功，是否跳过检查直接提交回复给记者',
					    success: res => {
					        if (res.confirm) {
								this.handlecheckReply()
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			async handleReplyHttp(intro) {
				return await this.$https.post('/Home/Jzbxcx/questions_answer_up', {id: this.qid, intro: intro})
			},
			handlecheckReply() {
				this.zt = 2;
				this.handleInvitation()
			},
			async handleSubmitScore() {
				if(this.selfAnswer.score_questions != 0) {
					uni.showLoading({
						title: '提交评价中...'
					})
					let res = await this.setQuestionScore()
					uni.hideLoading()
					if(res.data.code == 1) {
						this.showSetScoreBtn = false
						uni.showToast({
							title: '评价成功'
						})
					}
					
				}
			},
			async setQuestionScore() {
				return await this.$https.get('/Home/Jzbxcx/questions_score', {
					params: {
						id: this.selfAnswer.id,
						score: this.selfAnswer.score_questions
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.jujue {
		text-align: center;
		line-height: 60rpx;
		padding: 60rpx 0;
		color: #ff0000;
		
	}
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
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}
	.a-box-title text {
		margin-left: 5rpx;
	}
	.a-content {
		line-height: 50rpx;
		font-size: 32rpx;
		margin-bottom: 50rpx;
		white-space: pre-wrap;
	}
	.bottom-item {
		width: 100%;
	}
	.bottom-item.bw {
		flex: 0 0 45%;
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
		white-space: pre-wrap;
	}
	.unchecked {
		font-weight: normal;
		color: #999;
		margin-left: 10rpx;
	}
</style>
