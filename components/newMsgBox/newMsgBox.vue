<template>
	<view>
		<u-modal 
			v-model="modalShow" 
			width="80%"
			title="新消息通知"
			confirm-text="我知道了"
			:title-style="titleStyle"
			:confirm-style="confirmStyle"
			@confirm="closeModal"
		>	
			<scroll-view 
				class="content"
				scroll-y
			>	
				<template v-if="cateListFilter">
					<view class="content-item" v-for="(item, index) in cateListFilter" :key="index">
						<view class="content-t"><u-icon name=""></u-icon>{{mixinMsg[item.countKey] + '条' + item.name}}</view>
						<view class="content-l" @click="naviTo(index)">查看详情</view>
					</view>
				</template>
				
			</scroll-view>
				
		</u-modal>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				cateList: [
					{
						cate: 1,
						name: '受邀采访',
						countKey: 'counta'
					},
					{
						cate: 2,
						name: '采访邀请状态更新',
						countKey: 'countb'
					},
					{
						cate: 3,
						name: '采访解读',
						countKey: 'countc'
					},
					{
						cate: 4,
						name: '名片的收发状态更新',
						countKey: 'countd'
					},
				],
				titleStyle: {
					marginBottom: '20rpx'
				},
				confirmStyle: {
					fontSize: '28rpx',
					color: '#999'
				},
				modalShow: false
			};
		},
		watch: {
			show(newV) {
				this.modalShow = newV
			}
		},
		computed: {
			...mapState(['mixinMsg']),
			cateListFilter() {
				return this.cateList.filter((ele, index) => {
					return this.mixinMsg[ele.countKey] > 0
				})
			},
			
		},
		methods: {
			closeModal() {
				this.$emit('change-modal-flag')
			},
			naviTo(index) {
				let obj = this.cateListFilter[index]
				// console.log(obj)
				if( obj.cate == 1) {
					uni.navigateTo({
						url: `/pages/jd/jd`
					})
				}
				else if(obj.cate == 2 || obj.cate == 3) {
					uni.navigateTo({
						url: `/pages/cf/cf`
					})
					// this.$https.get('/Home/Jzbxcx/up_read', {params: {id:2}})
				}
				else if(obj.cate == 4) {
					let str = this.mixinMsg.list.map(ele => {
						if(ele.cate == 4) return ele.id
					}).join(',')
					uni.navigateTo({
						url: `/pages/messageList/messageList?newMsg=${str}`
					})
				}
				this.closeModal()
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 30rpx;
		max-height: 50vh;
		font-size: 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
	}
	.content-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 30rpx;
		align-items: center;
	}
	.content-t {
		color: #333;
		font-weight: bold;
	}
	.content-l {
		color: #007AFF;
		font-size: 26rpx;
	}
</style>
