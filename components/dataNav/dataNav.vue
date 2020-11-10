<template>
	<view class="w">
		<u-sticky>
			<!-- <template v-if="value == 'trz' || value == 'djs'"> -->
				<view class="nav" @click="showPopup">
					<view class="nav-item"
						v-for="(item, index) in navList"
						:key="index"
					>
						<u-icon :name="item.icon" color="#007aff"></u-icon>
						<text>{{item.value || item.label}}</text>
					</view>
				</view>
			<!-- </template> -->
			
		</u-sticky>
		<u-popup 
			v-model="show"
			mode="bottom"
			safe-area-inset-bottom
			@close="closePopup"
		>
			<view class="popup-w">
				<view class="popup-item"
					v-for="(item, index) in navList"
					:key="index"
				>
					<view class="title">
						<u-icon :name="item.icon" color="#007aff"></u-icon>
						<text>选择{{item.label}}</text>
					</view>
					<view class="popup-input" @click="showPicker(item.name, index)">{{curValue[index] || '全部'}}</view>
				</view>
			</view>
		</u-popup>
		<u-picker 
			v-model="pickerShow" 
			:mode="mode" 
			:params="mode == 'region' ? areaParams : timeParams"
			@confirm="pickerConfirm"
		></u-picker>
		<u-select 
			v-model="selectShow" 
			:mode="mode" 
			:list="selectList" 
			@confirm="selectConfirm"
		></u-select>
	</view>
</template>

<script>
	import obj from '@/static/js/data.js';
	import {cityData} from '@/static/js/city.data.js'
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			navList: {
				type: Array,
				default: () => {
					return []
				}
			},
			params: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				show: false,
				selectShow: false,
				selectMode: ['single-column', 'mutil-column', 'mutil-column-auto'],
				pickerShow: false,
				pickerMode: ['time', 'region'],
				mode: '',
				timeParams: {
					year: true,
					month: true
				},
				areaParams: {
					province: true,
					city: true,
				},
				params2: {},
				selectList: [],
				curValue: [],
				curNavName: '',
				curNavIndex: '',
			}
		},
		created() {
			cityData.forEach(ele => {
				if(ele.children && ele.children.length != 1) {
					ele.children.unshift({value: '0', label: '全部'})
				}
			})
		},
		watch: {
			params(newV) {
				this.params2 = newV
			},
			navList(newV) {
				this.curValue = newV.map(ele => ele.value)
			}
		},
		computed: {
			nowDate() {
				let year = new Date().getFullYear()
				let month = new Date().getMonth() + 1
				return year + '-' + (month < 10 ? + '0' + month : month)
			}
		},
		mounted() {
			if(this.value == 'trz') {
				let time = this.nowDate.split('-').join('') + '01'
				obj[this.value].sjkInfo.nav[3].value = this.nowDate
				this.$emit('change-paramas', {
					qujian: 1,
					ym1: time,
					ym2: time
				})				
			}
			if(this.value == 'djs') {
				this.$emit('change-paramas', {
					cate: this.navList[1].value,
					time: new Date().getFullYear(),
					chen: '独角兽'
				})				
			}
			if(this.value == 'bq') {
				this.$emit('change-paramas', {
					cate: 'all',
					dtime: '2019'
				})				
			}

		},
		methods: {
			showPopup() {
				this.show = true
			},
			closePopup() {
				// console.log(this.params2)
				this.$emit('change-paramas', this.params2)	
				
			},
			showPicker(name, index) {
				this.curNavName = name
				this.curNavIndex = index
				let selector = this.navList[index].selector
				//选择器 list数据配置
				if(this.value == 'trz') {
					if(name == 'area') this.selectList = cityData
					else if(name == 'round') this.selectList = obj[this.value].dataRound
					else if(name == 'cate') this.selectList = obj[this.value].dataField
				}
				else if(this.value == 'djs') {
					if(name == 'cate') this.selectList = obj[this.value].dataField
					else if(name == 'chen') this.selectList = obj[this.value].dataType
					else if(name == 'time') this.selectList = [{label: '2020'}, {label: '2019'}]
				}
				else if(this.value == 'bq') {
					if(name == 'a104') this.selectList = obj[this.value].dataType
					else if(name == 'a101') this.selectList = obj[this.value].dataField
					else if(name == 'hotCity') this.selectList = obj[this.value].hotCities
				}
				
				//选择器 mode配置
				this.mode = selector[1]
				
				//选择器 显示
				if(selector[0] == 'select')  this.selectShow = true
				else if(selector[0] == 'picker') this.pickerShow = true
			},
			selectConfirm(res) {
				let resStr
				if(res[0].label == '全部') {
					resStr = ''
				}else {
					if(this.mode == 'mutil-column-auto' ) {
					resStr = res[0].label +'-'+ res[1].label
					}
					if(this.mode == 'single-column' ) {
						resStr = res[0].label
					}
				}
				this.curValue.splice(this.curNavIndex, 1, resStr)
				this.params2[this.curNavName] = resStr
				// if(this.curNavName == 'cate') {
				// 	this.params2[this.curNavName] = resStr
				// }
			},
			pickerConfirm(res) {
				if(this.mode == 'time' ) {
					let time = res.year + res.month + '01'
					this.params2.qujian = 1
					this.params2.ym1 = time
					this.params2.ym2 = time
					this.curValue[this.curNavIndex] = res.year + '-' + res.month
					
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup-w {
		padding: 30rpx 0;
	}
	.nav {
		display: flex;
		justify-content: space-between;
		height: 70rpx;
		align-items: center;
		background-color: #fff;
		padding: 0 10rpx;
	}
	.nav-item {
		flex: 0 0 25%;
		display: flex;
		justify-content: center;
		overflow: hidden;
	}
	.nav-item text {
		margin-left: 6rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #666;
	}
	.popup-input {
		min-height: 60rpx;
		line-height: 60rpx;
		background-color: #f8f8f8;
		border-radius: 10rpx;
		padding: 0 10rpx;
	}
	.popup-item {
		padding: 20rpx;
	}
	.title {
		line-height: 50rpx;
		font-weight: bold;
		color: #666;
		font-size: 30rpx;
		margin-bottom: 15rpx;
	}
	.title text {
		margin-left: 5rpx;
	}
</style>