<template>
	<view class="msg">
		{{name}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: 'msg'
			}
		},
		onLoad() {
			console.log('mixin')
		}
	}
</script>

<style scoped lang="scss">
	.msg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 300rpx;
		background-color: #000;
		color: #fff;
	}
</style>
