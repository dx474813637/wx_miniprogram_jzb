require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesPersonal/rzApply/rzApply"],{"0c04":function(e,t,n){"use strict";var r=n("4065"),i=n.n(r);i.a},4065:function(e,t,n){},6342:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var r={uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"55d8"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"230a"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"1d38"))},uUpload:function(){return n.e("uview-ui/components/u-upload/u-upload").then(n.bind(null,"63f1"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"da43"))},uCheckbox:function(){return n.e("uview-ui/components/u-checkbox/u-checkbox").then(n.bind(null,"7946"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"b288"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"d5d3"))}},i=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"6b38":function(e,t,n){"use strict";n.r(t);var r=n("f227"),i=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=i.a},"8b38":function(e,t,n){"use strict";(function(e){n("ba0c");r(n("66fd"));var t=r(n("dc74"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},dc74:function(e,t,n){"use strict";n.r(t);var r=n("6342"),i=n("6b38");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("0c04");var u,s=n("f0c5"),c=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"bbcb27c8",null,!1,r["a"],u);t["default"]=c.exports},f227:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("a34a")),i=n("2f62");function o(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,i,o,u){try{var s=e[o](u),c=s.value}catch(a){return void n(a)}s.done?t(c):Promise.resolve(c).then(r,i)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function s(e){u(o,r,i,s,c,"next",e)}function c(e){u(o,r,i,s,c,"throw",e)}s(void 0)}))}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(){n.e("components/kwSelect/kwSelect").then(function(){return resolve(n("6162"))}.bind(null,n)).catch(n.oe)},h={data:function(){return{imgUploadAction:"https://www.100ec.cn/Home/Jzbxcx/img_url",httpHeader:this.$store.state.httpHeader,errorType:["message"],xyFlag:!1,content:"空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>",checked:!1,avatarFileList:[],keywordsArr:[],licenseArr:[],licenseFileList:[],form:{type:null,pic:"",name:"",company:"",company_auth:"",title:"",intro:"",field:"",position:"",license:"",email:""},rules:{pic:[{required:!0,trigger:["change"],message:"请上传商务/职业照"}],name:[{required:!0,trigger:["change"],message:"请输入姓名"}],company:[{required:!0,trigger:["change"],message:"输入单位"}],company_auth:[{required:!0,trigger:["change"],message:"输入单位"}],field:[{required:!0,trigger:["change"],message:"添加关注领域"}],position:[{required:!0,trigger:["change"],message:"输入职位"}],title:[{required:!0,trigger:["change"],message:"输入展示头衔"}],license:[{required:!0,trigger:["change"],message:"上传材料"}],email:[{required:!0,trigger:["change"],pattern:/^[\w\.\-]+@[\w\-]+\.([\w\-]+\.){0,1}[a-z]{2,4}$/,message:"输入正确的邮箱地址"}],intro:[{required:!0,min:5,trigger:["change"],message:"简介不能少于5个字"}]}}},onLoad:function(e){this.infoAuthorize.auth_date&&(Object.assign(this.form,this.infoAuthorize),this.keywordsArr=this.infoAuthorize.field.split(","),this.licenseArr=this.infoAuthorize.license.split(","),this.avatarFileList=[{url:this.infoAuthorize.pic}],this.licenseFileList=this.licenseArr.map((function(e){return{url:e}}))),2!=this.infoAuthorize.auth_status&&this.$set(this.form,"type",e.type),0==this.form.type?(this.rules.company_auth="",this.rules.title=""):this.rules.company=""},watch:{keywordsArr:function(e){this.$set(this.form,"field",e.join(","))}},components:{kwSelect:f},computed:a({},(0,i.mapState)(["infoAuthorize"])),methods:{submit:function(){var e=this;this.$refs.uForm.validate((function(t){t?(console.log("验证通过"),e.handleUpAuthor()):console.log("验证失败"),console.log(e.form)}))},handleUpAuthor:function(){var t=this;return s(r.default.mark((function n(){var i,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading({title:"提交中",mask:!0}),n.next=3,t.$https.post("/Home/Jzbxcx/update_user_auth",t.form);case 3:if(i=n.sent,1!=i.data.code){n.next=12;break}return n.next=7,t.$getuserauthinfo();case 7:return e.hideLoading(),n.next=10,e.showModal({title:"提示",content:"提交成功，等待审核！",showCancel:!1});case 10:o=n.sent,o&&e.switchTab({url:"/pages/personal/personal"});case 12:case"end":return n.stop()}}),n)})))()},handleXyFlag:function(){this.xyFlag=!this.xyFlag},handleChangeKw:function(e){this.keywordsArr.push(e)},handleDeleteKw:function(e){this.keywordsArr.splice(e,1)},avatarImgUpChange:function(e){this.$set(this.form,"pic",JSON.parse(e.data).url)},licenseImgUpChange:function(e,t,n){this.$set(this.licenseArr,t,n[t].response.url),this.$set(this.form,"license",this.licenseArr.join(","))},licenseImgRemoveChange:function(e,t){this.licenseArr.splice(e,1),this.$set(this.form,"license",this.licenseArr.join(","))}},onReady:function(){this.$refs.uForm.setRules(this.rules)}};t.default=h}).call(this,n("543d")["default"])}},[["8b38","common/runtime","common/vendor"]]]);