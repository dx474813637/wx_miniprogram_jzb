<template>
	<u-tabbar
	    :show="tabBar.show"
	    :bg-color="tabBar.bgColor"
	    :border-top="tabBar.borderTop"
		:list="tabBar.list"
		:mid-button="tabBar.midButton"
		:inactive-color="tabBar.inactiveColor"
		:activeColor="tabBar.activeColor"
		@change="handleChange"
		:before-switch="handleBefore"
	></u-tabbar>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['tabBar'])
		},
		methods: {
			handleChange(index) {
				// console.log(index)
			},
			handleBefore(index) {
				// console.log(index)
				if(index == 2) {
					
				}
				return true
			}
		}
	}
</script>

<style>

</style>
