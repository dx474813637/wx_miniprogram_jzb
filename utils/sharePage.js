
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
    onShareAppMessage(res) {
        return {
            title:this.sharePageOpt.title,
            // path:this.sharePageOpt.path,
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