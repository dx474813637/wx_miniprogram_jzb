<template>
	<view>
		<!-- <view class="send-info">
			<u-icon name="checkmark-circle-fill" color="#007aff"></u-icon>
			<text>成功发送</text>
		</view> -->
		<view class="list-w">
			<view class="list-item" v-for="(item, index) in userList" :key="index">
				<view class="header">
					<view class="header-item">
						<u-checkbox 
							:value="item.checked" 
							:name="index"
							@change="checkboxChange"
						></u-checkbox>
					</view>
					<view class="header-item info">
						<q-a-user-profile
							:userid="item.auth_poster"
							:avatar="item.pic"
							:name="item.auth_name"
							:label="item.type"
							:sub="item.auth_title || item.company"
							:isFollow="item.follow"
						></q-a-user-profile>
					</view>
				</view>
				<view class="content">
					{{item.auth_intro}}
				</view>
			</view>
		</view>
		
		<view class="main">	
			<u-button type="primary" @click="handleFindZJ">提交</u-button>
		</view>	
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			isSecond: {
				type: Boolean,
				default: false
			},
			maxNum: {
				type: Number | String,
				default: 3
			}
		},
		data() {
			return {
				userList: [],
				uid: '',
			};
		},
		computed: {
			...mapState(['infoAuthorize']),
			checkedNum() {
				return this.userList.filter(ele => ele.checked).length
			}
		},
		created() {
			this.userList = this.list
		},
		components: {
			QAUserProfile
		},
		watch: {
			list(newV) {
				this.userList = newV
			}
		},
		methods: {
			setUid() {
				let arr = []
				this.userList.forEach(ele => {
					if(ele.checked) {
						arr.push(ele.auth_poster)
					}
				})
				this.uid = arr.join(',')
				// console.log(this.uid)
			},
			handleFindZJ() {
				this.setUid()
				this.$emit('change-step', 2, {uid: this.uid, newInvite: this.isSecond})
			},
			handleReturnIndex() {
				uni.setStorageSync('indexRefresh', true)
				uni.switchTab({
				    url: '/pages/index/index',
				});
			},
			checkboxChange(e) {
				if(this.checkedNum == this.maxNum && !e.value) {
					uni.showToast({
						title: `最多选择${this.maxNum}位用户`,
						duration: 1000,
						icon: 'none'
					})
					return
				}
				this.$set(this.userList[e.name], 'checked', !this.userList[e.name].checked)
				
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.send-info text {
		margin-left: 10rpx;
	}
	.send-info {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 150rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		font-size: 36rpx;
		color: $jzb-theme-color;
	}
	.header {
		display: flex;
		align-items: center;
	}
	.list-w {
		background-color: #fff;
		margin-bottom: 160rpx;
	}
	.list-item {
		padding: 30rpx;
	}
	.header-item.info {
		flex: 1
	}
	.content {
		padding-left: 50rpx;
		margin: 10rpx auto 20rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		color: #666;
	}
	.label {
		display: flex;
		padding-left: 50rpx;
		flex-wrap: wrap;
	}
	.label-item {
		background-color: #f8f8f8;
		color: #666;
		border: 1rpx solid #ddd;
		border-radius: 30rpx;
		display: inline-block;
		padding: 6rpx 18rpx;
		margin-right: 10rpx;
		margin-bottom: 20rpx;
		
	}
	.list-item {
		border-bottom: 1rpx solid #f8f8f8;
	}
	.main {
		padding: 20rpx 40rpx;
		color: #666;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		z-index: 200;
	}
</style>
