<template>
	<view class="content">
		
		<view class="list">
			<view class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="item-header">
					<view class="xuhao">
						#{{index+1}}
					</view>
					<view class="name">
						{{item.dtime}}
					</view>
					<view class="name-sub" v-if="item.a124">
						币种：{{item.a124}}
					</view>
				</view>
				<view class="item-content">
					<view class="content-invest-info type2">
						<view class="info-item" v-if="item.a100">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>营收</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a100)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a101">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>营收同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a101)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a102">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>毛利润</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a102)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a103">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>毛利润同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a103)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a104">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>净利润</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a104)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a105">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>净利润同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a105)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a106">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>总资产</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a106)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a107">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>总资产同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a107)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a108">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>净资产</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a108)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a109">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>净资产同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a109)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a110">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>付费会员</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a110)}}万
							</view>
						</view>
						<view class="info-item" v-if="item.a111">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>成交量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a111)}}万吨
							</view>
						</view>
						<view class="info-item" v-if="item.a112">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>GMV</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a112)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a113">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>GMV同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a113)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a114">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>客户数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a114)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a115">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>客户数同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a115)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a116">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>用户数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a116)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a117">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>活跃用户数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a117)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a118">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11活跃用户数同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a118)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a119">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>现金流</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a119)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a120">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>现金流同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a120)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a121">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>仓储面积</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a121)}}万平方米
							</view>
						</view>
						<view class="info-item" v-if="item.a122">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>月活跃用户数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a122)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a123">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>订单量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a123)}}万份
							</view>
						</view>
						<view class="info-item" v-if="item.a125">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>流动资产</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a125)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a126">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>流动负债</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a126)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a127">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>总负债</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a127)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a132">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>现金流量净额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a132)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a133">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>自由现金流</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a133)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a134">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>归母净利率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a134)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a135">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>毛利率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a135)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a136">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>ARPU(每用户平均收入)</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a136)}}元
							</view>
						</view>
						<view class="info-item" v-if="item.a137">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>研发费用</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a137)}}百万
							</view>
						</view>
						<view class="info-item" v-if="item.a138">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>研发费用占收入百分比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a138)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a139">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>美团外卖变现率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a139)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a140">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>活跃买家数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a140)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a141">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>广告收入</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a141)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a142">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>广告收入增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a142)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a143">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11订单量峰值</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a143)}}万笔/秒
							</view>
						</view>
						<view class="info-item" v-if="item.a144">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>总经营费用</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a144)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a145">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>经营费用率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a145)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a146">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>客单价</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a146)}}元/单
							</view>
						</view>
						<view class="info-item" v-if="item.a147">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>活跃用户人均GMV</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a147)}}元/人
							</view>
						</view>
						<view class="info-item" v-if="item.a148">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>财年GMV</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a148)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a149">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>财年GMV同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a149)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a150">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>用户数同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a150)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a151">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>注册用户数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a151)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a152">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>注册用户数同比增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a152)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a153">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>电商包裹市场份额占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a153)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a154">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>B2C市场交易份额占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a154)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a155">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>年度营收</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a155)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a156">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>年度营收增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a156)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a157">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>本地生活营收</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a157)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a160">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>本地生活营收增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a160)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a158">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>B2B业务营收</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a158)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a159">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>B2B业务营收增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a159)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a163">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>国际零售业务营收</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a163)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a164">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>国际零售业务营收增长率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a164)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a129">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>财报地址</text>
							</view>
							<view class="info-text" @click="copyUrl(item.a129)">
								点击复制
							</view>
						</view>
						
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				sortName: 'dtime'
			};
		},
		computed: {
			// dataSort() {
			// 	return this.list.sort((a, b) => parseInt(b[this.sortName]) - parseInt(a[this.sortName]))
			// }
		},
		methods: {
			copyUrl(url) {
				if(url) {
					uni.setClipboardData({
						data: url,
					    success: function (res) {
					        uni.showToast({
					        	title: '复制成功',
					        })
					    }
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">

@import "@/static/css/sjk.scss";
</style>
