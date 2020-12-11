<template>
	<view>
		<u-form-item label="领域（至多10个）" prop="keywords" required>
			<view class="kw-right">
				<u-tag class="tag-class" text="+ 新增" mode="dark" :type="keyAddTagBtn" shape="circle" @click="handleKeySelectChange" />
				<u-tag 
					v-for="(item, index) in arr"
					:key="index"
					:text="item" 
					mode="light" 
					type="primary" 
					shape="circle" 
					:closeable="true"
					class="tag-class"
					@click="handleDeleteKey(index)"
					@close="handleDeleteKey(index)"
				/>
			</view>
			
		</u-form-item>
		
		<u-select
			v-model="keySelectShow" 
			:list="keyList" 
			:safe-area-inset-bottom="true"
			@confirm="handleConfirmEvent"
			:default-value="defaultValue" 
		></u-select>
		<u-modal 
			v-model="disKeyInputShow"
			title="输入自定义领域关键字"
			show-cancel-button
			mask-close-able
			@confirm="handleKeyAddBtn"
		>
			<view class="key-inp-w">
				<u-input v-model="keyAdd" maxlength="10" border />
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		props: {
			keywordsArr: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				defaultValue: [0],
				keySelectShow: false,
				keyList: [
					{
						value: 0,
						label: '其他/自定义'
					},
					{
						value: 1,
						label: '零售电商'
					},
					{
						value: 2,
						label: '产业电商'
					},
					{
						value: 3,
						label: '跨境电商'
					},
					{
						value: 4,
						label: '生活服务电商'
					},
					{
						value: 5,
						label: '金融科技'
					},
					{
						value: 6,
						label: '物流科技'
					}
				],
				disKeyInputShow: false,
				keyAddTagBtn: 'primary',
				arr: [],
				keyAdd: '',
			};
		},
		created() {
			this.arr = this.keywordsArr
		},
		watch: {
			keywordsArr(newV) {
				// console.log(newV)
				this.arr = newV
				if(newV.length == 10) {
					this.keyAddTagBtn = 'info'
				}else {
					this.keyAddTagBtn = 'primary'
				}
			}
		},
		methods: {
			handleKeySelectChange() {
				if(this.arr.length == 10) {
					this.$refs.uToast.show({
						title: '关注领域至多选择10个',
						type: 'warning ',
						duration: 1500
					})
					return
				}
				this.keySelectShow = !this.keySelectShow
			},
			handleConfirmEvent(v) {
				let val = v[0].value
				this.defaultValue = [val]
				// console.log(val)
				if(val == 0) {
					this.disKeyInputShow = true
				}else {
					this.isLimit(v[0].label)
				}
			},
			handleKeyAddBtn() {
				if(!this.keyAdd) return
				this.isLimit(this.keyAdd)
			},
			isLimit(v) {
				if(this.arr.indexOf(v) != -1) {
					this.$refs.uToast.show({
						title: '请勿添加重复关键字',
						type: 'warning ',
						duration: 1500
					})
					return 
				}
				this.handleKeyAdd(v)
			},
			handleKeyAdd(v) {
				this.$emit('change-kw', v)
				// this.arr.push(v)
			},
			handleDeleteKey(index) {
				// console.log(index)
				this.$emit('delete-kw', index)
				// this.arr.splice(index, 1)
			}
		},
	}
</script>

<style scoped lang="scss">
	.key-inp-w {
		margin: 50rpx auto 50rpx;
		width: 90%;
	}
	.tag-class {
		margin-right: 15rpx;
	}
	.kw-right {
		min-height: 200rpx;
	}
</style>
