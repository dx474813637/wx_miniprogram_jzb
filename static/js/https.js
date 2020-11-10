import Request from '@/utils/luch-request/index.js'
import store from '@/store/index.js'


const https = new Request()
https.setConfig( config => {
	// #ifdef MP
		config.baseURL = 'https://www.100ec.cn';
		config.header = store.state.httpHeader
	// #endif
	return config
})

https.interceptors.request.use( config => {
	return config
}, err => {
	return Promise.reject(err)
})

https.interceptors.response.use( response => {
	return response
}, response => {
	return Promise.reject(err)
})


export { https }