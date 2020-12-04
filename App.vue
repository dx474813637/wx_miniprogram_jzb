<script>
	import {loginInit} from '@/static/js/common.js'
	export default {
		onLaunch: async function() {
			console.log('loginInit-begin')
			await loginInit()
			console.log('loginInit-end')
			
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
	@font-face {
	  font-family: 'font_family';  /* project id 1991769 */
	  src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot');
	  src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.svg#iconfont') format('svg');
	}
	
	.font_family {
	  font-family: "font_family" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -webkit-text-stroke-width: 0.2px;
	  -moz-osx-font-smoothing: grayscale;
	}
	.cell-hover-class {
		opacity: 0.5;
	}
	.poster-img{
	  width: 40%;
	}
</style>