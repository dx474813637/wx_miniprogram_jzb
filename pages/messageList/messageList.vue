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
					<u-badge :count="item.count" :absolute="false" slot="right-icon"></u-badge>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="msg-w">
			<u-cell-group>
				<u-cell-item 
					:label="`互换邀请${msg[item.zt]}`" 
					:value="item.uptime | timeFilter " 
					:arrow="false"
					v-for="(item, index) in exchangeData"
					:key="index"
					@click="handleExchangeDetail(index)"
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
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				p: 1,
				msg: ['待处理', '已接受', '已拒绝'],
				iconStyle: {
					color: '#007aff'
				},
				list: [
					{
						name: '回复',
						count: 99,
						icon: 'chat'
					},
					{
						name: '赞',
						count: 199,
						icon: 'thumb-up'
					},
					{
						name: '关注',
						count: 19,
						icon: 'eye'
					},
				],
				exchangeData: [
					{
						avatorUrl: 'https://www.100ec.cn/Public/home/images/dyz.jpg',
						name: '网经社',
						label: '记者',
						status: 0, //0：待处理， 1：已处理
						time: '2020-10-14 10:46:44'
					},
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2017/12/27/5a42f77ef17e2.png',
						name: '网经社',
						label: '专家',
						status: 1, //0：待处理， 1：已处理
						time: '2020-10-13 10:46:44'
					},
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2018/07/12/5b471b720cb95.png',
						name: '网经社',
						label: '公关',
						status: 1, //0：待处理， 1：已处理
						time: '2019-10-12 10:46:44'
					},
					{
						avatorUrl: 'https://www.100ec.cn/Public/attached/2018/12/13/5c11ca9a3ac90.jpg',
						name: '网经社',
						label: '未认证',
						status: 0, //0：待处理， 1：已处理
						time: '2020-10-14 3:46:44'
					}
				]
			}
		},
		onShow() {
			this.renderList()
			this.$https.get('/Home/Jzbxcx/friends_list')
			// this.$https.get('/Home/Jzbxcx/friends_delete', {params: {
			// 	id: 1
			// }})
		},
		methods: {
			async renderList() {
				let res = await this.getData()
				if(res.data.code == 1) {
					this.exchangeData = res.data.list
				}
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
			async handleExchangeDetail(index) {
				let item = this.exchangeData[index]
				console.log(item)
				let id = item.id
				if(item.poster == this.$store.state.infoAuthorize.poster || item.zt != 0 ) return
				let modelRes = await new Promise((res, rej) => {
					uni.showModal({
						title: '是否接受对方的名片交换邀请？',
						cancelText: '拒绝',
						confirmText: '接受',
						success: r => {
							res(r)
						}
					})
				}) 
				console.log(modelRes)
				if(modelRes.confirm || modelRes.cancel) {
					let params= { id }
					if(modelRes.confirm) {
						params.zt = 1
					}else if(modelRes.cancel) {
						params.zt = 2
					}
					let re = await this.handleApply(params)
					uni.showToast({
						title: '处理成功！'
					})
				}
				
			},
				
			async handleApply(params) {
				return await this.$https.get('/Home/Jzbxcx/friends_apply_handle', { params })
			}
		}
	}
</script>

<style scoped lang="scss">
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
		padding: 2rpx 16rpx;
		border-radius: 6rpx;
		font-weight: bold;
		border: 1rpx solid #ccc;
	}
</style>
