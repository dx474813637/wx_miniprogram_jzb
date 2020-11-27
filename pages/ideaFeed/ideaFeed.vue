<template>
	<view class="list">
		<u-form 
			:model="form" 
			ref="uForm"
			label-position="top"
		>
			<u-form-item label="举报理由" prop="title" required>
				<u-input v-model="form.title" type="select" @click="handleActionSheetShow" />
				<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item>
			<u-form-item label="详细说明（选填）" prop="info" >
				<u-input v-model="form.info" type="textarea" maxlength="-1" />
			</u-form-item>
		</u-form>
		<u-button @click="submit" type="primary">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cate: '',
				tid: '',
				show: false,
				actionSheetList: [
					{
						text: '垃圾广告信息'
					},
					{
						text: '不实信息'
					},
					{
						text: '辱骂、人身攻击等不友善行为'
					},
					{
						text: '有害信息'
					},
					{
						text: '涉嫌侵权'
					},
					{
						text: '其他（请务必填写至详细说明）'
					},
				],
				form: {
					title: '',
					info: ''
				},
				rules: {
					title: [
						{
							required: true,
							message: '此为必填字段',
							trigger: ['blur', 'change'],
						}
					],
					info: [
						{
							max: 200,
							message: '200字内',
							trigger: ['blur', 'change'],
						}
					]
				}
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.cate = opt.cate
			this.tid = opt.tid
			this.uid = opt.uid
			this.reportInfo = opt.reportInfo
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			handleActionSheetShow() {
				this.show = !this.show
			},
			actionSheetCallback(index) {
				this.form.title = this.actionSheetList[index].text
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.handleAddTipOff()
					} else {
						console.log('验证失败');
					}
				});
			},
			async handleAddTipOff() {
				let t1 = this.uid ? `【评论用户：${this.uid}】`: '【主题】'
				let t2 = this.uid ? `【${this.reportInfo}...】` : ''
				let t3 = `【${this.form.title}】`
				let i = `【详细说明：${this.form.info}】`
				let res = await this.$https.get('/Home/Jzbxcx/add_tip_off', {
					params: {
						id: this.tid,
						cate: this.cate,
						info: t1 + t2 + t3 + i						
					}

				})
				if(res.data.code == 1) {
					uni.showToast({
						title: '提交成功',
						icon: 'none',
						duration: 1500
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
					
				}else {					
					uni.showToast({
						title: '提交失败',
						icon: 'none',
						duration: 1500
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		background-color: #fff;
		padding: 0 30rpx 80rpx;
	}
</style>
