<template>
	<view class="qa-detail">
		<view class="q-detail qa-wrap u-skeleton">
			<view class="q-header ">
				<skeleton
				  :showAvatar="false"
				  :loading="load"
				  :titleWidth="100"
				  :row="1"
				>
					<view class="q-title u-skeleton-fillet">
						{{qList.title}}
					</view>
				
					<template v-if="qList.post_time||qList.uptime">
						<view class="q-post-date ">
							<text class="u-skeleton-fillet">{{ (qList.post_time||qList.uptime) | timeFilter}}</text>
						</view>
					</template>
				</skeleton>
			</view>
			<skeleton
			  :loading="load"
			  :row="1"
			>
				<view class="q-user-card-wrap ">
					<q-a-user-profile
						:userid="authorInfo.id"
						:avatar="authorInfo.pic"
						:name="authorInfo.name"
						:label="authorInfo.auth_status == 2 ? authorInfo.type : '未认证'"
						:sub="authorInfo.title || authorInfo.company"
						:isFollow="author_follow"
						:loading="load"
						@follow-event="handleFollow"
					></q-a-user-profile>
				</view>
			</skeleton>
			
			<skeleton
				:showAvatar="false"
				:loading="load"
				:row="3"
			>
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
			</skeleton>
		</view>
		<template v-if="urlFlag">
			<view class="qa-wrap">
				<view class="qa-title">
					<u-icon name="share" size="36"></u-icon><text class="qa-title-t">记者报道</text>
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
					<u-icon name="chat-fill" size="36"></u-icon><text class="qa-title-t">特邀解读</text>
				</view>
				<q-a-detail-list
					:isAnswer="true"
					:list="answerList"
					:skLoading="load"
					@follow-event="handleFollow"
					@update-rep-list="handleUpdateRepList"
					:qTitle="qList.title"
				>	
					<q-a-detail-list
						:list="repList"
						:isShowFollowBtn="false"
						@follow-event="handleFollow"
					></q-a-detail-list>
				</q-a-detail-list>
			</view>
		</template>
		
		<!-- 评论回复区 -->
		<!-- <template v-if="replyList && replyList.length > 0"> -->
			<view class="qa-wrap">
				<view class="qa-title">
					<u-icon name="chat-fill" size="36"></u-icon><text class="qa-title-t">话题留言</text>
				</view>
				
				<skeleton
					:loading="load"
					:row="3"
				>
					<q-a-detail-list
						:type="type"
						:isAnswer="false"
						:list="replyList"
						@tip-off="handleReportBtn"
						:isShowFollowBtn="false"
					></q-a-detail-list>
				</skeleton>
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
			<view class="footer-item" @click="handleShare">
				<u-icon name="zhuanfa" size="34"></u-icon><text>分享</text>
			</view>
			<view class="footer-item report" @click="handleReportBtn">
				<u-icon name="error-circle" size="34" color="#dc0000"></u-icon><text>举报</text>
			</view>
		</view>
		
		<share-modal
			:show="shareShow"
			:opt="options"
			@render-event="handleShareBtn"
			@change-flag="handleShare"
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
	import {sharePage} from '@/utils/sharePage.js'
	import QADetailList from '@/components/QADetailList/QADetailList.vue'
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	import QAReply from '@/components/QAReply/QAReply.vue'
	import shareModal from '@/components/shareModal/shareModal.vue'
	import rzSelectModal from '@/components/rzSelectModal/rzSelectModal.vue'
	import Skeleton from '@/components/skeleton/index.vue'
	export default {
		mixins: [sharePage],
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
				collection: 0,
				like: 0,
				repList: '',
				load: true,
				options: {}
			}
		},
		components: {
			QADetailList,
			QAUserProfile,
			QAReply,
			rzSelectModal,
			shareModal,
			Skeleton
		},
		async onLoad(opt) {
			// console.log(opt)
			if(opt.id) {
				this.uid = opt.id
			}
			if(opt.type) {
				this.type = opt.type || 0
				this.detailApi = this.type == 1 ? '/Home/Jzbxcx/viewpoint_detail' : '/Home/Jzbxcx/questions_detail'
				this.replyApi = this.type == 1 ? '/Home/Jzbxcx/reply_viewpoint' : '/Home/Jzbxcx/add_questions_comment'
			}
			// await this.getData()
			// uni.hideLoading()
		},
		async onShow() {
			this.renderList()
		},
		computed: {
			answerNum() {
				return this.answerList.length
			},
			repPerson() {
				return this.qList.title || this.authorInfo.name
			},
			urlFlag() {
				if(this.qList.url) {
					if(this.qList.url.indexOf('原因') == 0) {
						return false
					}else {
						return true
					}
				}
				return false
			}
		},
		methods: {
			// ...mapMutations(['changeShareOptions']),
			async getData() {
				let api = this.detailApi
				return await this.$https.get(api, {params: {id: this.uid}})

			},
			async renderList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let res = await this.getData()
				this.qList = res.data.list
				this.authorInfo = res.data.user_info
				this.author_follow = res.data.follow
				this.collection = res.data.collection
				// this.answerNum = res.data.answer_num
				if(this.type == 1) {
					this.replyList = res.data.reply_list
				}
				else if(this.type == 0) {
					this.replyList = res.data.comment.filter(ele => ele.cate == 0)
					this.answerList = res.data.answer.filter(ele => ele.zt == 2)
									.map(ele => {
										let id = ele.id
										let arr = res.data.comment.filter(item => item.cate == id)
										ele.rList = arr
										if(arr.length > 3) ele.showMoreRep = true
										ele.goods = arr.filter(item => {
											return item.intro == this.$store.state.goodStr && item.poster == this.$store.state.infoAuthorize.poster
										}).length == 0 ? 0 : 1
										return ele
									})
				}
				let time = this.type == 1 ? this.qList.uptime : this.qList.post_time
				let itype = this.type == 1 ? '发声' :'采访提问'
				this.options = {
					title: `网经社${itype}海报`,
					posterImgUrl: this.authorInfo.pic,
					name: this.authorInfo.name,
					label: this.authorInfo.type,
					sub: this.authorInfo.title || this.authorInfo.company,
					contentTitle: `${this.authorInfo.name}于${time}${this.type == 1 ? itype : '发布'+itype}${this.qList.title}：`,
					contentText: this.qList.intro,
					curPageUrl: getCurrentPages()[0]['$page'].fullPath.slice(1),
				}
				this.load = false
				uni.hideLoading()
			},
			async handleFollow(obj) {
				this.renderList()
				
			},
			handleReplyBtn() {
				if(!this.$store.state.phoneReg) {
					uni.navigateTo({
						url: '/pages/wxAuthorize/wxAuthorize?phone=1'
					})
					return
				}
				if(this.$store.state.infoAuthorize.auth_status == '2') {
					this.handleShowReply()
				}else {
					this.handleShowRzBox()
				}
			},
			//分享
			handleShare() {
				this.shareShow = !this.shareShow
			},
			handleShareBtn() {
				// this.handleShare()
				// if(obj.type == 'q') {
				
				// this.changeShareOptions(options)
				
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
				uni.hideLoading()
				if(res.data.code == 1) {
					uni.showToast({
						title: '评论成功',
						icon: 'success',
						duration: 1000,
					})
					setTimeout(() => {
						this.renderList()
					})
				}
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
			},
			handleReportBtn() {
				uni.navigateTo({
					url: `/pages/ideaFeed/ideaFeed?cate=${Number(this.type)+1}&tid=${this.qList.id}`
				})
			},
			handleUpdateRepList(list) {
				this.repList = list
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
		font-size: 36rpx;
		line-height: 50rpx;
		margin-bottom: 20rpx;
	}
	.qa-title {
		display: flex;
		align-items: center;
		font-size: 30rpx;
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
		// line-height: 50rpx;
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
	.footer-item.report {
		color: #dc0000;
	}
	.footer-item text {
		margin-left: 5rpx;
	}
</style>
