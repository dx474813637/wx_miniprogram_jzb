(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/scoreTop/scoreTop"],{"57d4":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=r(e("a34a")),a=e("6c7e");function r(t){return t&&t.__esModule?t:{default:t}}function i(t,n,e,u,a,r,i){try{var c=t[r](i),o=c.value}catch(s){return void e(s)}c.done?n(o):Promise.resolve(o).then(u,a)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(u,a){var r=t.apply(n,e);function c(t){i(r,u,a,c,o,"next",t)}function o(t){i(r,u,a,c,o,"throw",t)}c(void 0)}))}}var o={mixins:[a.sharePage],data:function(){return{sharePageOpt:{title:"【媒公宝】活跃用户排行榜"},subList:[{name:"周榜",time:7},{name:"月榜",time:30},{name:"总榜",time:""}],tabsList:[{name:"记者",cate:1},{name:"专家",cate:2},{name:"公关",cate:3}],tabsCurrent:1,subCurrent:0,dataList:[]}},onLoad:function(){this.dataInit()},computed:{topData:function(){var t=this.dataList.slice(0,3);if(t.length<3)for(var n=0;3-t.length;n++)t.push({});var e=Array(3);return e[1]=t[0],e[0]=t[1],e[2]=t[2],e}},methods:{tabsChange:function(t){this.tabsCurrent=t,this.dataInit()},subChange:function(t){this.subCurrent=t,this.dataInit()},dataInit:function(){var n=this;return c(u.default.mark((function e(){return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中"}),e.next=3,n.renderList();case 3:t.hideLoading();case 4:case"end":return e.stop()}}),e)})))()},renderList:function(){var t=this;return c(u.default.mark((function n(){var e;return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getData();case 2:e=n.sent,1==e.data.code&&(t.dataList=e.data.list);case 4:case"end":return n.stop()}}),n)})))()},getData:function(){var t=this;return c(u.default.mark((function n(){return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$https.post("/Home/Jzbxcx/top_score",{cate:t.tabsList[t.tabsCurrent].cate,time:t.subList[t.subCurrent].time});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()}}};n.default=o}).call(this,e("543d")["default"])},"61c2":function(t,n,e){"use strict";var u=e("e1b7"),a=e.n(u);a.a},"6f03":function(t,n,e){"use strict";e.r(n);var u=e("57d4"),a=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);n["default"]=a.a},8195:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return u}));var u={uSubsection:function(){return e.e("uview-ui/components/u-subsection/u-subsection").then(e.bind(null,"5676"))},uTabs:function(){return e.e("uview-ui/components/u-tabs/u-tabs").then(e.bind(null,"ac6e"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"230a"))},uImage:function(){return e.e("uview-ui/components/u-image/u-image").then(e.bind(null,"a0e4"))},uLoading:function(){return e.e("uview-ui/components/u-loading/u-loading").then(e.bind(null,"fed5"))}},a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.dataList.slice(3));t.$mp.data=Object.assign({},{$root:{l0:e}})},r=[]},8711:function(t,n,e){"use strict";(function(t){e("ba0c");u(e("66fd"));var n=u(e("8cfd"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"8cfd":function(t,n,e){"use strict";e.r(n);var u=e("8195"),a=e("6f03");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("61c2");var i,c=e("f0c5"),o=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,"0ee1ce4c",null,!1,u["a"],i);n["default"]=o.exports},e1b7:function(t,n,e){}},[["8711","common/runtime","common/vendor"]]]);