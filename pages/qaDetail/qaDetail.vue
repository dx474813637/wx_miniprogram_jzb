<template>
	<view class="qa-detail">
		<view class="q-detail qa-wrap">
			<view class="q-header">
				<view class="q-title">
					{{qList.title}}
				</view>
				<template v-if="qList.post_time||qList.uptime">
					<view class="q-post-date">
						{{ (qList.post_time||qList.uptime) | timeFilter}}
					</view>
				</template>
			</view>
			<view class="q-user-card-wrap">
				<q-a-user-profile
					:userid="authorInfo.id"
					:avatar="authorInfo.pic"
					:name="authorInfo.name"
					:label="authorInfo.auth_status == 2 ? authorInfo.type : '未认证'"
					:sub="authorInfo.title || authorInfo.company"
					:isFollow="author_follow"
					@follow-event="handleFollow"
				></q-a-user-profile>
			</view>
			
			<view class="q-content">
				{{qList.intro}}
			</view>
			<view class="a-btn">
				<u-button 
					:custom-style="customStyle" 
					type="primary" 
					:plain="true" 
					@click="handleReplyBtn" 
					shape="circle"
				>评论</u-button>
			</view>
		</view>
		<template v-if="qList.url">
			<view class="qa-wrap">
				<view class="qa-title">
					<u-icon name="share" size="40"></u-icon><text class="qa-title-t">记者报道</text>
				</view>
				<navigator class="qa-content" url="/pages/search/search">
					{{qList.url}}
				</navigator>
			</view>
		</template> 
		
		<!-- 邀请回复区 -->
		<template v-if="answerList && answerList.length > 0">
			<view class="qa-wrap">
				<view class="qa-title">
					<u-icon name="chat-fill" size="40"></u-icon><text class="qa-title-t">特邀解读</text>
				</view>
				<q-a-detail-list
					:isAnswer="true"
					:list="answerList"
				></q-a-detail-list>
			</view>
		</template>
		
		<!-- 评论回复区 -->
		<!-- <template v-if="replyList && replyList.length > 0"> -->
			<view class="qa-wrap">
				<view class="qa-title">
					<u-icon name="chat-fill" size="40"></u-icon><text class="qa-title-t">话题评论</text>
				</view>
				<q-a-detail-list
					:isAnswer="false"
					:list="replyList"
				></q-a-detail-list>
			</view>
		<!-- </template> -->
		
		
		<view class="q-a-detail-footer">
			<view class="footer-item" @click="handleReplyBtn">
				<u-icon name="chat" size="34"></u-icon><text>评论</text>
			</view>
			<view class="footer-item" @click="handleCollection">
				<template v-if="!collection">
					<u-icon name="star" size="34"></u-icon><text>收藏</text>
				</template>
				<template v-else>
					<u-icon name="star-fill" size="34"></u-icon><text>已收藏</text>
				</template>
				
			</view>
			<view class="footer-item" @click="handleShareBtn">
				<u-icon name="zhuanfa" size="34"></u-icon><text>分享</text>
			</view>
		</view>
		
		<share-modal
			:show="shareShow"
			@change-flag="handleShareBtn"
		></share-modal>
		<q-a-reply
			:show="replyShow"
			:rep-person="repPerson"
			@change-flag="handleShowReply"
			@reply-event="handleReply"
		></q-a-reply>
		<rz-select-modal
			:show="rzModalShow"
			@change-flag="handleShowRzBox"
		></rz-select-modal>
	</view>
</template>

<script>
	import QADetailList from '@/components/QADetailList/QADetailList.vue'
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	import QAReply from '@/components/QAReply/QAReply.vue'
	import shareModal from '@/components/shareModal/shareModal.vue'
	import rzSelectModal from '@/components/rzSelectModal/rzSelectModal.vue'
	export default {
		data() {
			return {
				uid: '',
				detailApi: '',
				replyApi: '',
				type: 0,
				qList: {},
				authorInfo: {},
				answerList: [],
				replyList: [],
				author_follow: 0,
				customStyle: {
					fontWeight: 'bold'
				},
				replyShow: false,
				shareShow: false,
				rzModalShow: false,
				collection: 0
				
			}
		},
		components: {
			QADetailList,
			QAUserProfile,
			QAReply,
			rzSelectModal,
			shareModal
		},
		onLoad(opt) {
			// console.log(opt)
			if(opt.id) {
				this.uid = opt.id
			}
			if(opt.type) {
				this.type = opt.type
				this.detailApi = this.type == 1 ? '/Home/Jzbxcx/viewpoint_detail' : '/Home/Jzbxcx/questions_detail'
				this.replyApi = this.type == 1 ? '/Home/Jzbxcx/reply_viewpoint' : '/Home/Jzbxcx/add_questions_comment'
			}
			this.getData()
		},
		computed: {
			answerNum() {
				return this.answerList.length
			},
			repPerson() {
				return this.qList.title || this.authorInfo.name
			}
		},
		methods: {
			async getData() {
				let api = this.detailApi
				let res = await this.$https.get(api, {params: {id: this.uid}})
				this.qList = res.data.list
				this.authorInfo = res.data.user_info
				this.author_follow = res.data.follow
				this.collection = res.data.collection
				// this.answerNum = res.data.answer_num
				if(this.type == 1) {
					this.replyList = res.data.reply_list
				}
				else if(this.type == 0) {
					this.replyList = res.data.comment
					this.answerList = res.data.answer
				}
			},
			async followUser(userid) {
				return await this.$https.get('/Home/Jzbxcx/follow_user', {params: {id: userid}})
			},
			async cancelFollowUser(userid) {
				return await this.$https.get('/Home/Jzbxcx/follow_cancel', {params: {id: userid}})
			},
			async handleFollow(obj) {
				let res
				if(obj.isFollow) {
					res = await this.cancelFollowUser(obj.userid)
				}else {
					res = await this.followUser(obj.userid)
				}
				if(res.data.code == 1) {
					await this.getData()
					uni.showToast({
						title: (obj.isFollow? '取消关注' : '关注成功'),
						icon: 'success',
						duration: 1000
					})
				}
			},
			handleReplyBtn() {
				if(this.$store.state.infoAuthorize.auth_status == '2') {
					this.handleShowReply()
				}else {
					this.handleShowRzBox()
				}
			},
			//分享
			handleShareBtn() {
				this.shareShow = !this.shareShow
			},
			handleShowReply() {
				this.replyShow = !this.replyShow
			},
			handleShowRzBox() {
				this.rzModalShow = !this.rzModalShow
			},
			async handleReply(intro) {
				// console.log(intro)	
				uni.showLoading({
					title: '评论提交中...',
					mask: true
				})
				let res = await this.$https.get(this.replyApi, {params: {id: this.uid, intro: intro, title: 'reply_title'}})
				if(res.data.code == 1) {
					await this.getData()
					uni.showToast({
						title: '评论成功',
						icon: 'success',
						duration: 1000
					})
				}
				uni.hideLoading()
			},
			async collectionEvent(api) {
				return await this.$https.get(api, {params: {
					id: this.uid,
					cate: this.type == 1? 2 : 1
				}})
			},
			async handleCollection() {
				let api 
				if(this.collection == 1) api = '/Home/Jzbxcx/cancel_collection'
				else api = '/Home/Jzbxcx/add_collection'
				
				let res = await this.collectionEvent(api)
				if(res.data.code == 1) {
					this.collection = 1 - this.collection
					uni.showToast({
						title: this.collection ? '收藏成功' : '取消收藏',
						icon: 'success',
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
		
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
		line-height: 60rpx;
		margin-bottom: 20rpx;
	}
	.q-user-card-wrap {
		background-color: #f8f8f8;
		border: 2rpx solid #eee;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
	}
	
	.q-content {
		line-height: 55rpx;
		font-size: 28rpx;
		margin-bottom: 50rpx;
		white-space: pre-wrap;
	}
	.a-btn {
		padding: 20rpx 0px;
	}
	.q-a-detail-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		z-index: 200;
		border-top: 2rpx solid #eee;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: $jzb-theme-color;
	}
	.footer-item {
		font-size: 28rpx;
	}
	.footer-item text {
		margin-left: 10rpx;
	}
</style>
