require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesPersonal/messageDetail/messageDetail"],{"2c01":function(t,n,e){"use strict";var a=e("4809"),r=e.n(a);r.a},"2c3a":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a,r=u(e("a34a"));function u(t){return t&&t.__esModule?t:{default:t}}function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function o(t,n,e,a,r,u,i){try{var o=t[u](i),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(a,r)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(a,r){var u=t.apply(n,e);function i(t){o(u,a,r,i,c,"next",t)}function c(t){o(u,a,r,i,c,"throw",t)}i(void 0)}))}}var s=(a={data:function(){return{list:[],p:1,pFlag:!0,pLoading:!1}},onLoad:function(t){console.log(t),this.index=t.index}},i(a,"onLoad",(function(){this.renderList()})),i(a,"onReachBottom",(function(){this.pFlag&&!this.pLoading&&(this.pLoading=!0,this.p++,this.renderList())})),i(a,"methods",{renderList:function(){var n=this;return c(r.default.mark((function e(){var a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中"}),e.next=3,n.getData();case 3:a=e.sent,1==a.data.code&&(n.list=a.data.list,n.pLoading=!1,n.p==a.data.pages&&(n.pFlag=!1)),t.hideLoading();case 6:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return c(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$https.get("/Home/Jzbxcx/replymessage_list",{params:{p:t.p}});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()},handleToPath:function(n){var e=1==n.cate?0:1;t.navigateTo({url:"/pages/qaDetail/qaDetail?id=".concat(n.rid,"&type=").concat(e)})}}),a);n.default=s}).call(this,e("543d")["default"])},4809:function(t,n,e){},7795:function(t,n,e){"use strict";(function(t){e("ba0c");a(e("66fd"));var n=a(e("d81a"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"7e7d":function(t,n,e){"use strict";e.r(n);var a=e("2c3a"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},a51d:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var a={uButton:function(){return e.e("uview-ui/components/u-button/u-button").then(e.bind(null,"b288"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"230a"))}},r=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.list,(function(n,e){var a=t.__get_orig(n),r=t._f("timeFilter")(n.uptime);return{$orig:a,f0:r}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},u=[]},d81a:function(t,n,e){"use strict";e.r(n);var a=e("a51d"),r=e("7e7d");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("2c01");var i,o=e("f0c5"),c=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"142ca17b",null,!1,a["a"],i);n["default"]=c.exports}},[["7795","common/runtime","common/vendor"]]]);