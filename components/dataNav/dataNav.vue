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
					<view class="popup-input" @click="showPicker(item.name, index)">{{curValue[index][item.name] || '全部'}}</view>
				</view>
			</view>
		</u-popup>
		<u-picker 
			v-model="pickerShow" 
			:mode="mode" 
			:params="mode == 'region' ? areaParams : timeParams"
			@confirm="pickerConfirm"
			safe-area-inset-bottom
		></u-picker>
		<u-select 
			ref="select"
			v-model="selectShow" 
			safe-area-inset-bottom
			:mode="mode" 
			:list="selectList" 
			@confirm="selectConfirm"
			:default-value="defaultVal"
		></u-select>
	</view>
</template>

<script>
	import obj from '@/static/js/data.js';
	import {cityData, cityData2} from '@/static/js/city.data.js'
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
				defaultVal: [0],
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
				if(ele.children && ele.children.length != 1 && ele.children[0].label != '全部') {
					ele.children.unshift({value: '', label: '全部'})
				}
			})
		},
		watch: {
			params(newV) {
				this.params2 = newV
			},
			navList(newV) {
				// console.log(newV)
				this.curValue = newV.map(ele => ({[ele.name]: ele.value}))
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
			let nav = obj[this.value].sjkInfo.nav
			// console.log(nav)
			if(this.value == 'trz') {
				let time = this.nowDate.split('-').join('') + '01'
				this.$emit('change-paramas', {
					qujian: 1,
					ym1: time,
					ym2: time
				}, [{cate: ''}, {round: ''}, {area: ''}, {time: this.nowDate}])				
			}else if(this.value == 'djs') {
				this.$emit('change-paramas', {
					cate: this.navList[1].value,
					time: new Date().getFullYear(),
					chen: '独角兽'
				}, [{chen: '独角兽'}, {cate: ''}, {time: new Date().getFullYear() + '年'}])				
			}else if(this.value == 'bq') {
				this.$emit('change-paramas', {
					cate: 'all',
					dtime: '2019',
					a101: '零售电商'
				}, [{a104: ''}, {a101: '零售电商'}, {a103: ''}])				
			}else if(this.value == 'sw') {
				this.$emit('change-paramas', {
					cate: 'all',
					shares: '零售电商',
				}, [{shares: '零售电商'}, {area: ''}, {dtime: ''}])				
			}else if(this.value == 'cyy') {
				this.$emit('change-paramas', {
					a102: '中国',
					cate: '北京',
					cyyArea: '北京'
				}, [{cyyArea: '北京'}])				
			}else if(this.value == 'qq') {
				this.$emit('change-paramas', {
					cate: '中国',
				}, [{cate: '中国'}])				
			}else if(this.value == 'hy') {
				this.$emit('change-paramas', {
					cate: '电商整体',
					name: '电子商务'
				}, [{hycate: '电商整体-电子商务'}])				
			}else if(this.value == 'cb') {
				this.$emit('change-paramas', {
					cate: '零售电商',
					name: '阿里巴巴'
				}, [{cbcpy: '零售电商-阿里巴巴'}])				
			}else if(this.value == 'zsq') {
				this.$emit('change-paramas', {
					name: '北京',
				}, [{name: '北京'}])				
			}else if(this.value == 'xsb') {
				this.$emit('change-paramas', {
					cate: '零售电商',
					name: '壹玖壹玖'
				}, [{xsbcpy: '零售电商-壹玖壹玖'}])				
			}else if(this.value == 'pj') {
				this.$emit('change-paramas', {
					type: 'all',
					year: new Date().getFullYear()
				}, [{pjtype: ''}, {year: new Date().getFullYear()}, {time: '至今'}])				
			}

		},
		methods: {
			showPopup() {
				this.show = true
			},
			closePopup() {
				this.$emit('change-paramas', this.params2, this.curValue)	
				
			},
			showPicker(name, index) {
				this.curNavName = name
				this.curNavIndex = index
				let selector = this.navList[index].selector
				//选择器 list数据配置
				if(this.value == 'trz') {
					if(name == 'area') this.selectList = cityData2
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
					else if(name == 'a103') this.selectList = obj[this.value].hotCities
				}
				else if(this.value == 'sw') {
					if(name == 'shares') this.selectList = obj[this.value].dataField
					else if(name == 'area') this.selectList = cityData2
					else if(name == 'dtime') this.selectList = obj[this.value].time
				}
				else if(this.value == 'cyy') {
					if(name == 'cyyArea') this.selectList = cityData2
				}
				else if(this.value == 'qq') {
					if(name == 'cate') this.selectList = obj[this.value].mainTar
				}
				else if(this.value == 'hy') {
					if(name == 'hycate') this.selectList = obj[this.value].dataField
				}
				else if(this.value == 'cb') {
					if(name == 'cbcpy') this.selectList = obj[this.value].dataCpy
				}
				else if(this.value == 'zsq') {
					if(name == 'name') this.selectList = obj[this.value].mainTar
				}
				else if(this.value == 'xsb') {
					if(name == 'xsbcpy') this.selectList = obj[this.value].dataCpy
				}
				else if(this.value == 'pj') {
					if(name == 'pjtype') this.selectList = obj[this.value].dataField
					if(name == 'year'){ 
						let yearArr = []
						for(let i = 2018; i < (new Date().getFullYear() + 1); i++) {
							yearArr.unshift({label: i+'年', value: i, extra: i-2018})
						}
						this.selectList = yearArr
					}
					if(name == 'time') {
						this.selectList = this.getTimeArr(obj[this.value].dataTime, this.curValue[1]['year'])
					}
				}
				
				//选择器 mode配置
				this.mode = selector[1]
				
				//选择器 显示
				if(selector[0] == 'select')  this.selectShow = true
				else if(selector[0] == 'picker') this.pickerShow = true
				
			},
			selectConfirm(res) {
				let resStr, resV
				this.defaultVal = [res[0].extra || 0]
				if(res[1]) this.defaultVal.push(res[1].extra || 0)
				if(res[0].value == '全部') {
					resStr = ''
					resV = ''
				}else {
					if(this.mode == 'mutil-column-auto' ) {
						resStr = res[0].label +'-'+ res[1].label
						resV = res[0].value +'-'+ res[1].value
						// this.defaultVal.push(res[1].extra)
					}
					if(this.mode == 'single-column' ) {
						resStr = res[0].label
						resV = res[0].value
					}
				}
				if(this.curNavName == 'cate') this.params2.sub = ''
				// console.log(this.curValue)
				// this.curValue.splice(this.curNavIndex, 1, resStr)
				this.$set(this.curValue[this.curNavIndex], this.curNavName, resStr)
				this.params2[this.curNavName] = resV
				if(this.curNavName == 'cyyArea') {
					this.params2['cate'] = res[0].value
					this.params2['a100'] = res[1].value == '全部'? '' : res[1].value
				}
				if(this.curNavName == 'hycate' || this.curNavName == 'cbcpy' || this.curNavName == 'xsbcpy') {
					this.params2['cate'] = res[0].value
					this.params2['name'] = res[1].value
				}
				if(this.curNavName == 'pjtype') {
					this.params2['type'] = res[1].value
				}
				if(this.curNavName == 'year' && this.value == 'pj') {
					// console.log(this.params2['time'])
					if(!this.params2['time'] || this.params2['time'] == 'whole_year') {
						this.$set(this.curValue[2], 'time', resV == (new Date().getFullYear()) ? '至今' : '全年')
						this.params2['time'] = resV == (new Date().getFullYear()) ? '' : 'whole_year'
					}
					
				}
			},
			pickerConfirm(res) {
				if(this.mode == 'time' ) {
					let time = res.year + res.month + '01'
					this.params2.qujian = 1
					this.params2.ym1 = time
					this.params2.ym2 = time
					this.$set(this.curValue[this.curNavIndex], this.curNavName, res.year + '-' + res.month)
					// this.curValue[this.curNavIndex] = res.year + '-' + res.month
					
				}
				
			},
			getTimeArr(timeArr, year) {
				let arr = []
				let date = new Date()
				let nowYear = date.getFullYear()
				if(year == nowYear) {
					let nowMonth = date.getMonth() + 1
					let nowDay = date.getDate()
					arr.push({label: '至今', value: ''})
					
					for(let i = 1; i < nowMonth + 1; i++) {
						if(i == 4) {
							arr.push({ label: '第一季度', value: 'first_quarter'})
						}else if(i == 7) {
							arr.push({ label: '第二季度', value: 'second_quarter'})
							arr.push({ label: '上半年', value: 'first_half'})
							if(nowDay >= 24) {
								arr.push({ label: '618', value: '_618'})
							}
						}else if(i == 10) {
							arr.push({ label: '第三季度', value: 'third_quarter'})
						}else if(i == 11 && nowDay > 15) {
							arr.push({ label: '双11', value: 'single_day'})
						}
						arr.push({label: i + '月', value: i + '_month'})
					}
					arr = arr.map((ele, index) => {
						ele.extra = index
						return ele
					})
				}else {
					arr = timeArr
				}
				
				return arr
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
		flex: 1 1 25%;
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