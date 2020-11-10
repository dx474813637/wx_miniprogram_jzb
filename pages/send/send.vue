<template>
	<view>
		<view class="u-steps w" v-if="infoAuthorize.type == 0">
			<u-steps 
				mode="number" 
				:list="numList" 
				:current="current"
			></u-steps>
			
		</view>
		<template v-if="current == 0">
			<send-step-one
				@change-step="handleChangeStep"
			></send-step-one>
			
		</template>
		<template v-if="current == 1">
			<send-step-two
				
				@change-step="handleChangeStep"
			></send-step-two>
		</template>
		<!-- :list="kwSearchList" -->
		<template v-if="current == 2">
			<send-step-three
				@change-step="handleChangeStep"
			></send-step-three>
		</template>
		<template v-if="current == 3">
			<send-step-four
				@change-step="handleChangeStep"
			></send-step-four>
		</template>
		
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import sendStepOne from '@/components/sendStepOne/sendStepOne.vue';
	import sendStepTwo from '@/components/sendStepTwo/sendStepTwo.vue';
	import sendStepThree from '@/components/sendStepThree/sendStepThree.vue';
	import sendStepFour from '@/components/sendStepFour/sendStepFour.vue';
	export default {
		data() {
			return {
				id: '',
				current: 0,
				kw: "",
				kwSearchList: [],
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
			}
		}, 
		watch: {
			keywordsArr(newV) {
				this.form.keyword = newV.join(',')
			},
			id(newV) {
				console.log(newV)
				if(newV) {
					this.$https.get('/Home/Jzbxcx/questions_detail?id=' + this.id)
					.then(res => {
						console.log(res)
					})
				}
			},
			kw(newV) {
				if(newV) {
					this.$https.get('/Home/Jzbxcx/keywords_user?id=' + this.id)
					.then(res => {
						console.log(res)
					})
				}
			}
		},
		onLoad(opt) {
			console.log(opt)
			if(opt.id) {
				this.id = opt.id
			}
			if(opt.current) {
				this.current = opt.current
			}
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
			handleChangeStep(num, obj) {
				
				this.current = num
				if(num == 1) {
					this.id = obj.id
					this.kw = obj.kw
				}
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
