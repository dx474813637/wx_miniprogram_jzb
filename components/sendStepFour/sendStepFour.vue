<template>
	<view>
		<u-form
			:model="form" 
			ref="sendForm"
			label-position="top"
			:error-type="errorType"
		>
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
					<u-form-item label="原因" prop="yy" required>
						<u-input type="select" v-model="form.yy" placeholder="原因" @click="show = true" />
						<u-select v-model="show" :list="list" @confirm="handleConfirm"></u-select>
					</u-form-item>
				</template>
					
			</view>
			<view class="w">
				<view class="w-t">
					<u-icon name="file-text-fill" size="36"></u-icon>专家评价
				</view>
				<view class="w-item" v-for="(item, index) in 3" :key="index">
					<view class="info-rate">
						<text class="info">网经社</text>
						<u-rate :count="5" v-model="value" active-color="#007aff" size="40"></u-rate>
					</view>
				</view>
			</view>
			<view class="w">
				<u-button type="primary" @click="handleReturn">返回上一步</u-button>
			</view>
			<view class="w">
				<u-button type="primary" @click="endQuestion">提交表单完成采访提问</u-button>
			</view>
			
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				show: false,
				list: [
					{
						label: '1',
						value: 1
					}
				],
				errorType: ['message'],
				form: {
					url: '',
					isApply: false,
					yy: ''
				},
				apply: false
			};
		},
		watch: {
			['form.isApply'] (newV) {
				this.apply = newV
			}
		},
		methods: {
			handleConfirm(v) {
				this.form.yy = v[0].label
			},
			async endQuestion() {
				let res = await this.handleUpUrl()
				
			},
			async handleUpUrl() {
				return await this.$https.get('/Home/Jzbxcx/add_questions_url', {params: {id: null, url: this.from.url}})
			},
			handleReturn() {
				this.$emit('change-step', 2)
			}
		}
	}
</script>

<style scoped lang="scss">
	.main2 {
		margin-top: 60rpx;
	}
	.w {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}
	.w-item {
		margin-bottom: 30rpx;
	}
	.info-rate {
		display: flex;
		justify-content: space-between;
	}
	.info-rate .info {
		font-weight: bold;
	}
	.w-t {
		color: $jzb-theme-color;
		font-weight: bold;
		font-size: 32rpx;
		margin-bottom: 50rpx;
	}
	.q-sub {
		padding: 20rpx 0;
		margin-top: 50rpx;
	
	}
</style>
