<template>
	<view>
		<u-form
			:model="form" 
			ref="sendForm"
			label-position="top"
			:error-type="errorType"
		>
			
			<template v-if="answerList.length > 0">
				<view class="w">
					<view class="w-t">
						<u-icon name="file-text-fill" size="36"></u-icon>评价专家
					</view>
					<view class="w-item" v-for="(item, index) in answerList" :key="index">
						<q-a-user-profile
							:name="item.name"
							:avatar="item.pic"
							:sub="item.company"
							:label="item.type"
							:userid="item.poster"
							:isFollow="item.follow"
						></q-a-user-profile>
						<view class="info-rate">
							<text class="info">回复时间</text>
							<text>{{item.uptime}}</text>
						</view>
						<view class="info-rate">
							<text class="info">评分</text>
							<u-rate :count="5" :disabled="item.disabled" v-model="item.score_answer" inactive-icon="star-fill" active-color="#007aff" inactive-color="#dedede" size="40"></u-rate>
						</view>
					</view>
					<u-button type="primary" :disabled="!setScoreBtn" :custom-style="customStyle" @click="setAllScore">提交评价</u-button>
				</view>
			</template>
			<view class="w">
				
				<u-form-item label="稿件地址" prop="url" required>
					<u-input v-model="form.url" placeholder="稿件地址（如有特殊原因请勾选“申请免链接提交”）" />
				</u-form-item>
				
				<view class="q-sub">
					<u-checkbox 
						v-model="form.isApply" 
						shape="circle"
					>申请免链接提交完成采访提问</u-checkbox>
					
				</view>
				<template v-if="apply">
					<u-form-item label="原因说明" prop="yy" required>
						<u-input v-model="form.yy" placeholder="原因" />
						
					</u-form-item>
				</template>
				
				<view class="zhu">
					注：“完成采访提问”按钮为不可逆过程，请谨慎操作。完整填写稿件地址将会享受更多网经社优质服务。
				</view>
				<view class="f-w">
					<view class="bw-item">
						<u-button type="primary" plain :custom-style="customStyle" @click="handleReturn">返回上一步</u-button>
					</view>
					
					<view class="bw-item">
						<u-button type="error" :custom-style="customStyle" :disabled="qData.list.zt == 1? true: false" @click="endQuestion">{{qData.list.zt == 1? '本次采访提问已结束' : '上传稿件完成采访提问'}}</u-button>
					</view>
				</view>	
			</view>
			
			
		</u-form>
	</view>
</template>

<script>
	
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue';
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
			}
		},
		data() {
			return {
				value: 0,
				show: false,
				errorType: ['message'],
				answerList: [],
				form: {
					url: '',
					isApply: false,
					yy: ''
				},
				rules: {
					
				},
				apply: false,
				customStyle: {
					fontSize: '28rpx'
				}
			};
		},
		created() {
			this.renderData(this.qData)
		},
		components: {
			QAUserProfile
		},
		watch: {
			['form.isApply'] (newV) {
				this.apply = newV
			},
			qData(newV) {
				this.renderData(newV)
			}
		},
		computed: {
			setScoreBtn() {
				let show = false
				this.answerList.forEach(ele => {
					if(!ele.disabled && ele.score_answer != 0) {
						show = true
					}
				})
				
				return show
			}
		},
		methods: {
			async setAnswerScore(id, score) {
				return await this.$https.get('/Home/Jzbxcx/answer_score', {
					params: {id, score}
				})
			},
			async setAllScore() {
				let arr = this.answerList.map(ele => {
					return this.setAnswerScore(ele.id, ele.score_answer)
				})
				let allRes = await Promise.all(arr)
				let ar = allRes.map(ele => ele.data.code)
				if(!ar.includes(2)) {
					uni.showToast({
						title: '评价成功！'
					})
					this.$emit('end-q')
				}else {
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					})
				}
				
				console.log(allRes)
			},
			renderData(data) {
				if(Object.keys(data).length == 0 ) return 
				this.answerList = data.answer.filter(ele => {
					ele.disabled = ele.score_answer == 0 ? false : true
					return ele.zt == 2 && ele.intro
				})
				if(data.list.url) {
					if(data.list.url.indexOf('原因') != 0) {
						this.$set(this.form, 'url', data.list.url)
					}else {
						this.$set(this.form, 'isApply', true)
						this.$set(this.form, 'yy', data.list.url.slice(2))
					}
					
				}
			},
			handleConfirm(v) {
				this.form.yy = v[0].label
			},
			async endQuestion() {
				if(!this.form.url && !this.form.isApply) {
					uni.showToast({
						title: '请填写稿件地址或勾选申请免链接提交！',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				let res = await this.handleUpUrl()
				uni.hideLoading()
				if(res.data.code == 1){
					this.$emit('end-q')
					uni.showModal({
						title: '提示',
						content: '提交成功，是否返回采访列表',
						success: function (res) {
							if (res.confirm) {
								uni.navigateBack()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					
				}
			},
			async handleUpUrl() {
				let up = this.form.url || ('原因' + this.form.yy)
				return await this.$https.get('/Home/Jzbxcx/add_questions_url', {params: {id: this.qid, url: up}})
			},
			handleReturn() {
				this.$emit('change-step', 2)
			}
		}
	}
</script>

<style scoped lang="scss">
	.zhu {
		color: #999;
		padding: 20rpx 0;
	}
	.main2 {
		margin-top: 60rpx;
	}
	.w {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}
	.f-w {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	.bw-item {
		flex: 0 0 45%;
		width: 45%;
	}
	.w-item {
		margin-bottom: 30rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.info-rate {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		color: #666;
	}
	.info-rate .info {
		// font-weight: bold;
	}
	.w-t {
		color: $jzb-theme-color;
		font-weight: bold;
		font-size: 32rpx;
		margin-bottom: 50rpx;
	}
	.q-sub {
		padding: 20rpx 0;
		margin-top:30rpx;
	
	}
</style>
