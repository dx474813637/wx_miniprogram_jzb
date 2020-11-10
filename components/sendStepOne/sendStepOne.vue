<template>
	<view>
		<u-form
			:model="form" 
			ref="sendForm"
			label-position="top"
			:error-type="errorType"
		>
			<view class="main w">
				<u-form-item :label="infoAuthorize.type == 0 ? '采访话题' : '发声话题'" prop="title" required >
					<u-input v-model="form.title" />
				</u-form-item>
				<u-form-item  :label="infoAuthorize.type == 0 ? '采访问题提纲' : '话题观点'" prop="intro" required>
					<u-input height="350" v-model="form.intro" type="textarea" />
				</u-form-item>
				<kw-select
					:keywordsArr="keywordsArr"
					@changeKw="handleChangeKw"
					@deleteKw="handleDeleteKw"
				></kw-select>
					
				<template v-if="infoAuthorize.type == 0">
					<u-form-item label="截稿时间" prop="end_time" required>
						<u-input 
							v-model="form.end_time" 
							type="select" 
							@click="show = true"
						/>
						<u-picker 
							v-model="show" 
							mode="time" 
							@confirm="confirm" 
							:params="timeParams"
							safe-area-inset-bottom
							title="截稿时间"
						></u-picker>
					</u-form-item>
					<view class="q-sub">
						<u-checkbox 
							v-model="form.isMate" 
							shape="circle"
						>开启智能匹配专家（平台将会根据领域关键字为你筛选专家列表）</u-checkbox>
						
					</view>
				</template>
				
			</view>
		</u-form>
		<view class="main">	
			<u-button type="primary" @click="handleFindZJ">下一步</u-button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import kwSelect from '@/components/kwSelect/kwSelect.vue'
	export default {
		data() {
			return {
				show: false,
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				errorType: ['message'],
				keywordsArr: [],
				form: {
					title: '',
					intro: '',
					isMate: true,
					keywords: '',
					time: 1,
					end_time : '',
					open: 1
				},
				rules: {
					title: [
						{
							required: true,
							max: 25,
							min: 5,
							message: '请输入5至25字的标题',
							trigger: ['blur', 'change']
						}
					],
					intro: [
						{
							required: true,
							max: 500,
							message: '请输入500字以内的采访提纲',
							trigger: ['blur', 'change']
						}
					],
					keywords: [
						{
							required: true,
							message: '请添加领域',
							trigger: ['blur', 'change']
						}
					],
				}
			};
		},
		created() {
			if(this.infoAuthorizetype == 0) {
				this.$set(this.rules, 'end_time', [
						{
							required: true,
							message: '请选择截稿时间',
							trigger: ['blur', 'change']
						}
					])
			}else {
				
			}
		},
		watch: {
			keywordsArr(newV) {
				this.$set(this.form, 'keywords', newV.join(','))
			}
		},
		computed: {
			...mapState(['infoAuthorize'])
		},
		onReady() {
			this.$refs.sendForm.setRules(this.rules);
		},
		components: {
			kwSelect
		},
		methods: {
			confirm(res) {
				this.$set(this.form, 'end_time', [res.year, res.month, res.day].join('-') + ' ' + [ res.hour, res.minute, res.second].join(':'))
				console.log(this.form.end_time)
			},
			async handleFindZJ() {
				let valid = await this.$refs.sendForm.validate();
				if (valid) {
					console.log('验证通过');
					let res = await this.submitQuestion()
					// console.log(res)
					if(res.data.code != 1) return
					//下一步
					this.$emit('change-step', 1, {id: res.data.id || 'ceshi', kw: this.form.keywords})
				} else {
					console.log('验证失败');
				}
				console.log(this.form)
			},
			async submitQuestion() {
				if(this.infoAuthorize.type == 0) {
					return await this.$https.get('/Home/Jzbxcx/add_questions', {params: this.form})
				}else {
					return await this.$https.get('/Home/Jzbxcx/add_viewpoint', {params: this.form})
				}
				
			},
			handleChangeKw(kw) {
				this.keywordsArr.push(kw)
			},
			handleDeleteKw(index) {
				this.keywordsArr.splice(index, 1)
			},
		}
	}
</script>

<style scoped lang="scss">

	.w {
		background-color: #fff;
	}
	.main {
		padding: 30rpx 40rpx;
		color: #666;
	}
	.q-sub {
		padding: 20rpx 0;
		margin-top: 50rpx;
	
	}
</style>
