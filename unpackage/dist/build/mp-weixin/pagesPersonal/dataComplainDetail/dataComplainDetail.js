require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesPersonal/dataComplainDetail/dataComplainDetail"],{"0ee4":function(t,e,n){"use strict";(function(t){n("ba0c");r(n("66fd"));var e=r(n("94b8"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"1f5b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,r,a,u,o){try{var i=t[u](o),c=i.value}catch(f){return void n(f)}i.done?e(c):Promise.resolve(c).then(r,a)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){u(o,r,a,i,c,"next",t)}function c(t){u(o,r,a,i,c,"throw",t)}i(void 0)}))}}var i={data:function(){return{name:"拼多多"}},onLoad:function(t){t&&t.name&&(this.name=t.name),this.renderList()},methods:{renderList:function(){var t=this;return o(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return o(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$https.post("/Home/Jzbxcx/json_315_post",{f:"website",website:t.name});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()}}};e.default=i},"23a1":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"94b8":function(t,e,n){"use strict";n.r(e);var r=n("23a1"),a=n("9f82");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);var o,i=n("f0c5"),c=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports},"9f82":function(t,e,n){"use strict";n.r(e);var r=n("1f5b"),a=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=a.a}},[["0ee4","common/runtime","common/vendor"]]]);