<template>
	<view :class="{'icard': index == 0 && count != 0}">
		<template v-if="index != 0 && count == 0">
			<u-empty text="没有搜索结果" mode="search" margin-top="80"></u-empty>
		</template>
		<view class="list" v-if="count != 0">
			<template v-if="index==0">
				<view class="title" @click="handleChangeIndex">
					<view class="title-item item-main">{{label}}</view>
					<view class="title-item item-sub">
						{{`共${count}条相关搜索结果`}}
						<u-icon name="arrow-right" color="#ddd"></u-icon>
					</view>
				</view>
			</template>
			<template v-if="type=='3' || type=='4' || type=='5'">
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
			</template>
			<template v-else>
				<q-a-list
					:list="dataList"
					:type="type=='1'? 0 : 1"
				></q-a-list>
				<!-- <view class="list-item"
					v-for="(item, index) in list"
					:key="index"
				>
				</view> -->
			</template>
			
		</view>
		
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
				type: String | Number,
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
			}
		},
		data() {
			return {
				
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
					if(this.type=='3' || this.type=='4' || this.type=='5') return data.filter(ele => this.val == ele.type) 
					return data.length > 0 ? [data[0].slice(0, 3)] : []
				}
				return data
			},
			count() {
				if(this.type=='3' || this.type=='4' || this.type=='5') return this.list.filter(ele => this.val == ele.type).length
				return this.list.reduce((sum, cur) => {return sum+cur.length}, 0)
			}
		},
		methods: {
			handleChangeIndex() {
				this.$emit('change-current', this.type)
			}
		}
	}
</script>

<style scoped lang="scss">
	.icard {
		padding: 10rpx;
	}
	.list {
		margin-bottom: 20rpx;
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
</style>
