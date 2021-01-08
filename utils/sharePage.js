export const sharePage ={
    data(){
        return {
            sharePageOpt:{
                title:'',  // 分享页面标题
                path: '',  // 分享页面的路径
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    }, 
	onLoad(opt) {
		if(opt.InviteCode) this.$store.commit('setOtherInviteCode', opt.InviteCode)
	},
    onShareAppMessage(res) {
		let path = getCurrentPages()[getCurrentPages().length - 1].$page.fullPath
		if(path.includes('?')) {
			path = path + '&InviteCode=' + this.$store.state.my_invite_code
		}else {
			path = path + '?InviteCode=' + this.$store.state.my_invite_code
		}
		this.$https.get('/Home/Jzbxcx/share', {params: {url: path}})
        return {
            title:this.sharePageOpt.title,
            path: path,
            // imageUrl:this.sharePageOpt.imageUrl,
            // desc:this.sharePageOpt.desc,
            // content:this.sharePageOpt.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}