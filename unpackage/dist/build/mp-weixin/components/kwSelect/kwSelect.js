(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/kwSelect/kwSelect"],{"0657":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={props:{keywordsArr:{type:Array,default:function(){return[]}}},data:function(){return{defaultValue:[0],keySelectShow:!1,keyList:[{value:0,label:"其他/自定义"},{value:1,label:"零售电商"},{value:2,label:"产业电商"},{value:3,label:"跨境电商"},{value:4,label:"生活服务电商"},{value:5,label:"金融科技"},{value:6,label:"物流科技"}],disKeyInputShow:!1,keyAddTagBtn:"primary",arr:[],keyAdd:""}},created:function(){this.arr=this.keywordsArr},watch:{keywordsArr:function(e){this.arr=e,10==e.length?this.keyAddTagBtn="info":this.keyAddTagBtn="primary"}},methods:{handleKeySelectChange:function(){10!=this.arr.length?this.keySelectShow=!this.keySelectShow:this.$refs.uToast.show({title:"关注领域至多选择10个",type:"warning ",duration:1500})},handleConfirmEvent:function(e){var t=e[0].value;this.defaultValue=[t],0==t?this.disKeyInputShow=!0:this.isLimit(e[0].label)},handleKeyAddBtn:function(){this.keyAdd&&this.isLimit(this.keyAdd)},isLimit:function(e){-1==this.arr.indexOf(e)?this.handleKeyAdd(e):this.$refs.uToast.show({title:"请勿添加重复关键字",type:"warning ",duration:1500})},handleKeyAdd:function(e){this.$emit("change-kw",e)},handleDeleteKey:function(e){this.$emit("delete-kw",e)}}};t.default=u},"17c4":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return u}));var u={uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"1d38"))},uTag:function(){return n.e("uview-ui/components/u-tag/u-tag").then(n.bind(null,"b136"))},uSelect:function(){return n.e("uview-ui/components/u-select/u-select").then(n.bind(null,"f098"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"d5d3"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"da43"))},uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"916e"))}},i=function(){var e=this,t=e.$createElement;e._self._c},a=[]},5602:function(e,t,n){"use strict";var u=n("efc4"),i=n.n(u);i.a},6162:function(e,t,n){"use strict";n.r(t);var u=n("17c4"),i=n("d6a1");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("5602");var r,o=n("f0c5"),l=Object(o["a"])(i["default"],u["b"],u["c"],!1,null,"2477f819",null,!1,u["a"],r);t["default"]=l.exports},d6a1:function(e,t,n){"use strict";n.r(t);var u=n("0657"),i=n.n(u);for(var a in u)"default"!==a&&function(e){n.d(t,e,(function(){return u[e]}))}(a);t["default"]=i.a},efc4:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/kwSelect/kwSelect-create-component',
    {
        'components/kwSelect/kwSelect-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6162"))
        })
    },
    [['components/kwSelect/kwSelect-create-component']]
]);
