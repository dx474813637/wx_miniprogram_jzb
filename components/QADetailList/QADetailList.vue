<template>
	<view class="list">
		<template v-if="list && list.length > 0">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="user-row">
					<q-a-user-profile
						:userid="item.poster"
						:avatar="item.pic"
						:name="item.name"
						:label="item.type"
						:sub="item.auth_title || item.company"
						:isFollow="item.follow"
						:followBtn="isShowFollowBtn"
						@follow-event="handleFollow"
					></q-a-user-profile>
				</view>
				<view class="content-sub">
					<view class="post-time">
						{{item.uptime | timeFilter}}
					</view>
				</view>
				<view class="qa-content">
					<u-read-more 
						ref="uReadMore"
						toggle
					>
						<view class="r-content">
							<template v-if="item.intro == goodStr">
								点了个赞<u-icon name="thumb-up" size="30" color="#007aff"></u-icon>
							</template>
							<template v-else>
								{{item.intro}}
							</template>
						</view>
					</u-read-more>
					<template v-if="isAnswer && item.rList.length != 0">
						<view class="a-reply-list" @click="repDetail(index)">
							<view class="a-r-item"
								v-for="(ele, i) in item.rList.slice(0, 3)"
								:key="i"
							>
								<view class="a-r-c">
									<text class="a-r-c-name">{{ele.name}}</text>：
									<template v-if="ele.intro == goodStr">
										<u-icon name="thumb-up" size="30" color="#007aff"></u-icon>
									</template>
									<template v-else>
										{{ele.intro}}
									</template>
								</view>
							</view>
							<view class="a-r-detail-btn">
								查看共{{item.rList.length}}条回复
							</view>
						</view>
					</template>
					
				</view>
					
				<q-a-item-tools
					:uid="item.poster"
					:qid="item.qid || item.vid"
					:aid="item.id"
					:name="item.name"
					:type="cate"
					:isAuthor="false"
					:goods="item.goods"
					:isAnswer="isAnswer"
					:reportInfo="item.intro.slice(0, 10)"
					@follow-event="handleFollow"
				></q-a-item-tools>
			</view>
			
		</template>
		<template v-else>
			<view>
				<u-empty text="暂无评论" mode="message"></u-empty>
			</view>
		</template>
		
		<u-popup 
			v-model="show"
			mode="bottom"
			border-radius="20"
			height="60%"
			safe-area-inset-bottom
			:custom-style="customStyle"
		>
			<view class="rep-detail-content">
				<view class="rep-title">
					此条特邀解读共{{repDetailList.rList.length}}条回复
				</view>
				<slot></slot>
			</view>
		</u-popup>	
	</view>
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue';
	import QAItemTools from '@/components/QAListItemTools/QAListItemTools.vue';
	import {mapState} from 'vuex'
	import Skeleton from '@/components/skeleton/index.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			type: {
				type: Number | String,
				default: 0
			},
			isAnswer: {
				type: Boolean,
				default: false
			},
			isShowFollowBtn: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				cate: 0,
				show: false,
				repDetailList: '',
				customStyle: {
					padding: '20rpx 0 0'
				},
			};
		},
		computed: {
			...mapState(['goodStr', 'goodIcon']),
		},
		watch: {
			list(newV) {
				// console.log(newV)
				this.$nextTick(() => {
					this.$refs.uReadMore.forEach(ele => ele.init());
				})
			},
			type(newV) {
				this.cate = newV
			}
		},
		components: {
			QAUserProfile,
			QAItemTools,
			Skeleton
		},
		methods: {
			handleFollow() {
				this.$emit('follow-event')
			},
			repDetail(index) {
				this.repDetailList = this.list[index]
				this.$emit('update-rep-list', this.repDetailList.rList)
				this.show = true
			}
		}
	}
</script>

<style scoped lang="scss">
	.rep-detail-content {
		padding: 20rpx;
		.rep-title {
			color: $jzb-theme-color;
			font-weight: bold;
			text-align: center;
			line-height: 60rpx;
			border-bottom: 1rpx solid #f8f8f8;
		}
	}
	.a-r-detail-btn {
		color: #999;
		// text-align: right;
	}
	.r-content {
		line-height: 50rpx;
		font-size: 28rpx;
		white-space: pre-wrap;
	}
	.qa-reply {
		background-color: $jzb-bg-color;
		padding: 15rpx;
		border-radius: 10rpx;
		color: #666;
		font-size: 30rpx;
	}
	.qa-reply-item {
		line-height: 50rpx;
		margin-bottom: 10rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.qa-reply-item text {
		color: $jzb-theme-color;
	}
	.qa-reply-footer {
		text-align: right;
		color: $jzb-theme-color;
	}
	.list-item {
		padding: 20rpx 0;
		margin-bottom: 30rpx;
		border-bottom: 2rpx solid #f2f2f2;
	}
	.user-row {
		margin-bottom: 10rpx;
	}
	.qa-content {
		font-size: 36rpx;
		line-height: 55rpx;
		// overflow : hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 8;
		// -webkit-box-orient: vertical;
	}
	.content-sub {
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		align-items: center;
	}
	.post-time {
		color: #999;
	}
	.more-btn {
		font-weight: bold;
		color: $jzb-theme-color;
		font-size: 30rpx;
	}
	.a-reply-list {
		position: relative;
		background-color: #f8f8f8;
		padding: 20rpx ;
		border-radius: 15rpx;
		font-size: 28rpx;
		margin-top: 15rpx;
	}
	.a-r-c {
		line-height: 35rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #666;
		white-space: pre-wrap;
		margin-bottom: 10rpx;
	}
	.a-r-c .a-r-c-name {
		color: $jzb-theme-color;
		// font-weight: bold;
	}
</style>
