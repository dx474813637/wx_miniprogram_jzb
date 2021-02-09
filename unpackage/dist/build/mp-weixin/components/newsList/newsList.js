(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/newsList/newsList"],{"076e":function(e,n,t){},"64b0":function(e,n,t){"use strict";t.r(n);var u=t("e75a"),o=t("ee03");for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);t("ab69");var r,i=t("f0c5"),l=Object(i["a"])(o["default"],u["b"],u["c"],!1,null,"9e089f06",null,!1,u["a"],r);n["default"]=l.exports},ab69:function(e,n,t){"use strict";var u=t("076e"),o=t.n(u);o.a},e75a:function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return u}));var u={uEmpty:function(){return t.e("uview-ui/components/u-empty/u-empty").then(t.bind(null,"b2e1"))},uLoadmore:function(){return t.e("uview-ui/components/u-loadmore/u-loadmore").then(t.bind(null,"1ffd"))}},o=function(){var e=this,n=e.$createElement;e._self._c},a=[]},ee03:function(e,n,t){"use strict";t.r(n);var u=t("fcd9"),o=t.n(u);for(var a in u)"default"!==a&&function(e){t.d(n,e,(function(){return u[e]}))}(a);n["default"]=o.a},fcd9:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={props:{list:{type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1},endFlag:{type:Boolean,default:!1},titleWeight:{type:Boolean,default:!1}},data:function(){return{loadText:{loadmore:"轻轻上拉",loading:"努力加载中",nomore:"实在没有了"}}},computed:{loadStatus:function(){return this.endFlag?"nomore":this.loading?"loading":"loadmore"}}};n.default=u}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/newsList/newsList-create-component',
    {
        'components/newsList/newsList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("64b0"))
        })
    },
    [['components/newsList/newsList-create-component']]
]);
