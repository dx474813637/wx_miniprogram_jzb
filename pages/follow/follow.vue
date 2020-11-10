<template>
	<view>
		<view class="tabs-w">
			<u-tabs 
				:list="navList" 
				:is-scroll="false" 
				:current="current" 
				@change="change"
				:show-bar="false"
			>
			</u-tabs>
		</view>
		<view class="list">
			<template v-if="current != 2">
				<view 
					class="list-item" 
					v-for="(item, index) in list"
					:key="index"
				>	
					<q-a-user-profile
						:name="item.name"
						:label="item.label"
						:sub="item.sub"
						:isFollow="item.isFollow"
					></q-a-user-profile>
				</view>
			</template>
			<template v-else>
				<navigator 
					url="/pages/qaDetail/qaDetail" 
					class="list-item"
					v-for="(item, index) in list"
					:key="index"
				>
					<view class="item-title">
						{{item.title}}
					</view>
					<view class="item-sub">
						<view class="post-date">
							{{item.postTime | timeFilter}}
						</view>
						<view class="feed-num">
							<u-icon name="chat"></u-icon>
							<text>{{item.feedNum}}</text>
						</view>
					</view>
				</navigator>
			</template>
			
		</view>
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	export default {
		data() {
			return {
				current: 0,
				navList: [{
					name: '我关注的人'
				},{
					name: '关注我的人'
				},{
					name: '我关注的贴子'
				},],
				
			}
		},
		computed: {
			list() {
				let type = this.current
				if(type == 0) {
					return this.data.filter(ele => {
						return ele.isFollow
					})
				}else if(type == 1) {
					return this.data.filter(ele => {
						return ele.followMe
					})
				}else {
					return this.qaList
				}
				
			}
		},
		onLoad() {
			this.renderList(this.current)
		},
		watch: {
			current(newV) {
				this.renderList(newV)
			}
		},
		components: {
			QAUserProfile
		},
		methods: {
			change (index) {
				this.current = index
			},
			async renderList(index) {
				let res = await this.getData()
			},
			async getData () {
				return await this.$https.get('/Home/Jzbxcx/follow_list', {params: {p: 1}})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabs-w {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.list {
		padding: 120rpx 40rpx 40rpx;
		background-color: #fff;
	}
	.list-item {
		margin-bottom: 50rpx;
		border-bottom: 1rpx solid #f8f8f8;
		padding-bottom: 30rpx;
	}
	.item-title {
		background-color: #f8f8f8;
		padding: 10rpx;
		line-height: 50rpx;
		border-radius: 8rpx;
		color: #666;
		font-weight: bold;
	}
	.item-sub {
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
		color: #999;
	}
</style>
