<template>
	<view>
		<template v-if="infoAuthorize.type == 0">
			
			<u-notice-bar
				:list="['点击查看记者采访提问完整版攻略']"
				close-icon
				type="primary"
				:autoplay="false"
				mode="vertical"
				play-state="paused"
				:show="noticeShow"
				@click="lookQuestion"
				@close="this.noticeShow = false"
			></u-notice-bar>
			
			<view class="u-steps w">
				<u-steps 
					mode="number" 
					:list="numList" 
					:current="current"
				></u-steps>
				
			</view>
		</template>
		<template v-if="current == 0">
			<send-step-one
				@change-step="handleChangeStep"
			></send-step-one>
			
		</template>
		<template v-if="current == 1">
			<send-step-two
				:list="userList"
				:isSecond="isSecond"
				:maxNum="maxNum"
				@change-step="handleChangeStep"
			></send-step-two>
		</template>
		<template v-if="current == 2">
			<send-step-three
				:qData="qData"
				:maxNum="maxNum"
				@change-step="handleChangeStep"
			></send-step-three>
		</template>
		<template v-if="current == 3">
			<send-step-four
				:qid="id"
				:qData="qData"
				@change-step="handleChangeStep"
				@end-q="handleEndQ(id)"
			></send-step-four>
		</template>
		
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { mixinUpRead } from '@/utils/mixin_msg.js'
	import sendStepOne from '@/components/sendStepOne/sendStepOne.vue';
	import sendStepTwo from '@/components/sendStepTwo/sendStepTwo.vue';
	import sendStepThree from '@/components/sendStepThree/sendStepThree.vue';
	import sendStepFour from '@/components/sendStepFour/sendStepFour.vue';
	export default {
		mixins: [mixinUpRead],
		data() {
			return {
				id: '',
				current: 0,
				kw: "",
				userList: [],
				qData: {},
				formInfo: {},
				numList: [
					{
						name: '提问题'
					}, {
						name: '找专家'
					}, {
						name: '待回复'
					}, {
						name: '传稿子'
					}, 
				],
				firstUid: '',
				isSecond: false,
				maxNum: 3,
				uid: 0,
				uidInfo: '',
				noticeShow: true
			}
		}, 
		watch: {
			keywordsArr(newV) {
				this.$set(this.form, 'keyword', newV.join(','))
			},
			id(newV) {
				// console.log(newV)
				if(newV) {
					this.handleEndQ(newV)
				}
			},
			kw(newV) {
				if(newV) {
					this.searchKwUser(newV)
				}
			}
		},
		onLoad(opt) {
			// console.log(opt)
			if(opt.id) {
				this.id = opt.id
			}
			if(opt.current) {
				this.current = opt.current
			}
			if(opt.uid) {
				this.uid = opt.uid
				this.getUidInfo()
			}
			// this.handleChangeStep(1, {form: {keywords: '零售电商', isMate: true} })
			
			
		},
		computed: {
			...mapState(['infoAuthorize'])
		},
		components: {
			sendStepOne,
			sendStepTwo,
			sendStepThree,
			sendStepFour
		},
		methods: {
			lookQuestion() {
				uni.navigateTo({
					url: `/pagesPersonal/handbook/handbook`
				})
			},
			async getUidInfo() {
				let res = await this.$https.get('/Home/Jzbxcx/user_auth_detail', {params: {id: this.uid}})
				let data = res.data.list
				this.uidInfo = {
					auth_poster: data.poster,
					pic: data.pic,
					auth_name: data.name,
					type: data.type,
					auth_title: data.title,
					company: data.company,
					follow: res.data.follow,
					auth_intro: data.intro,
					checked: true
				}
			},
			handleEndQ(qid) {
				this.qData.answer = []
				this.$https.get('/Home/Jzbxcx/questions_detail?id=' + qid)
				.then(res => {
					if(!this.firstUid) {
						this.firstUid = res.data.answer.map(ele => ele.poster)
						this.isSecond = true
					}
					this.maxNum = 3 - res.data.answer_num
					let endTime = res.data.list.end_time.replace(/-/g,'/')
					let timeC = Date.parse(new Date(endTime)) - Date.parse(new Date())
					res.data.list.timeC = timeC / 1000
					this.qData = res.data
				})
			},
			async searchKwUser(newV) {
				this.userList = []
				uni.showLoading({title: '匹配中...'})
				// let [res1, res2] = await Promise.all([this.searchActivedUser(newV), this.searchAllUser(2, newV)])
				// let res = [].concat(res1, res2)
				let res = await this.searchActivedUser(newV)
				this.userList = res
				// console.log(this.userList)
				uni.hideLoading()
			},
			async searchActivedUser(kw) {
				//搜索已激活的用户
				let res = await this.$https.get('/Home/Jzbxcx/keywords_user?keywords=' + kw)
				let arr = (this.uid && this.uidInfo) ? [this.uidInfo] : [];
				// console.log(arr)
				return arr.concat(...res.data.list.filter(ele => {
					//不是记者 
					// + 已认证身份 
					// + 不是点击采访链接过来的id 去重
					// + 不是自己 
					// + 不是头一次邀请的人
					return  ele 
							&& ele.type != 0 
							&& ele.auth_status == 2 
							&& ele.auth_poster != this.uid
							&& ele.auth_poster != this.$store.state.infoAuthorize.poster 
							&& !this.firstUid.includes(ele.auth_poster)
							
				}).map(ele => {
					ele.checked = false
					return ele
				})) 
			},
			async searchAllUser(cate, keywords) {
				//从网经社对应cate分类里搜索用户
				let res = await this.$https.get('/Home/Jzbxcx/keywords_ku', {params: {cate, keywords}})
				return res.data.list.filter(ele =>{
					// 无手机将剔除
					if(ele.tel) {
						ele.auth_name = ele.name
						ele.auth_intro = ele.description
						ele.type = (cate - 1) || 4
						ele.auth_title = '该用户暂未激活'
						ele.pic = ele.pic_name1? 'https://www.100ec.cn' + ele.pic_name1 : "https://www.100ec.cn/Public/home/images/icon-rw.png"
						return ele.tel
					}
				})
			},
			async handleChangeStep(num, obj) {
				if(obj && !obj.newInvite) {
					if(num == 1) {
						// this.id = obj.form.id
						this.formInfo = obj.form
						if(this.infoAuthorize.type != 0) {
							this.submitViewpoint()
							return 
						}
						else if(!this.formInfo.isMate) {
							if(this.uid) this.formInfo.uid = this.uid 
							this.firstUid = [this.uid]
							let res = await this.submitQuestion()
							if(!res) return
							this.isSecond = true
							this.uid? num = 2 : num = 3
						}
						// else {
							this.formInfo.keywords = obj.form.keywords
							this.kw = obj.form.keywords
						// }
						
					}
					else if(num == 2) {
						this.formInfo.uid = obj.uid
						this.firstUid = obj.uid.split(',')
						let res = await this.submitQuestion()
						if(!res) return
						this.isSecond = true
					}
				}
				else if(obj && obj.newInvite) {
					if(num == 1) {
						let kw = this.qData.keywords.map(ele => ele.keywords).reduce((accumulator, currentValue) => {
							return accumulator + ',' + currentValue
						})
						this.uidInfo = ''
						this.searchKwUser(kw)
					}
					else if(num == 2) {
						obj.uid && this.newInvite(obj.uid)
					}
				}
				
				this.current = num
			},
			async submitQuestion() {
				uni.showLoading({
					title: '发布中...',
					mask: true
				})
				let res = await this.$https.post('/Home/Jzbxcx/add_questions', this.formInfo)
				uni.hideLoading()
				if(res.data.code == 1) {
					this.id = res.data.id
					uni.showToast({
						title: '发布成功！'
					})
				}else if(res.data.code == 2) {
					uni.showModal({
						title: '提示',
						content: `发布错误原因：${res.data.msg == '已到最大提问数' ? '您同时进行的采访提问已达最大数量，是否跳转至列表处理未结束的采访？': res.data.msg }，`,
						success: res => {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pagesPersonal/cf/cf'
								})
							}
						}
					})
					return false
				}
				uni.setStorageSync('indexRefresh', true)
				return true
			},
			async newInvite(uid) {
				uni.showLoading({
					title: '发布中...',
					mask: true
				})
				let res = await this.$https.get('/Home/Jzbxcx/add_questions_answer', {
					params: {
						id: this.id,
						uid
					},
				})
				uni.hideLoading()
				if(res.data.code == 1) {
					let arr = uid.split(',')
					this.firstUid = this.firstUid.concat(...arr)
					this.handleEndQ(this.id)
					uni.showToast({
						title: '发布成功！'
					})
				}
			},
			async submitViewpoint() {
				uni.showLoading({
					title: '发布中...',
					mask: true
				})
				let res = await this.$https.post('/Home/Jzbxcx/add_viewpoint', this.formInfo)
				uni.hideLoading()
				if(res.data.code == 1) {
					uni.showToast({
						title: '发布成功！'
					})
					this.handleReturnIndex()
				}
			},
			handleReturnIndex() {
				uni.setStorageSync('indexRefresh', true)
				uni.switchTab({
				    url: '/pages/index/index',
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.w {
		background-color: #fff;
	}
	.u-steps {
		padding: 40rpx 0;
		margin-bottom: 20rpx;
	}
</style>
