(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesPersonal-follow-follow"],{4903:function(t,e,n){var r=n("ff0e");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("4f06").default;a("bb4b5ca0",r,!0,{sourceMap:!1,shadowMode:!1})},"5e1e":function(t,e,n){"use strict";n.r(e);var r=n("f524"),a=n("c272");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("cc11");var s,o=n("f0c5"),c=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"7039a2a8",null,!1,r["a"],s);e["default"]=c.exports},9184:function(t,e,n){"use strict";var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=r(n("1da1")),i=r(n("48d4")),s={data:function(){return{current:0,navList:[{name:"关注",p:1,flag:!0,loading:!1},{name:"粉丝",p:1,flag:!0,loading:!1}],list:[{name:" ",label:" ",sub:" ",auth_title:" ",company:" "}]}},onLoad:function(t){this.change(t.v||0),this.renderList()},watch:{current:function(t){this.renderList(t)}},components:{QAUserProfile:i.default},onReachBottom:function(){this.navList[this.current].flag&&!this.navList[this.current].loading&&(this.$set(this.navList[this.current],"loading",!0),this.$set(this.navList[this.current],"p",this.navList[this.current].p+1),this.renderList())},methods:{change:function(t){this.current=t},renderList:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,uni.showLoading({title:"加载中...",mask:!0}),e.next=4,t.getData();case 4:n=e.sent,1==n.data.code&&(t.list=n.data.list,t.navList[t.current].p==n.data.pages&&t.$set(t.navList[t.current],"flag",!1)),t.navList[t.current].loading&&t.$set(t.navList[t.current],"loading",!1),uni.hideLoading();case 8:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.list=[],0!=t.current){e.next=7;break}return e.next=4,t.$https.get("/Home/Jzbxcx/follow_list",{params:{p:t.navList[t.current].p}});case 4:return e.abrupt("return",e.sent);case 7:if(1!=t.current){e.next=11;break}return e.next=10,t.$https.get("/Home/Jzbxcx/follow_me_list",{params:{p:t.navList[t.current].p}});case 10:return e.abrupt("return",e.sent);case 11:case"end":return e.stop()}}),e)})))()}}};e.default=s},c272:function(t,e,n){"use strict";n.r(e);var r=n("9184"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},cc11:function(t,e,n){"use strict";var r=n("4903"),a=n.n(r);a.a},f524:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var r={uTabs:n("ac6e").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"tabs-w"},[n("u-tabs",{attrs:{list:t.navList,"is-scroll":!1,current:t.current,"show-bar":!1},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,r){return n("v-uni-view",{key:r,staticClass:"list-item"},[n("q-a-user-profile",{attrs:{userid:0==t.current?e.follow:e.poster,name:e.name,avatar:e.pic,label:e.type,sub:0!=e.type?e.auth_title:e.company,isFollow:!0,followBtn:0==t.current}})],1)})),1)],1)},i=[]},ff0e:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* jzb颜色 */.author-info[data-v-7039a2a8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.author-pic[data-v-7039a2a8]{width:%?50?%;height:%?50?%;border-radius:50%;overflow:hidden}.author-name[data-v-7039a2a8]{color:#000;margin-left:%?10?%}.tabs-w[data-v-7039a2a8]{position:fixed;top:0;left:0;width:100%}.list[data-v-7039a2a8]{padding:%?120?% %?40?% %?40?%;background-color:#fff}.list-item[data-v-7039a2a8]{margin-bottom:%?30?%;border-bottom:%?1?% solid #f8f8f8;padding-bottom:%?40?%}.item-title[data-v-7039a2a8]{background-color:#f8f8f8;padding:%?10?%;line-height:%?50?%;border-radius:%?8?%;color:#666}.item-sub[data-v-7039a2a8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?10?%;color:#999}',""]),t.exports=e}}]);