<template>
	<view :class="{'icard': index == 0 && count != 0}">
		<template v-if="index != 0 && count == 0">
			<u-empty text="没有搜索结果" mode="search" margin-top="80"></u-empty>
		</template>
		<template v-if="count != 0">
			<view class="list">
				<template v-if="index==0">
					<view class="title" @click="handleChangeIndex">
						<view class="title-item item-main">{{label}}</view>
						<view class="title-item item-sub">
							{{`共${count}条相关搜索结果`}}
							<u-icon name="arrow-right" color="#ddd"></u-icon>
						</view>
					</view>
				</template>
				<template v-if="type == 'user'">
					<view class="list-item"
						v-for="(item, index) in dataList"
						:key="index"
					>
						<q-a-user-profile
							:userid="item.auth_poster"
							:avatar="item.pic"
							:name="item.auth_name"
							:label="item.type"
							:sub="item.auth_title || item.company"
							:isFollow="item.follow"
						></q-a-user-profile>
					</view>
					<template v-if="allUserRes.list && allUserRes.list.length > 0 ">
						<view class="list-item user"
							v-for="(item, index) in allUserData"
							:key="index"
							@click="handlePath({id: item.id, cate: Number(this.val) + 1})"
						>	
							<!-- <view class="user-item avatar"> -->
								<image 
									class="user-item avatar"
									:src="item.avatar" 
								></image>
							<!-- </view> -->
							<view class="user-item name">
								{{item.name}}
							</view>
							<view class="user-item desc">
								
								<view class="desc-item cpy">
									<template v-if="item.field">
										{{item.field}}
									</template>
									<template v-else-if="item.company">
										{{item.company}}
									</template>
										
								</view>
								<template v-if="typeIndex == 5">
									<view class="desc-item position">
										{{ item.position}}
									</view>
								</template>
							</view>
							
						</view>
					</template>
				</template>
				<template v-else>
					<q-a-list
						:list="dataList"
						:type="type=='question'? 0 : 1"
					></q-a-list>
				</template>
				
			</view>
		</template>
		<template v-if="index != 0 && count != 0">
			<u-loadmore :status="loadStatus" :load-text="loadText" margin-top="30" margin-bottom="60" />
		</template>
		
	</view>
	
</template>

<script>
	import QAUserProfile from '@/components/QAUserProfile/QAUserProfile.vue'
	import QAList from '@/components/QAList/QAList.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			type: {
				type: String,
				default: ''
			},
			typeIndex: {
				type: Number | String,
				default: 0
			},
			index: {
				type: Number | String,
				default: 0
			},
			label: {
				type: String,
				default: ''
			},
			val: {
				type: Number | String,
				default: ''
			},
			allUserRes: {
				type: Object,
				default: function() {
					return {list:[]}
				}
			},
			loadStatus: {
				type: String,
				default: 'loadmore'
			}
		},
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉加载下一页',
					loading: '拼命加载中',
					nomore: '我也是有底线的'
				}
			};
		},
		components: {
			QAUserProfile,
			QAList
		},
		computed: {
			dataList() {
				let data = this.list
				if(this.index == 0) {
					if(this.type == 'user') return data.filter(ele => this.val == ele.type) 
					return data.length > 0 ? [data[0].slice(0, 3)] : []
				}
				return data
			},
			allUserData() {
				if(!this.allUserRes) return []
				let data = this.allUserRes.list.map(ele => {
					if(ele.pic_name1 && ele.pic_name1.includes('Public/attached')) {
						ele.avatar = "https://www.100ec.cn" + ele.pic_name1
					}else if(ele.logo){
						ele.avatar = ele.logo
					}else {
						ele.avatar = "https://www.100ec.cn/Public/home/images/icon-rw.png"
					}
					
					return ele
				})
				if(this.index == 0 && this.type == 'user' && this.allUserRes.list && this.allUserRes.list.length > 0 ) { 
					
					return data.length > 0 ? data.slice(0, 3) : []
				}
				// console.log(data)
				return data
			},
			count() {
				if(this.type == 'user') {
					let num1 = this.list.filter(ele => this.val == ele.type).length
					let num2 = Number(this.allUserRes.count || 0)
	
					return num1 + num2
				}
				return this.list.reduce((sum, cur) => {return sum+cur.length}, 0)
			}
		},
		methods: {
			handleChangeIndex() {
				this.$emit('change-current', this.typeIndex)
			},
			handlePath(opt) {
				uni.navigateTo({
					url: `/pages/homePageInactive/homePageInactive?id=${opt.id}&cate=${opt.cate}`
				})
					
			},
		},
	}
</script>

<style scoped lang="scss">
	.icard {
		padding: 10rpx 10rpx 0 10rpx;
	}
	.list {
		// margin-bottom: 20rpx;
		background-color: #fff;
		border: 1rpx solid #f2f2f2;
		border-radius: 20rpx;
		padding-bottom: 10rpx;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		padding: 0 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.item-main {
		font-weight: bold;
	}
	.item-sub {
		color: #999;
		font-size: 24rpx;
	}
	.list-item {
		padding: 20rpx;
	}
	.list-item.user {
		display: flex;
		align-items: center;
		// flex-wrap: wrap;
	}
	.user-item.avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 20rpx;
	}
	.user-item.name {
		margin-right: 20rpx;
		white-space: nowrap;
	}
	.user-item.desc {
		// margin-right: 20rpx;
		color: #007AFF;
	}
	.desc-item.position {
		color: #f90;
		font-size: 24rpx;
	}
	.next-btn {
		display: none;
		justify-content: center;
	}
	.next-btn.show {
		display: flex;
	}
</style>
