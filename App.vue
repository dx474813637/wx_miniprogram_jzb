<script>
	import {loginInit} from '@/static/js/common.js'
	export default {
		onLaunch: function() {
			loginInit()
			
		},
		onShow: function() {
			this.$getSetting()
			
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	page {
		background-color: #f8f8f8;
		height: 100%;
		word-break: break-all;
	}
	
	.cell-hover-class {
		opacity: 0.5;
	}
</style>