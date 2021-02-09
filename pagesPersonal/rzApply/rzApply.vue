<template>
	<view class="form-w">
		<u-form 
			:model="form" 
			ref="uForm"
			label-position="top"
			:error-type="errorType"
		>	
			<view class="form-item">
				<view class="form-item-title">
					<u-icon name="file-text-fill" size="50" color="#007aff"></u-icon>
					<text class="title">基本资料</text>
					<text class="title-sub">对外展示，请认真填写</text>
				</view>
				<view class="form-item-content">
					<u-form-item label="商务/职业照" prop="pic" required >
						<u-upload 
							max-count="1"
							:custom-btn	="true"
							:action="imgUploadAction"
							:header="httpHeader"
							@on-change="avatarImgUpChange"
							:file-list="avatarFileList"
						>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" color="#c0c4cc"></u-icon>
							</view>
						</u-upload>
					</u-form-item>
					<u-form-item label="真实姓名" prop="name" required >
						<u-input v-model="form.name" />
					</u-form-item>
					<template v-if="form.type == '0'">
						<u-form-item label="单位名称" prop="company" required >
							<u-input v-model="form.company" placeholder="请输入真实姓名" />
						</u-form-item>
					</template>
					<template v-if="form.type != '0'">
						<u-form-item label="展示头衔" prop="title" required >
							<u-input v-model="form.title" placeholder="请输入展示头衔" />
						</u-form-item>
					</template>
					
					<u-form-item label="邮箱" prop="email" required >
						<u-input v-model="form.email" placeholder="为防止系统屏蔽,请避免使用163、QQ邮箱" />
					</u-form-item>	
					
					<u-form-item label="个人简介" prop="intro" required>
						<u-input class="intro-box" type="textarea" v-model="form.intro" maxlength="400" />
					</u-form-item>		
					<kw-select
						:keywordsArr="keywordsArr"
						@changeKw="handleChangeKw"
						@deleteKw="handleDeleteKw"
					></kw-select>	
				</view>

			</view>
			
			<view class="form-item">
				<view class="form-item-title">
					<u-icon name="file-text-fill" size="50" color="#007aff"></u-icon>
					<text class="title">认证信息</text>
					<text class="title-sub">仅用于认证审核，不对外直接公开</text>
				</view>
				
				<view class="form-item-content">
					
					<u-form-item label="职位" prop="position" required >
						<u-input v-model="form.position" placeholder="请输入职位" />
					</u-form-item>
					
					<template v-if="form.type != '0'">
						<u-form-item label="单位名称" prop="company_auth" required >
							<u-input v-model="form.company_auth" placeholder="请输入单位名称" />
						</u-form-item>
					</template>
					<u-form-item label="上传材料（名片、工牌、职业资质或在职证明）" prop="license" required >
						<u-upload 
							max-count="3"
							:custom-btn	="true"
							style="width: 100%;"
							:action="imgUploadAction"
							:header="httpHeader"
							@on-change="licenseImgUpChange"
							@on-remove="licenseImgRemoveChange"
							:file-list="licenseFileList"
						>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="photo-fill" size="60" color="#c0c4cc"></u-icon>
							</view>
						</u-upload>
					</u-form-item>
					<view class="xy">
						<u-checkbox v-model="checked" shape="circle">勾选代表同意</u-checkbox>
						<navigator url="/pagesPersonal/userAgree/userAgree" class="xy-btn" >媒公宝《用户协议》</navigator><text>和</text>
						<navigator url="/pagesPersonal/userHide/userHide" class="xy-btn">《隐私政策》</navigator>
					</view>
				</view>
				<view class="submit-btn">
					<u-button @click="submit" type="primary" :disabled="!checked">提交</u-button>
				</view>
				
			</view>
			
			
		</u-form>
		
		<u-modal v-model="xyFlag" title="JZB《用户协议》" width="90%" mask-close-able	>
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import kwSelect from '@/components/kwSelect/kwSelect.vue'
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				imgUploadAction: 'https://www.100ec.cn/Home/Jzbxcx/img_url',
				httpHeader: this.$store.state.httpHeader,
				errorType: ['message'],
				xyFlag: false,
				content: `空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>`,
				checked: false,
				avatarFileList: [],
				keywordsArr: [],
				licenseArr: [],
				licenseFileList: [],
				form: {
					type: null,
					pic: '',
					name: '',
					company: '',
					company_auth: '',
					title: '',
					intro: '',
					field: '',
					position: '',
					license: '',
					email: ''
				},
				rules: {
					pic:[
						{ 
							required: true, 
							trigger: ['change'],
							message: '请上传商务/职业照', 
						}
					],
					name: [
						{ 
							required: true,
							trigger: ['change'],
							message: '请输入姓名', 
						}
					],
					company: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入单位'
						}
					],
					company_auth: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入单位'
						}
					],
					field: [
						{
							required: true, 
							trigger: ['change'],
							message: '添加关注领域'
						}
					],
					position: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入职位'
						}
					],
					title: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入展示头衔'
						}
					],
					license: [
						{
							required: true, 
							trigger: ['change'],
							message: '上传材料'
							
						}
					],
					email: [
						{
							required: true, 
							trigger: ['change'],
							pattern: /^[\w\.\-]+@[\w\-]+\.([\w\-]+\.){0,1}[a-z]{2,4}$/,
							message: '输入正确的邮箱地址'
						}
					],
					intro: [
						{
							required: true, 
							min: 5, 
							trigger: ['change'],
							message: '简介不能少于5个字'
						}
					]
				}
			}
		},
		onLoad(opt) {
			if(this.infoAuthorize.auth_date) {
				Object.assign(this.form, this.infoAuthorize);
				this.keywordsArr = this.infoAuthorize.field.split(',')
				this.licenseArr = this.infoAuthorize.license.split(',')
				this.avatarFileList = [{url:  this.infoAuthorize.pic}]
				this.licenseFileList = this.licenseArr.map(ele => ({url: ele}))
			}
			if(this.infoAuthorize.auth_status != 2) this.$set(this.form, 'type', opt.type)
			
			if(this.form.type == 0) {
				this.rules.company_auth = ''
				this.rules.title = ''
			}else {
				this.rules.company = ''
			}
		},
		watch: {
			keywordsArr(newV) {
				this.$set(this.form, 'field', newV.join(','))
			}
		},
		components: {
			kwSelect
		},
		computed: {
			...mapState(['infoAuthorize']),
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.handleUpAuthor()
					} else {
						console.log('验证失败');
					}
					console.log(this.form)
				});
			},
			async handleUpAuthor() {
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				let res = await this.$https.post('/Home/Jzbxcx/update_user_auth', this.form)
				if(res.data.code == 1) {
					await this.$getuserauthinfo()
					uni.hideLoading()
					let confirm = await uni.showModal({
						title: '提示',
						content: '提交成功，等待审核！',
						showCancel: false,
					})
					if(confirm) {
						
						uni.switchTab({
							url: '/pages/personal/personal'
						})
					}
				}
			},
			handleXyFlag() {
				this.xyFlag = !this.xyFlag
			},
			handleChangeKw(kw) {
				this.keywordsArr.push(kw)
			},
			handleDeleteKw(index) {
				this.keywordsArr.splice(index, 1)
			},
			avatarImgUpChange(res) {
				// console.log(res)
				this.$set(this.form, 'pic', JSON.parse(res.data).url)
				// this.form.pic = JSON.parse(res.data).url
				// console.log(this.form)
			},
			licenseImgUpChange(res, index, lists) {
				this.$set(this.licenseArr, index, lists[index].response.url)
				this.$set(this.form, 'license', this.licenseArr.join(','))
				// console.log(this.form)
			},
			licenseImgRemoveChange(index, lists) {
				this.licenseArr.splice(index, 1)
				this.$set(this.form, 'license', this.licenseArr.join(','))
				// console.log(this.form)
			}
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	.key-inp-w {
		margin: 50rpx auto 50rpx;
		width: 90%;
	}
	.xy {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 30rpx;
	}
	.xy-btn {
		color: $jzb-theme-color;
	}
	.form-w {
	}
	.tag-class {
		margin-right: 15rpx;
	}
	.form-item {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 30rpx;
	}
	.form-item-title {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #f8f8f8;
		height: 80rpx;
	}
	.slot-btn {
		margin: 10rpx;
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}
	.slot-btn2 {
		width: 600rpx;
		height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	.title {
		flex: 1;
		font-size: 35rpx;
		font-weight: bold;
		color: #333;
		margin-left: 10rpx;
	}
	.title-sub {
		color: #999;
	}
	.form-item-content {
		padding: 5rpx 20rpx 20rpx;
	}
	.phone-prove {
		display: flex;
		align-items: center;
	}
	.phone-prove-inp {
		flex: 1;
		padding-right: 20rpx;
	}
	.submit-btn {
		padding: 80rpx 0;
	}
	.intro-box {
		background-color: #f8f8f8;
	}
</style>
