(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/QAUserProfile/QAUserProfile"],{"262d4":function(e,t,n){},"387a":function(e,t,n){"use strict";var r=n("262d4"),o=n.n(r);o.a},"48d4":function(e,t,n){"use strict";n.r(t);var r=n("83c0"),o=n("cb6a");for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n("387a");var a,c=n("f0c5"),i=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,"f190bc20",null,!1,r["a"],a);t["default"]=i.exports},6685:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("a34a")),o=n("2f62");function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,r,o,u,a){try{var c=e[u](a),i=c.value}catch(l){return void n(l)}c.done?t(i):Promise.resolve(i).then(r,o)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var u=e.apply(t,n);function c(e){a(u,r,o,c,i,"next",e)}function i(e){a(u,r,o,c,i,"throw",e)}c(void 0)}))}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f={props:{userid:{type:Number|String,default:0},avatar:{type:String,default:"https://www.100ec.cn/Public/home/images/icon-rw.png"},name:{type:String,default:"姓名"},label:{type:String,default:"未认证"},sub:{type:String,default:"头衔/公司"},isFollow:{type:Boolean,default:!1},followBtn:{type:Boolean,default:!0},isActived:{type:Boolean,default:!0}},data:function(){return{followStatus:!1}},created:function(){this.followStatus=this.isFollow},watch:{isFollow:function(e){this.followStatus=e}},computed:l(l({},(0,o.mapState)(["phoneReg","infoAuthorize"])),{},{slabel:function(){var e=this.label;return"未认证"==e?"未认证":"0"==e?"记者":"1"==e?"专家":"2"==e?"公关":void 0},userHomePath:function(){return"/pages/homePage/homePage?id=".concat(this.userid)}}),methods:{handleEyeFlag:function(t){var n=this;return c(r.default.mark((function o(){var u;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t){r.next=6;break}return r.next=3,n.cancelFollowUser(n.userid);case 3:u=r.sent,r.next=9;break;case 6:return r.next=8,n.followUser(n.userid);case 8:u=r.sent;case 9:1==u.data.code&&(n.followStatus=!t,e.showToast({title:t?"取消关注":"关注成功",icon:"success",duration:1e3}),setTimeout((function(){n.$emit("follow-event")}),1e3));case 10:case"end":return r.stop()}}),o)})))()},followUser:function(e){var t=this;return c(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$https.get("/Home/Jzbxcx/follow_user",{params:{id:e}});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()},cancelFollowUser:function(e){var t=this;return c(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$https.get("/Home/Jzbxcx/follow_cancel",{params:{id:e}});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()}}};t.default=f}).call(this,n("543d")["default"])},"83c0":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return r}));var r={uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"b288"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.isActived?e._f("typeToLabel")(e.label):null),r=e.isActived?null:e._f("typeToLabel")(e.label);e.$mp.data=Object.assign({},{$root:{f0:n,f1:r}})},u=[]},cb6a:function(e,t,n){"use strict";n.r(t);var r=n("6685"),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/QAUserProfile/QAUserProfile-create-component',
    {
        'components/QAUserProfile/QAUserProfile-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("48d4"))
        })
    },
    [['components/QAUserProfile/QAUserProfile-create-component']]
]);
