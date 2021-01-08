export const mixinMsg = {
	data() {
		return {
			mixinMsg: null,
			mixinMsgFirst: true,
			mixinMsgShow: false
		}
	},
	onLoad() {
		this.msgInit()
	},
	onShow() {
		let curPath = getCurrentPages()[0].$page.fullPath
		if(curPath.includes('/index/index') && !this.mixinMsgFirst) {
			this.msgInit()
		}
	},
	methods: {
		msgInit() {
			setTimeout(() => {
				if(this.$store.state.infoAuthorize.auth_status == 2) {
					this.mixinMsgInit()
				}
			}, 1000)
		},
		async getMixinMsgData() {
			return this.$https.get('/Home/Jzbxcx/read_message')
		},
		async mixinMsgInit() {
			if(!uni.getStorageSync('userid')) return
			let res = await this.getMixinMsgData()
			this.mixinMsgFirst = false
			if(res.data.code == 1) {
				this.$store.commit('setMixinMsg', res.data)
				if(res.data.list && res.data.list.length > 0 && !this.mixinMsgShow) {
					this.changeModalFlag()
				}
			}
		},
		changeModalFlag() {
			this.mixinMsgShow = !this.mixinMsgShow
		}
	}
}

export const mixinUpRead = {
	onLoad(opt) {
		if(opt.newMsg) {
			this.upReadStatus(opt.newMsg)
		}
	},
	methods: {
		upReadStatus(msg) {
			this.$https.get('/Home/Jzbxcx/up_read', {params: {id: msg}})
		}
	}
}