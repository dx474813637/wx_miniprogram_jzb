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
				</view>
				<view class="item-content">
					<view class="content-invest-info type2">
						<view class="info-item" v-if="item.shares">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>交易规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.shares)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a100">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>用户规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a100)}}亿人
							</view>
						</view>
						<view class="info-item" v-if="item.a101">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>渗透率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a101)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a102">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>营收规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a102)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a103">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>市场规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a103)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a104">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>社会消费品零售总额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a104)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a105">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>商家数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a105)}}万家
							</view>
						</view>
						<view class="info-item" v-if="item.a106">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>企业规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a106)}}万家
							</view>
						</view>
						<view class="info-item" v-if="item.a107">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>直接从业人员规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a107)}}万人
							</view>
						</view>
						<view class="info-item" v-if="item.a108">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>间接从业人员规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a108)}}万人
							</view>
						</view>
						<view class="info-item" v-if="item.a109">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>业务量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a109)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a110">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a110)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a111">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>交易量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a111)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a112">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>淘宝村数量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a112)}}个
							</view>
						</view>
						<view class="info-item" v-if="item.a113">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11成交总额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a113)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a114">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11成交总额同比增长</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a114)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a115">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11包裹(订单量)</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a115)}}亿
							</view>
						</view>
						<view class="info-item" v-if="item.a116">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11包裹同比增长</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a116)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a117">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11包裹签收破亿时间</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a117)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a118">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11包裹发货破亿时间</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a118)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a119">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11支付宝总笔数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a119)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a120">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>交易峰值</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a120)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a122">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11客单价</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a122)}}元
							</view>
						</view>
						<view class="info-item" v-if="item.a123">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>月活跃用户数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a123)}}
							</view>
						</view>
						<view class="info-item" v-if="item.a125">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>在线旅游市场GMV</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a125)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a126">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>平均单价</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a126)}}元
							</view>
						</view>
						<view class="info-item" v-if="item.a127">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>城镇居民食品消费支出</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a127)}}元
							</view>
						</view>
						<view class="info-item" v-if="item.a128">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>生鲜电商占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a128)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a129">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>融资事件数量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a129)}}次
							</view>
						</view>
						<view class="info-item" v-if="item.a130">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>融资金额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a130)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a131">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>订单规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a131)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a132">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>冷链物流行业占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a132)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a133">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>总费用</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a133)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a134">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>GDP</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a134)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a135">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>GDP占比率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a135)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a136">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>跨境进口零售电商市场规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a136)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a137">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>跨境进口总额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a137)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a138">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>跨境进口在进口总额中的占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a138)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a139">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>出境旅游人数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a139)}}百万
							</view>
						</view>
						<view class="info-item" v-if="item.a140">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>出国留学人数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a140)}}万人
							</view>
						</view>
						<view class="info-item" v-if="item.a141">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>留学人员回国人数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a141)}}万人
							</view>
						</view>
						<view class="info-item" v-if="item.a142">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>母婴产品服务规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a142)}}万亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a143">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>我国母婴消费占家庭消费比例</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a143)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a144">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>中国母婴移动端用户规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a144)}}亿人
							</view>
						</view>
						<view class="info-item" v-if="item.a145">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>母婴行业市场规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a145)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a146">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>母婴用品市场规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a146)}}万亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a147">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>婴儿纸尿裤市场规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a147)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a148">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>婴儿奶粉市场规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a148)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a149">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>快递柜组数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a149)}}万组
							</view>
						</view>
						<view class="info-item" v-if="item.a150">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>箱递率</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a150)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a151">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>国内旅游总人数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a151)}}亿人
							</view>
						</view>
						<view class="info-item" v-if="item.a152">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>国内旅游总收入</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a152)}}万亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a153">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11移动端订单占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a153)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a154">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网络零售额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a154)}}万亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a155">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11订单峰值</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a155)}}笔/秒
							</view>
						</view>
						<view class="info-item" v-if="item.a156">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11网联、银联网络支付业务笔数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a156)}}亿笔
							</view>
						</view>
						<view class="info-item" v-if="item.a157">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>双11网联、银联网络支付业务金额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a157)}}万亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a158">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>快递业务平均单价</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a158)}}元
							</view>
						</view>
						<view class="info-item" v-if="item.a159">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>第三方移动支付笔数</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a159)}}亿笔
							</view>
						</view>
						<view class="info-item" v-if="item.a160">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>货运量</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a160)}}万亿吨
							</view>
						</view>
						<view class="info-item" v-if="item.a161">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网约车交易额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a161)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a162">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>进口占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a162)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a163">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>B2B交易模式占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a163)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a164">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>B2B交易规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a164)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a165">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网络零售交易规模</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a165)}}亿元
							</view>
						</view>
						<view class="info-item" v-if="item.a166">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>出口占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a166)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a167">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>网络零售模式占比</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a167)}}%
							</view>
						</view>
						<view class="info-item" v-if="item.a168">
							<view class="info-label">
								<u-icon name="bookmark"></u-icon>
								<text>人均年消费额</text>
							</view>
							<view class="info-text">
								{{parseFloat(item.a168)}}元
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
		}
	}
</script>

<style scoped lang="scss">

@import "@/static/css/sjk.scss";
</style>
