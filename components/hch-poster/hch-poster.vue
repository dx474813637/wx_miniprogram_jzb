<!--
 * @Description: 生成海报组件
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-07 14:48:41
 * @LastEditors: hch
 * @LastEditTime: 2020-08-10 11:02:27
 * 保存海报按钮和关闭按钮 在html代码中写出来 绑定点击方法然后透明 再用canvas 覆盖
-->

<template>
  <view class="canvas-content" v-show="canvasShow">
    <!-- 遮罩层 -->
    <view class="canvas-mask"></view>
    <canvas class="canvas" canvas-id="myCanvas"></canvas><!-- 海报 -->
    <!-- 关闭按钮 -->
    <!-- <cover-image class="canvas-close-btn" @tap="handleCanvasCancel" src="https://huangchunhongzz.gitee.io/imgs/poster/close_btn.png" alt="" srcset=""></cover-image> -->
    <view class="button-wrapper">
      <!-- 保存海报按钮 -->
      <cover-view class="save-btn" @tap="handleSaveCanvasImage">保存海报</cover-view>
      <cover-view class="save-btn cancel-btn" @tap="handleCanvasCancel">取消</cover-view>
    </view>
  </view>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  data() {
    return {
      canvasShow:false,
      attrs:{//主板版海报
		curPageUrl: 'pages/index/index',
		name: '姓名',
		label: '标签',
		sub: '头衔',
		contentTitle: '标题',
		contentText: '内容',
        marginLR: 40,
        marginTB: 40,
        radius: 0.01,
        fillColor: '#ffffff',
        innerLR: 20,
        innerTB: 20,
        posterRatio: 1,
        posterImgUrl: "",
        title: "",
        titleFontSize: 18,
        titleLineHeight: 25,
        posterCodeUrl: "",
        codeWidth: 0.2,
        codeRatio: 1,
        codeRadius: 0.5,
        codeMT: 20,
        codeName: "网经社",
        codeNameMT: 20,
        tips: "长按/扫描识别查看商品",
        posterBgUrl:'https://www.100ec.cn/Public/home/images/wx_haibao_bg.jpg',
        codeML:140,
        desTextMT:70,
        desTextML:240,
      },
    }
  },
  props: {
    posterBgFlag:{//是否展示海报背景图 不用
      type:Boolean,
      default:true
    },
    simpleFlag:{//是否展示简单版海报 不用
      type:Boolean,
      default:false
    },
	billType: {//海报类型
      type:String,
      default: 'user'  ,//用户名片user； 解读qJd； 提问q； 资讯news；
    }
	
  },
  mounted() {
    this.system = this.getSystem()
  },
  computed: {
	  ...mapState(['shareOptions'])
  },
  methods: {
    /**
     * @description: 展示海报
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    posterShow(){
      this.canvasShow = true
      Object.assign(this.attrs,this.shareOptions)
        this.attrs={
			curPageUrl: this.attrs.curPageUrl,
			name:this.attrs.name,
			label:this.attrs.label,
			sub: this.attrs.sub,
			contentTitle: this.attrs.contentTitle,
			contentText: this.attrs.contentText,
			marginLR: this.attrs.marginLR*this.systemScale,
			marginTB: this.attrs.marginTB*this.systemScale,
			innerLR: this.attrs.innerLR*this.systemScale,
			innerTB: this.attrs.innerTB*this.systemScale,
			radius: this.attrs.radius,
			fillColor: this.attrs.fillColor,
			posterRatio: this.attrs.posterRatio,
			posterImgUrl:this.attrs.posterImgUrl,
			title: this.attrs.title,
			titleFontSize: this.attrs.titleFontSize*this.systemScale,
			titleLineHeight: this.attrs.titleLineHeight*this.systemScale,
			posterCodeUrl: this.attrs.posterCodeUrl,
			codeWidth: this.attrs.codeWidth*this.systemScale,
			codeRatio: this.attrs.codeRatio,
			codeRadius: this.attrs.codeRadius,
			codeMT: this.attrs.codeMT*this.systemScale,
			codeName: this.attrs.codeName,
			codeNameMT: this.attrs.codeNameMT*this.systemScale,
			tips: this.attrs.tips,
			posterBgUrl: this.attrs.posterBgUrl,
			codeML: this.attrs.codeML*this.systemScale,
			desTextMT:this.attrs.desTextMT*this.systemScale,
			desTextML:this.attrs.desTextML*this.systemScale,
      }
      // if(this.simpleFlag){
      //   this.creatSimplePoster(this.attrs)
      // }else{
        this.creatPoster(this.attrs)
      // }
    },
    /**
     * @description: 生成海报
     * @param {number} marginTB 上下距离
     * @param {number} marginLR 左右距离
     * @param {number} innerLR 上下内边距
     * @param {number} innerTB 左右内边距
     * @param {number} radius 圆角
     * @param {number} fillColor 海报填充背景色
     * @param {number} posterRatio 海报主图片宽高比例
     * @param {number} posterImgUrl 海报主图片url
     * @param {number} title 海报的title
     * @param {number} titleFontSize 字体大小
     * @param {number} titleLineHeight 标题文本的行高大小
     * @param {number} posterCodeUrl 小程序码图片
     * @param {number} codeWidth 小程序码的占屏幕的百分比
     * @param {number} codeRatio 小程序码的宽度比例
     * @param {number} codeRadius 小程序码的圆角
     * @param {number} codeMT 小程序码的margin-top值
     * @param {number} codeName 小程序码名字
     * @param {number} codeNameMT 小程序码名字的margin-top值
     * @param {number} tips 提示语
     * @author: hch
     */
    async creatPoster(canvasAttr){
      wx.showLoading({
        title: "生成海报中..."
      })
	  await this.getCodeUrl()
      const ctx = wx.createCanvasContext("myCanvas",this)
      ctx.draw()//清空之前的海报
      // 根据设备屏幕大小和距离屏幕上下左右距离，及圆角绘制背景
      this.roundRect(ctx
		  ,canvasAttr.marginLR
		  ,canvasAttr.marginTB
		  ,this.system.w-2*canvasAttr.marginLR
		  ,(this.scale*this.system.w)-2*canvasAttr.marginTB-100
		  ,0
		  ,'#000'
	  );
      // if(this.posterBgFlag){
      await this.creatBgImg(ctx,canvasAttr)
      // }
      // 绘制标题 textY 绘制文本的y位置
      let textY = this.creatTitle(ctx,canvasAttr)
	  let maxLine = 8
	  let textLine = 1
	  //绘制用户基本信息
	  this.createUserInfo(ctx,canvasAttr, textY)
	  textY = await this.creatImg(ctx,canvasAttr, textY)
	  let obj = this.createContentTitle(ctx,canvasAttr, textY)
	  textY = obj.textY
	  this.createContentText(ctx,canvasAttr, textY, maxLine - obj.textLine)
	  // if(this.billType == 'user') {
			// this.creatUserInfo(ctx,canvasAttr, textY)
	  // }
	  
      // 绘制小程序码
      this.creatCode(ctx,canvasAttr,textY)
      // 小程序的名称
      // this.creatCodeText(ctx,canvasAttr,canvasAttr.codeName,textY,14,"#fff")
      // 长按/扫描识别查看商品
	  let codeTextY = canvasAttr.marginTB+canvasAttr.innerTB + 0.8*(this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR)*this.scale+this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio+10
      this.creatCodeText(ctx,canvasAttr,canvasAttr.tips, codeTextY,10,"#54beff") 
	  
      wx.hideLoading()
    },

    async creatSimplePoster(canvasAttr){
      wx.showLoading({
        title: "生成海报中..."
      })
      const ctx = wx.createCanvasContext("myCanvas",this)
      ctx.draw()//清空之前的海报
      // 根据设备屏幕大小和距离屏幕上下左右距离，及圆角绘制背景
      this.roundRect(ctx,canvasAttr.marginLR,canvasAttr.marginTB,this.system.w-2*canvasAttr.marginLR,(this.scale*this.system.w)-2*canvasAttr.marginTB-100, (this.system.w-2*canvasAttr.marginLR)*canvasAttr.radius,canvasAttr.fillColor );
      if(this.posterBgFlag){
         await this.creatBgImg(ctx,canvasAttr)
      }
      // 绘制小程序码
      this.creatSimpleCode(ctx,canvasAttr,canvasAttr.marginTB)
      // 绘制纵向文本
      this.creatVerticalTitle(ctx,canvasAttr)
      wx.hideLoading()
    },
    /**
      * 
      * @param {CanvasContext} ctx canvas上下文
      * @param {number} x 圆角矩形选区的左上角 x坐标
      * @param {number} y 圆角矩形选区的左上角 y坐标
      * @param {number} w 圆角矩形选区的宽度
      * @param {number} h 圆角矩形选区的高度
      * @param {number} r 圆角的半径
      * @param {String} fillColor 天聪颜色
      */
    roundRect(ctx, x, y, w, h, r, fillColor='#ffffff', isBorder) {
      ctx.save()
      ctx.beginPath()
      // 绘制左上角圆弧
      ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
      // 绘制border-top
      // 画一条线 x终点、y终点
      ctx.lineTo(x + w - r, y)
      // 绘制右上角圆弧
      ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
      // 绘制border-right
      ctx.lineTo(x + w, y + h - r)
      // 绘制右下角圆弧
      ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
      // 绘制左下角圆弧
      ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
      // 绘制border-left
      ctx.lineTo(x, y + r)
      // 填充颜色
      ctx.setFillStyle(fillColor)
      ctx.fill()
	  if(isBorder) {
		  ctx.strokeStyle = '#fff';
		  ctx.lineWidth = 3
		  ctx.stroke();
	  }
      // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore 这个很重要 不然没办法保存
      ctx.clip()
    },
    /**
     * @description: 获取设备信息
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    getSystem(){
      let system = wx.getSystemInfoSync()
      this.scale = 667 / 375 //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
      this.systemScale = system.windowWidth / 375 //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
      return {w:system.windowWidth,h:system.windowHeight}
    },
    /**
     * @description: 生成海报背景图
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatBgImg(ctx,canvasAttr){
      let _this = this
      return new Promise((resolve,reject)=>{
        wx.getImageInfo({
          src: canvasAttr.posterBgUrl,
          success (res) {
            const imgAttr = res//海报背景展示图片信息
            let sale = res.width/(_this.system.w-2*canvasAttr.marginLR)
            ctx.drawImage(res.path
			,canvasAttr.marginLR
			,canvasAttr.marginTB
			, _this.system.w-2*canvasAttr.marginLR+5
			,(_this.scale*_this.system.w)-2*canvasAttr.marginTB-100+5
			)
            ctx.restore()
            ctx.draw(true)
            resolve()
          },
          fail(res) {
            console.log("fail -> res", res)
            uni.showToast({
              title: "海报背景图下载异常",
              duration: 2000,
              icon: "none"
            })
          }
        })
      })
    },
    /**
     * @description: 生成头部海报图
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatImg(ctx,canvasAttr, textY){
      let _this = this
      return new Promise((resolve,reject)=>{
        wx.getImageInfo({
          src: canvasAttr.posterImgUrl,
          success (res) {
            ctx.restore()
            ctx.draw(true)
            const imgAttr = res//海报展示图片信息
            let sale = res.width/(_this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR)
            let x = canvasAttr.marginLR+canvasAttr.innerLR
			let y = textY+40
			let w = 60
			_this.roundRect(
				ctx, x, y, w, w/canvasAttr.posterRatio, 
				(_this.system.w-2*canvasAttr.marginLR)*canvasAttr.radius, null, true
			);
            ctx.drawImage(
				res.path, x, y, w, w/canvasAttr.posterRatio
			)
            ctx.restore()
            ctx.draw(true)
            resolve(y + w/canvasAttr.posterRatio)
          },
          fail(res) {
            console.log("fail -> res", res)
            uni.showToast({
              title: "海报主图下载异常",
              duration: 2000,
              icon: "none"
            })
          }
        })

      })
    },
    /**
     * @description: 生成横向文本标题
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatTitle(ctx,canvasAttr){
      ctx.restore() //恢复之前保存的绘图上下文
      ctx.save() 
      ctx.setFontSize(canvasAttr.titleFontSize)
	  ctx.setFillStyle('#ffffff')
	  // ctx.textAlign = 'center'
	  // ctx.fillText(canvasAttr.title, this.system.w/2, canvasAttr.marginLR+canvasAttr.innerLR)
      let textY = this.drawText(
						ctx, 
						canvasAttr.title,
						canvasAttr.marginLR+canvasAttr.innerLR, 
						2*canvasAttr.innerLR+canvasAttr.marginTB,
						// (this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR)/canvasAttr.posterRatio+2*canvasAttr.innerLR+canvasAttr.marginTB, 
						this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR, 
						canvasAttr.titleLineHeight,
						true
					).y
      ctx.draw(true)
      return textY
    },
    /**
     * @description: 生成纵向文本标题
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatVerticalTitle(ctx,canvasAttr){
      ctx.restore() //恢复之前保存的绘图上下文
      ctx.save() 
      ctx.setFontSize(canvasAttr.titleFontSize)
      canvasAttr.title.forEach((element,i) => {
        this.drawText(ctx, element, canvasAttr.marginTB+canvasAttr.desTextML+i*20,canvasAttr.marginLR+canvasAttr.desTextMT, 15, canvasAttr.titleLineHeight)
      });
      ctx.draw(true)
    },
    /**
     * @param {Object} ctx canvas上下文
     * @param {String} text 需要输入的文本
     * @param {Number} x X轴起始位置
     * @param {Number} y Y轴起始位置
     * @param {Number} maxWidth 单行最大宽度
     * @param {Number} lineHeight 行高
     */
    drawText(ctx, text, x, y, maxWidth=375, lineHeight=30,isCenter=false, maxLine) {
		
        let canvas = ctx.canvas;
        let arrText = text.split('');
        let line = '';
		let textLine = 1
		let flag = false
		if(!isCenter) ctx.textAlign = 'left';
		else ctx.textAlign = 'center';
        for (let n = 0; n < arrText.length; n++) {
			var patt1 = new RegExp("\n");
			var result = patt1.test(arrText[n]);
			let testLine = line
			if(!result) testLine += arrText[n];
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
			if(testWidth > maxWidth && n > 0) {
				if(maxLine && textLine == maxLine) {
					flag = true
					// ctx.fillText(line + '...', x, y);
					n = arrText.length
				}else {
					ctx.fillText(line, x, y);
					line = arrText[n];
					y += lineHeight;
					textLine ++
				}
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line + (textLine>1 && flag? '...': ''), isCenter? this.system.w/2: x, y);
        return {x, y, textLine}
    },
    /**
     * @description: 生成居中文本
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatCodeText(ctx,canvasAttr,text,textY,fontSize=14,fillStyle="#ffffff"){
		  ctx.setFontSize(fontSize)
		  ctx.setFillStyle(fillStyle) //文字颜色：默认黑色
		  // let metrics = ctx.measureText(text);
		  // let testWidth = metrics.width;
		  ctx.textAlign = 'center';
		  ctx.fillText(text,this.system.w/2,textY)
		  // 小程序的名称end
    },
	createContentTitle(ctx, canvasAttr, textY) {
		let marTop = 10
		let lineH = 20
		let maxLine = 0
		textY = lineH + marTop + textY
		ctx.setFontSize(14)
		ctx.setFillStyle('#54beff')
		let maxW = this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR
		let {textY:y, textLine} = this.drawText(ctx, canvasAttr.contentTitle, canvasAttr.marginLR+canvasAttr.innerLR, textY, maxW, 18, false)
		ctx.draw(true)
		textY = textY + (textLine - 1)*lineH
		// ctx.fillText(canvasAttr.contentTitle, canvasAttr.marginLR+canvasAttr.innerLR ,textY)
		return {textY, textLine}
	},
	createContentText(ctx, canvasAttr, textY, maxLine) {
		let marTop = 8
		let lineH = 20
		textY = lineH + marTop + textY
		// ctx.setFontSize(20)
		// ctx.setFillStyle('#ffffff')
		// ctx.fillText('“', canvasAttr.marginLR+canvasAttr.innerLR, textY)
		ctx.setFontSize(14)
		ctx.setFillStyle('#54beff')
		let maxW = this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR
		this.drawText(ctx, canvasAttr.contentText, canvasAttr.marginLR+canvasAttr.innerLR, textY, maxW, 22, false, maxLine)
		ctx.draw(true)
		// ctx.fillText(canvasAttr.contentTitle, canvasAttr.marginLR+canvasAttr.innerLR ,textY)
		
	},
	createUserInfo (ctx,canvasAttr, textY) {
		textY += 55
		let x = canvasAttr.marginLR+canvasAttr.innerLR + 70
		ctx.textAlign = 'left';
		let textW = this.createUserText(ctx,canvasAttr, canvasAttr.name, x, textY, 16)
		console.log(canvasAttr)
		this.createUserLabel(ctx,canvasAttr, this.typeToLabel(canvasAttr.label), x+textW+15, textY, 12)
		
		this.createUserText(ctx,canvasAttr, canvasAttr.sub, x, textY + 25, 12, '#54beff')
		
	},
	createUserText(ctx,canvasAttr, text, x, y, fontSize=14,fillStyle="#ffffff") {
		ctx.setFontSize(fontSize)
		ctx.setFillStyle(fillStyle)
		let maxW = this.system.w-x-canvasAttr.marginLR-canvasAttr.innerLR
		this.drawText(ctx, text, x, y, maxW, 18, false, 2)
		ctx.draw(true)
		let metrics = ctx.measureText(text);
		let testWidth = metrics.width;
		// ctx.fillText(text, x, y)
		return testWidth
	},
	typeToLabel(type) {
		if(type == 0) return '记者'
		if(type == 1) return '专家'
		if(type == 2) return '公关'
	},
	createUserLabel(ctx,canvasAttr, text, x, y, fontSize=14,fillStyle="#ffffff") {
		ctx.setFontSize(fontSize)
		ctx.setFillStyle(fillStyle)
		let metrics = ctx.measureText(text);
		let testWidth = metrics.width; 
		this.roundRect(
			ctx, x-8, y-14, testWidth+16, 18, 3, '#5555ff'
		);
		ctx.restore()
		ctx.fillText(text, x, y)
	},
    /**
     * @description: 生成文本（带中间划线的）
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatTextLine(){

    },
    /**
     * @description: 小程序码
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatCode(ctx,canvasAttr,textY){
      const _this = this
      wx.getImageInfo({
        src: canvasAttr.posterCodeUrl,
        success(res) {
          ctx.restore()
          ctx.draw(true)
		  let w = _this.system.w; //-canvasAttr.marginLR*2
          _this.roundRect(
						ctx,
						(w-w*canvasAttr.codeWidth)/2, 
						canvasAttr.marginTB+canvasAttr.innerTB + 0.7*(_this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR)*_this.scale +30 ,
						// textY+canvasAttr.codeMT, 
						_this.system.w*canvasAttr.codeWidth,
						_this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio, 
						(_this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio)*canvasAttr.codeRadius 
					);
          ctx.drawImage(
					res.path,
					(w-w*canvasAttr.codeWidth)/2, 
					canvasAttr.marginTB+canvasAttr.innerTB + 0.7*(_this.system.w-2*canvasAttr.marginLR-2*canvasAttr.innerLR)*_this.scale +30 ,
					// textY+canvasAttr.codeMT, 
					_this.system.w*canvasAttr.codeWidth, 
					_this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio
				)
          ctx.restore()
          ctx.draw(true)
        },
        fail() {
          uni.showToast({ title: "海报生成失败", duration: 2000, icon: "none" })
        }
      })
    },
    /**
     * @description: 小程序码
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    creatSimpleCode(ctx,canvasAttr){
      const _this = this
      wx.getImageInfo({
        src: canvasAttr.posterCodeUrl,
        success(res) {
          ctx.restore()
          ctx.draw(true)
          _this.roundRect(ctx,canvasAttr.marginLR+canvasAttr.codeML, canvasAttr.marginTB+canvasAttr.codeMT, _this.system.w*canvasAttr.codeWidth, _this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio, (_this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio)*canvasAttr.codeRadius );
          ctx.drawImage(res.path, canvasAttr.marginLR+canvasAttr.codeML, canvasAttr.marginTB+canvasAttr.codeMT, _this.system.w*canvasAttr.codeWidth, _this.system.w*canvasAttr.codeWidth*canvasAttr.codeRatio)
          ctx.restore()
          ctx.draw(true)
        },
        fail() {
          uni.showToast({ title: "海报生成失败", duration: 2000, icon: "none" })
        }
      })
    },
    /**
     * @description: 保存到系统相册
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    handleSaveCanvasImage() {
      const canvasAttr=this.attrs
      wx.showLoading({
        title: "保存中..."
      })
      let _this = this
      // 把画布转化成临时文件
      uni.canvasToTempFilePath({
        x: canvasAttr.marginLR+1,
        y: canvasAttr.marginTB+1,
        width: this.system.w-2*canvasAttr.marginLR-8, // 画布的宽
        height: (this.scale*this.system.w)-2*canvasAttr.marginTB-100-2, // 画布的高
        destWidth: (this.system.w-2*canvasAttr.marginLR) * 4,
        destHeight: ((this.scale*this.system.w)-2*canvasAttr.marginTB-100) * 4,
        canvasId: "myCanvas",
		fileType: 'jpg',
        success(res) {
          //保存图片至相册
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading()
              uni.showToast({
                title: "图片保存成功，可以去分享啦~",
                duration: 2000,
                icon: "none"
              })
              _this.handleCanvasCancel()
            },
            fail() {
              uni.showToast({
                title: "保存失败，稍后再试",
                duration: 2000,
                icon: "none"
              })
              wx.hideLoading()
            }
          })
        },
        fail(res) {
          console.log("fail -> res", res)
          uni.showToast({
            title: "保存失败，稍后再试",
            duration: 2000,
            icon: "none"
          })
          wx.hideLoading()
        }
      },this)
    },
    /**
     * @description: 取消海报
     * @param {type} 
     * @return {type} 
     * @author: hch
     */
    handleCanvasCancel() {
      this.canvasShow = false
    },
	toJSON(){},
	async getCodeUrl(){
		let res = await this.$https.get('/Home/Jzbxcx/get_xcx_code', {
			params: {
				url: this.attrs.curPageUrl
			}
		})
		if(res.data.code == 1) {
			this.$set(this.attrs, 'posterCodeUrl', res.data.ewm)
		}
	},

  }
}
</script>

<style lang="scss" coped>
.content {
  text-align: center;
  height: 100%;
}
.canvas-content {
    position: fixed;
	z-index: 100000;
  .canvas-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
  .canvas {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 9;
  }
  .button-wrapper {
    width: 100%;
    height: 72rpx;
    position: fixed;
    bottom: 40rpx;
    display: flex;
    justify-content: space-around;
    z-index: 16;
	padding: 0 40rpx;
  }

  .save-btn {
    font-size: 30rpx;
    line-height: 72rpx;
    color: #fff;
    background: $jzb-theme-color;
    width: 40%;
    height: 100%;
    text-align: center;
    border-radius: 16rpx;
    z-index: 10;
  }
  .cancel-btn{
    background: #fff;
    color: $jzb-theme-color;
  }
  .canvas-close-btn {
    position: fixed;
    width: 60rpx;
    height: 60rpx;
    padding: 20rpx;
    top: 30rpx;
    right: 0;
    z-index: 12;
  }
}
</style>
