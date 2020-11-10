<template>
	<navigator url="/pages/search/search" class="search-w">
		<u-icon name="search" size="26"></u-icon>
		<text class="search-bar-text">搜索</text>
	</navigator>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.search-w {
		border-radius: 15px;
		height: 30px;
		background-color: #f8f8f8;
		border: 1px solid #eee;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.search-bar-text {
		margin-left: 5px;
	}
</style>
