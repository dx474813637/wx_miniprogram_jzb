<template>
	<view class="">
		<view class="msg-w">
			
			<u-cell-group>
				<u-cell-item 
					v-for="(item, index) in list"	
					:key="index"
					:icon="item.icon" 
					:title="item.name" 
					:icon-style="iconStyle" 
					:arrow="true"
					@click="handleGoDetail"
				>
					<template v-if="item.count">
						<u-badge :count="item.count" :absolute="false" slot="right-icon"></u-badge>
					</template>
					
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="msg-w">
			<u-tabs 
				:list="tabsList" 
				:is-scroll="false" 
				:current="tabsCurrent" 
				@change="change"
				:show-bar="false"
			></u-tabs>
			<template v-if="dataList.length == 0">
				<view class="empty">
					<u-empty text="列表为空" mode="list"></u-empty>
				</view>
			</template>
			<u-cell-group>
				<u-cell-item 
					:value="item.uptime | timeFilter " 
					:arrow="false"
					v-for="(item, index) in dataList"
					:key="index"
					@click="handlePopupShow(index)"
				>
					<image 
						class="cell-avator"
						slot="icon" 
						:src="item.pic" 
					/>
					<view class="cell-title" slot="title">
						<text class="name">{{item.name}}</text>
						<text class="label rz" >{{item.type | typeToLabel}}</text>
					</view>
					<view class="cell-label" slot="label">
						
						<template v-if="item.zt == 1">
							<u-icon name="checkmark-circle-fill" color="#00aa7f" size="28"></u-icon>
						</template>
						<template v-else-if="item.zt == 2">
							<u-icon name="close-circle-fill" color="#d80000" size="28"></u-icon>
						</template>
						<template v-else>
							<u-icon name="info-circle-fill" color="#f90" size="28"></u-icon>
						</template>
						<text class="cell-label-text">{{`互换邀请${msg[item.zt]}`}}</text>
					</view>
					<!-- <u-badge
						:count="item.status == 1? 0 : 1"
						class="u-badge"
						:absolute="false" 
						slot="right-icon" 
						is-dot 
					></u-badge> -->
				</u-cell-item>
			</u-cell-group>
			
		</view>
		<u-popup 
			v-model="show"
			mode="center"
			border-radius="20"
			width="80%"
			height="650"
		>
			<view class="msg-box">
				<view class="msg-title">
					名片邀请
				</view>
				<view class="msg-content">
					是否接受对方的名片互换邀请？如若接受，双方均可查看对方的手机等联系信息。
				</view>
				<view class="msg-btn">
					<view class="msg-item">
						<u-button type="primary" @click="handleExchangeDetail(true)">接受</u-button>
					</view>
					<view class="msg-item">
						<u-button type="error" @click="handleExchangeDetail(false)">拒绝</u-button>
					</view>
					<view class="msg-item">
						<u-button type="info" plain @click="show = false">忽略</u-button>
					</view>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
	
	import {mixinUpRead} from '@/utils/mixin_msg.js'
	export default {
		mixins: [mixinUpRead],
		data() {
			return {
				show: false,
				pageFlag: true,
				p: 1,
				loading: false,
				msg: ['待处理', '已接受', '已拒绝'],
				iconStyle: {
					color: '#007aff'
				},
				tabsList: [
					{
						name: '收到的名片邀请'
					},
					{
						name: '发出的名片邀请'
					}
				],
				tabsCurrent: 0,
				handleIndex: 0,
				list: [
					{
						name: '回复动态',
						icon: 'chat'
					},
				],
				exchangeData: []
			}
		},
		computed: {
			dataList() {
				let index = this.tabsCurrent
				let iposter = this.$store.state.infoAuthorize.poster
				return this.exchangeData.filter(ele => {
					if(iposter == (index? ele.poster :ele.friends)) {
						ele.type = index ? ele.btype : ele.atype
						ele.pic = index ? ele.bpic : ele.apic
						ele.name = index ? ele.bname : ele.aname
						return true
					}else {
						return false
					}
				})
			}
		},
		onShow() {
			uni.showLoading({
				title: '加载中'
			})
			this.renderList()
			this.$nextTick(() =>{
				uni.hideLoading()
			})
			// this.$https.get('/Home/Jzbxcx/friends_list')
			// this.$https.get('/Home/Jzbxcx/friends_delete', {params: {
			// 	id: 1
			// }})
		},
		onReachBottom() {
			if(!this.pageFlag || this.loading) return
			this.p++
			this.loading = true
			this.renderList()
			
		},
		methods: {
			change(index) {
				this.tabsCurrent = index
			},
			async renderList() {
				let res = await this.getData()
				if(res.data.code == 1) {
					this.exchangeData = res.data.list
					if(res.data.pages == this.p) this.pageFlag = false
				}
				if(this.loading) this.loading = false
			},
			async getData() {
				return await this.$https.get('/Home/Jzbxcx/friends_apply_list', {
					params: {p: this.p}
				})
			},
			handleGoDetail(index) {
				uni.navigateTo({
					url: '/pages/messageDetail/messageDetail?index=' + index
				})
			},
			handlePopupShow(index) {
				let item = this.dataList[index]
				if(item.poster == this.$store.state.infoAuthorize.poster || item.zt != 0)  return
				this.handleIndex = index
				this.show = true
			},
			async handleExchangeDetail(apply) {
				let item = this.exchangeData[this.handleIndex]
				let id = item.id
				if(item.poster == this.$store.state.infoAuthorize.poster || item.zt != 0 ) return

				let params= { id }
				if(apply) {
					params.zt = 1
				}else {
					params.zt = 2
				}
				let re = await this.handleApply(params)
				uni.showToast({
					title: '处理成功！'
				})
				this.show = false
				this.renderList()
				
			},
				
			async handleApply(params) {
				return await this.$https.get('/Home/Jzbxcx/friends_apply_handle', { params })
			}
		}
	}
</script>

<style scoped lang="scss">
	.empty {
		padding: 60rpx 0;
	}
	.cell-label {
		display: flex;
		align-items: baseline;
	}
	.cell-label .cell-label-text {
		margin-left: 5rpx;
		font-size: 24rpx;
	}
	.msg-box {
		padding: 20rpx;
	}
	.msg-title {
		font-size: 30rpx;
		text-align: center;
		line-height: 70rpx;
		margin-bottom: 20rpx;
		font-weight: bold;
	}
	.msg-content {
		font-size: 30rpx;
		line-height: 50rpx;
		margin-bottom: 40rpx;
	}
	.msg-item {
		// height: 50rpx;
		margin-bottom: 20rpx;
	}
	.u-badge {
		margin-left: 20rpx;
	}
	.msg-w {
		background-color: #fff;
		margin-bottom: 30rpx;
	}
	.msg-list {
		padding-top: 30rpx;
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
		padding: 0rpx 16rpx;
		border-radius: 6rpx;
		// font-weight: bold;
		border: 1rpx solid #ccc;
	}
</style>
