<template>
	<view class="list">
		<template v-if="index == 0">
			<view class="list-item" v-for="(item, index) in 6" :key="index">
				<msg-detail-feed></msg-detail-feed>
			</view>
		</template>
		<template v-else-if="index == 1">
			<view class="list-item" v-for="(item, index) in 6" :key="index">
				<msg-detail-like></msg-detail-like>
			</view>
		</template>
		<template v-else-if="index == 2">
			<view class="list-item" v-for="(item, index) in 6" :key="index">
				<msg-detail-follow></msg-detail-follow>
			</view>
		</template>
		
	</view>
</template>

<script>
	import msgDetailLike from '@/components/msgDetailLike/msgDetailLike.vue'
	import msgDetailFeed from '@/components/msgDetailFeed/msgDetailFeed.vue'
	import msgDetailFollow from '@/components/msgDetailFollow/msgDetailFollow.vue'
	export default {
		data() {
			return {
				index: '',
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.index = opt.index
		},
		components: {
			msgDetailLike,
			msgDetailFeed,
			msgDetailFollow
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.list {
		background-color: #fff;
	}
	.list-item {
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
</style>
