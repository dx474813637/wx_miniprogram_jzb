<template>
	<view class="w">
		<view class="w-bg">
			<view class="user-avatar">
				<template v-if="info.bgImg">
					<view class="bg-img-v" :style="{'backgroundImage': `url(${info.bgImg})`}"></view>
				</template>
				
				<u-image 
					class="avatar"
					width="160" 
					height="160" 
					:src="info.avatar"
					border-radius="10"
					mode="scaleToFill"
					:fade="false"
				></u-image>
			</view>
		</view>
		<view class="content">
			
			<view class="user-info">
				<template v-if="info.name">
					<view class="name">
							{{info.name}}
					</view>
				</template>
				<view class="btn">
					<u-icon name="chat" color="#fff"></u-icon>
					<text class="btn-text">和TA打招呼</text>
					
				</view>
			</view>
			<view class="card">
				<u-cell-group>
					<template v-if="info.lingyu || info.field">
						
						<u-cell-item
							:arrow="false"
							title="所在领域"
							:value="info.lingyu || info.field"
						></u-cell-item>
					</template>
					<template v-if="info.company">
						
						<u-cell-item
							:arrow="false"
							title="公司"
							:value="info.company"
						></u-cell-item>
					</template>
					<template v-if="info.position">
						
						<u-cell-item
							:arrow="false"
							title="职务"
							:value="info.position"
						></u-cell-item>
					</template>
					
				</u-cell-group>
			</view>
			<template v-if="info.description">
				<view class="card">
					<view class="main">
						<u-read-more show-height="600" ref="rm">
							<text class="">
								{{info.description}}
							</text>
							<!-- <rich-text :nodes="content"></rich-text> -->
						</u-read-more>
					</view>
					
				</view>
			</template>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cate: 0,
				id: 0,
				info: {},
				userImg: 'https://www.100ec.cn/Public/home/images/icon-rw.png'
			}
		},
		onLoad(opt) {
			if(opt.cate) {
				this.cate = opt.cate
			}
			if(opt.id) {
				this.id = opt.id
			}
			this.renderList()
		},
		methods: {
			async renderList() {
				let res = await this.getData()
				if(res.data.code == 1) {
					let info = res.data.list
					if(this.cate == 1 && info.logo) {
						info.avatar = info.logo
					}
					else if(this.cate == 2 && info.pic_name1 && info.pic_name1.includes('Public/attached')) {
						info.avatar = 'https://www.100ec.cn' + info.pic_name1
					}
					else if(this.cate == 3 && info.pic_name1) {
						
					}
					else {
						info.avatar = this.userImg
					}
					info.bgImg = info.avatar
					this.info = info
					if(info.desc) {
						this.$nextTick(() => {
							this.$refs.rm.init();
						})
					}
				}
			},
			async getData() {
				return await this.$https.get("/Home/Jzbxcx/ku_detail", {params: {
					cate: this.cate,
					id: this.id
				}})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg-img-v {
		position: relative;
		// top: 0;
		// left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		filter: blur(40rpx);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 120%;
	}
	.w {
	}
	.w-bg {
		position: relative;
		width: 100%;
		height: 300rpx;
		
		// background-color: #007AFF;
	}
	.user-avatar {
		position: absolute;
		height: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.content {
		position: relative;
		z-index: 200;
		
	}
	.avatar {
		position: absolute;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		width: 160rpx;
		height: 160rpx;
		bottom: -80rpx;
		z-index: 300;
		background-color: #f8f8f8;
		border-radius: 14rpx;
	}
	.user-info {
		background-color: #fff;
		padding: 100rpx 0 60rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.user-info .name {
		text-align: center;
		color: #666;
		font-weight: bold;
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}
	.btn {
		background-color: #007AFF;
		color: #fff;
		padding: 6rpx 20rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		
	}
	.btn-text {
		margin-left: 5rpx;
	}
	.card {
		padding: 10rpx;
	}
	.main {
		background-color: #fff;
		padding: 20rpx 30rpx;
	}
</style>
