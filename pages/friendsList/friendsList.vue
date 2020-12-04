<template>
	<view class="w">
		<view class="w-name">
			<view class="name-item">
				<u-icon name="file-text-fill" color="#007aff" size="36"></u-icon>
				<text class="name-title">名片列表</text>
			</view>
			<view class="name-item">
				<navigator url="/pages/messageList/messageList">
					<u-icon name="bell" color="#007aff" size="36"></u-icon>
				</navigator>
			</view>
		</view>
		
		<view class="f-list">
			<template v-if="list && list.length != 0">
				<u-cell-group>
					<u-cell-item 
						v-for="(item, index) in list"
						:key="index"
						:label="item.auth_title || item.company" 
						:arrow="false"
						@click="handlePopupShow(index)"
					>
						<view class="cell-title" slot="title">
							<text class="name">{{item.name}}</text>
							<text class="label rz" >{{item.type | typeToLabel}}</text>
						</view>
						<image 
							class="cell-avator"
							slot="icon" 
							:src="item.pic" 
						/>
					</u-cell-item>
				</u-cell-group>	
			</template>
			<template v-else>
				<u-empty 
					text="列表为空" 
					mode="list"
					margin-top="160"
				></u-empty>
			</template>
			
		</view>
		<u-popup 
			v-model="show"
			mode="center"
			border-radius="20"
			width="80%"
			height="640"
		>
			<view class="card-title">
				<u-icon name="file-text-fill" size="35" color="#007aff"></u-icon>
				<text class="card-title-name">名片信息</text>
			</view>
			<view class="card-content">
				<view class="user-info">
					<q-a-user-profile
						:name="cardInfo.name"
						:avatar="cardInfo.pic"
						:userid="cardInfo.friends"
						:label="cardInfo.type"
						:sub="cardInfo.auth_title || cardInfo.company"
						:follow-btn="false"
					></q-a-user-profile>
				</view>
				<view class="user-concat">
					<u-cell-group>
						<u-cell-item
							title="手机"
							:value="cardInfo.phone"
							:arrow="false"
							:title-style="titleStyle"
							@click="setClipboardData(cardInfo.phone)"
						>
							<u-icon slot="icon" size="32" name="phone-fill" color="#999"></u-icon>
						</u-cell-item>
						<u-cell-item
							title="邮箱"
							:value="cardInfo.email"
							:arrow="false"
							:title-style="titleStyle"
							@click="setClipboardData(cardInfo.email)"
						>
							<u-icon slot="icon" size="32" name="email-fill" color="#999"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
				
				<view class="card-footer">
					<view class="card-f-item">
						<u-button type="primary" plain size="medium" @click="handleLookHomePageBtn">查看主页</u-button>
					</view>
					<view class="card-f-item">
						<u-button type="error" size="medium" @click="deletedFriendBtn">删除名片</u-button>
					</view>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		data() {
			return {
				list: [],
				handleIndex: 0,
				show: false,
				titleStyle: {
					marginLeft: '10rpx'
				}
			}
		},
		components: {
			QAUserProfile
		},
		computed: {
			cardInfo() {
				return this.list[this.handleIndex]
			}
		},
		async onLoad() {
			this.renderList()
		},
		methods: {
			async renderList() {
				uni.showLoading({
					title: '加载中...'
				})
				let res = await this.getData()
				let list = res.data.list
				let indexArr = []
				for(let i = 0; i < list.length; i++) {
					if(indexArr.includes(list[i].friends)) {
						list.splice(i, 1)
						i--
					}else {
						indexArr.push(list[i].friends)
					}
					
				}
				// res.data.list.forEach((ele, index) => {
				// 	if(indexArr.includes(ele.friends)) {
						
				// 	}
				// 	indexArr.push(ele.friends)
				// })
				this.list = list
				uni.hideLoading()
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/friends_list')
			},
			handlePopupShow(index) {
				this.show = true
				this.handleIndex = index
			},
			handleLookHomePageBtn() {
				uni.navigateTo({
					url: `/pages/homePage/homePage?id=${this.list[this.handleIndex].friends}`
				})
			},
			async deletedFriendBtn() {
				let modalRes = await new Promise((resolve, rej) => {
					uni.showModal({
						title: '提示',
						content: '是否要删除名片信息？确定删除后，你将无法查看对方联系方式。',
						success: res => {
							res.confirm && resolve(res.confirm)
						}
					})
				})
				if(modalRes) {
					let res = await this.handleDeletedFriend()
					if(res.data.code == 1) {
						this.show = false
						uni.showToast({
							title: '删除成功',
							success: () => {
								this.renderList()
								
							}
						})
					}
				}
				
			},
			async handleDeletedFriend() {
				return await this.$https.get('/Home/Jzbxcx/friends_delete', {
					params: {
						id: this.list[this.handleIndex].friends
					}
				})
			},
			setClipboardData(data) {
				uni.setClipboardData({
				    data: data,
				    success: () => {
						uni.showToast({
							title: '复制成功'
						})
				    }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.card-footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 20rpx;
	}
	.card-content {
		// padding: 20rpx;
	}
	.user-info {
		padding: 40rpx 20rpx;
	}
	.user-concat {
		margin-bottom: 50rpx;
	}
	.card-title {
		color: $jzb-theme-color;
		border-bottom: 1rpx solid #f8f8f8;
		font-size: 30rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		padding: 0px 20rpx;
		// justify-content: center;
	}
	.card-title-name {
		margin-left: 5rpx;
	}

	.w {
		// background-color: #fff;
		
	}
	.w-name {
		font-size: 30rpx;
		font-weight: bold;
		padding: 20rpx;
		// border-bottom: 1rpx solid #f8f8f8;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
	}
	.w-name .name-title {
		margin-left: 10rpx;
		color: #333;
	}
	.cell-avator {
		width: 90rpx;
		height: 90rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.name {
		font-weight: bold;
	}
	.label.rz {
		background-color: $jzb-sup-color;
		color: $jzb-theme-color;
		border-color: #54c9ff;
	}
	.label {
		margin-left: 16rpx;
		background-color: #f8f8f8;
		color: #666;
		display: inline-block;
		font-size: 24rpx;
		line-height: 32rpx;
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		font-weight: bold;
		border: 1rpx solid #ccc;
	}
</style>
