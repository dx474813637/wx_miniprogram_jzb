<template>
	<view class="CPT_DYBG" :style="bg + 'height:' + height">
		<view class="body">
			<!-- 头部留白区域 -->
			<slot></slot>
		</view>
		<view class="background">
			<view class="circle" :class="'move' + (i%9)" v-for="(it, i) in circle" :style="{
				  width: it.size + unit,
				  height: it.size + unit,
				  top: it.position[0] + unit,
				  left: it.position[1] + unit,
				  backgroundColor: colorful ? it.color : circleColor,
				  filter: blur > 0 ? 'blur(' + blur + unit + ')' : null,
				  mixBlendMode: circleMode,
				}"
			 :key="i"></view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "CPT_DYBG",
		props: {
			bg: {
				type: String,
				default: "background-image:linear-gradient(to right, #ec6e66, #ff4a57);",
			},
			//高度继承父级100%高度，也可写固定px/rpx
			height: {
				type: String,
				default: "100%",
			},
			//小圆模糊度
			blur: {
				type: Number,
				default: 0,
			},
			//小圆数量
			number: {
				type: Number,
				default: 10,
			},
			//小圆颜色，为数组时，会随机分配给小圆，自行测试
			circleColor: {
				type: [Array, String],
				default: "rgba(255,255,255,0.1)",
			},
			//小圆的颜色混合模式，写css3 mixBlendMode参数
			circleMode: {
				type: String,
				default: "color-dodge",
			},
			//小圆参数，单位模式rpx，可在data里更改unit
			circleOptions: {
				type: Object,
				default: () => ({
					maxSize: 500, //最大直径
					maxX: 800, //最大横移距离
					maxY: 500, //最大竖移距离
				}),
			},
		},
		computed: {
			colorful: function() {
				let color = this.circleColor;
				if (Array.isArray(color)) {
					return true;
				}
			},
		},
		data() {
			return {
				unit: "rpx",
				speedMode: ["ease-in", "ease-out", "ease-in-out", "linear"], //移动模式
				circle: [],
			};
		},
		created() {
			this.creatCircle();
		},
		methods: {
			creatCircle() {
				let n = this.number,
					{
						maxSize,
						maxX,
						maxY
					} = this.circleOptions,
					circleColor = this.circleColor,
					colorful = this.colorful,
					circle = [];
				for (let i = 0; i < n; i++) {
					circle.push({
						size: this.getRandomInt(maxSize),
						position: [this.getRandomInt(maxX), this.getRandomInt(maxY,)],
						color: colorful ? this.getRandomColor() : null,
					});
				}
				this.circle = circle;
				setTimeout(() => {
					//刷新该组件时，快速还原，无刷新则可删除
					uni.stopPullDownRefresh();
				}, 500);
			},
			//一个v值，一个最小值，生成不小于最小值的随机值
			getRandomInt(v, min) {
				min = min ? min : 0;
				return parseInt(Math.random() * v + min);
			},
			getRandomColor() {
				let color = this.circleColor,
					len = color.length,
					r = color[parseInt(Math.random() * len)];
				console.log(r)
				return r;
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import "./ani.scss";

	.CPT_DYBG {
		overflow: hidden;
		position: relative;

		.body {
			height: 100%;
			width: 100%;
			overflow: hidden;
			position: relative;
			z-index: 1;
		}

		.background {
			position: absolute;
			z-index: 0;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.circle {
				position: absolute;
				border-radius: 50%;
			}
		}
	}
</style>
