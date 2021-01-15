<template>
	<view>
		top
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.$https.get('/Home/Jzbxcx/top_score', {params: {cate: 1, time: 7}})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
