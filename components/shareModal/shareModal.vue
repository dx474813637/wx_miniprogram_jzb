<template>
	<view>
		<u-popup
			v-model="flag" 
			mode="center"
			border-radius="8"
			width="550"
		>
			<view class="share-w-title">分享到</view>
			<view class="share-w-content">
				<view class="share-w-c-item wx-bg">
					<button open-type="share" class="s-c-item" @click="zfFriends">
						<u-icon name="weixin-circle-fill" color="#07c160" size="120"></u-icon>
					</button>
					<view class="">
						微信
					</view>
				</view>
				<view class="share-w-c-item hb-bg" @click="shareSavePic">
					<button class="s-c-item">
						<u-icon name="photo" color="#007aff" size="90"></u-icon>
					</button>
					<view class="">
						海报
					</view>
				</view>
			</view>
			<view class="share-w-footer" @click="handleExit">取消</view>
		</u-popup>
		<hch-poster
			ref="hchPoster"
		></hch-poster>
	</view>
</template>

<script>
	import hchPoster from "@/components/hch-poster/hch-poster.vue"
	import {mapMutations} from 'vuex'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			opt: {
				type: Object
			}
		},
		watch: {
			show(newV) {
				this.flag = newV
			},
			flag(newV) {
				// console.log(newV)
				if(!newV) {
					this.$emit('change-flag')
				}
			},
		},
		data() {
			return {
				flag: false
			};
		},
		created() {
			this.flag = this.show
		},
		components: {
			hchPoster
		},
		methods: {
			...mapMutations(['changeShareOptions']),
			handleExit() {
				this.flag = false
			},
			shareSavePic() {
				this.handleExit()
				// this.$emit('render-event')
				this.changeShareOptions(this.opt)
				this.$nextTick(() => {
					this.$refs.hchPoster.posterShow()
				})
			},
			zfFriends() {
				this.handleExit()
				uni.showShareMenu({
					withShareTicket: true,
					success: res => {
						console.log('showShareMenu')
						console.log(res)
					}
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.share-w-content {
		display: flex;
		justify-content: space-around;
		padding: 20px 0px;
		border-top: 1px solid #f5f5f5 ;
		border-bottom: 1px solid #f5f5f5 ;
	}
	.s-c-item {
		border-radius: 50%;
		width: 60px;
		height: 60px;
		border: 0;
		background-color: #fff;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.s-c-item:after {
		border: 0;
	}
	.hb-bg .s-c-item {
		background-color: $jzb-sup-color;
	}
	.share-w-title, .share-w-footer {
		text-align: center;
		line-height: 45px;
		font-size: 16px;
		color: #666;
	}
	.share-w-c-item {
		text-align: center;
	}
</style>
