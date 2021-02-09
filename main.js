import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import {https} from '@/static/js/https.js'
import store from '@/store/index.js'
import { getSetting, getlogin, getuserauthinfo } from '@/static/js/common.js'
import filters from '@/utils/filters.js'
import router from '@/router/index.js';

// Vue.mixin(share)
Vue.config.productionTip = false
Vue.use(uView)
App.mpType = 'app'

Vue.prototype.$https = https
Vue.prototype.$getSetting = getSetting
Vue.prototype.$getlogin = getlogin
Vue.prototype.$getuserauthinfo = getuserauthinfo

Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))

const app = new Vue({
    ...App
	,store
})
// #ifdef H5
	import { RouterMount } from 'uni-simple-router'
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
