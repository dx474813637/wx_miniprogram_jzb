(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-link/u-link"],{"15b1":function(t,e,n){"use strict";n.r(e);var u=n("2985"),i=n("77a4");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("ee62");var r,f=n("f0c5"),o=Object(f["a"])(i["default"],u["b"],u["c"],!1,null,"e94f7372",null,!1,u["a"],r);e["default"]=o.exports},2985:function(t,e,n){"use strict";var u;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"3f94":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-link",props:{color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},underLine:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""}},methods:{openLink:function(){var e=this;t.setClipboardData({data:this.href,success:function(){t.hideToast(),e.$nextTick((function(){e.$u.toast(e.mpTips)}))}})}}};e.default=n}).call(this,n("543d")["default"])},"77a4":function(t,e,n){"use strict";n.r(e);var u=n("3f94"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=i.a},"7e22":function(t,e,n){},ee62:function(t,e,n){"use strict";var u=n("7e22"),i=n.n(u);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-link/u-link-create-component',
    {
        'uview-ui/components/u-link/u-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("15b1"))
        })
    },
    [['uview-ui/components/u-link/u-link-create-component']]
]);
