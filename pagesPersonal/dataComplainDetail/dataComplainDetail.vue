<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '拼多多',
				
			}
		},
		onLoad(opt) {
			if(opt && opt.name) this.name = opt.name
			this.renderList()
		},
		methods: {
			async renderList() {
				let res = await this.getData()
				
				
			},
			async getData() {
				return await this.$https.post('/Home/Jzbxcx/json_315_post', {
					f: 'website',
					website: this.name,
				}) 
			}
		}
	}
</script>

<style>

</style>
