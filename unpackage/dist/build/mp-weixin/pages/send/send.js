(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/send/send"],{"368c":function(e,t,n){},"4e1b":function(e,t,n){"use strict";(function(e){n("ba0c");r(n("66fd"));var t=r(n("9211"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6d48":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("a34a")),a=n("2f62"),i=n("5145");function o(e){return e&&e.__esModule?e:{default:e}}function u(e){return f(e)||d(e)||c(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){if(e){if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function d(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function f(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t,n,r,a,i,o){try{var u=e[i](o),s=u.value}catch(c){return void n(c)}u.done?t(s):Promise.resolve(s).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){p(i,r,a,o,u,"next",e)}function u(e){p(i,r,a,o,u,"throw",e)}o(void 0)}))}}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(){n.e("components/sendStepOne/sendStepOne").then(function(){return resolve(n("d02e"))}.bind(null,n)).catch(n.oe)},x=function(){n.e("components/sendStepTwo/sendStepTwo").then(function(){return resolve(n("95f1"))}.bind(null,n)).catch(n.oe)},y=function(){n.e("components/sendStepThree/sendStepThree").then(function(){return resolve(n("ed45"))}.bind(null,n)).catch(n.oe)},k=function(){n.e("components/sendStepFour/sendStepFour").then(function(){return resolve(n("6ce49"))}.bind(null,n)).catch(n.oe)},g={mixins:[i.mixinUpRead],data:function(){return{id:"",current:0,kw:"",userList:[],qData:{},formInfo:{},numList:[{name:"提问题"},{name:"找专家"},{name:"待回复"},{name:"传稿子"}],firstUid:"",isSecond:!1,maxNum:3,uid:0,uidInfo:"",noticeShow:!0}},watch:{keywordsArr:function(e){this.$set(this.form,"keyword",e.join(","))},id:function(e){e&&this.handleEndQ(e)},kw:function(e){e&&this.searchKwUser(e)}},onLoad:function(e){e.id&&(this.id=e.id),e.current&&(this.current=e.current),e.uid&&(this.uid=e.uid,this.getUidInfo())},computed:w({},(0,a.mapState)(["infoAuthorize"])),components:{sendStepOne:v,sendStepTwo:x,sendStepThree:y,sendStepFour:k},methods:{lookQuestion:function(){e.navigateTo({url:"/pagesPersonal/handbook/handbook"})},getUidInfo:function(){var e=this;return h(r.default.mark((function t(){var n,a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$https.get("/Home/Jzbxcx/user_auth_detail",{params:{id:e.uid}});case 2:n=t.sent,a=n.data.list,e.uidInfo={auth_poster:a.poster,pic:a.pic,auth_name:a.name,type:a.type,auth_title:a.title,company:a.company,follow:n.data.follow,auth_intro:a.intro,checked:!0};case 5:case"end":return t.stop()}}),t)})))()},handleEndQ:function(e){var t=this;this.qData.answer=[],this.$https.get("/Home/Jzbxcx/questions_detail?id="+e).then((function(e){t.firstUid||(t.firstUid=e.data.answer.map((function(e){return e.poster})),t.isSecond=!0),t.maxNum=3-e.data.answer_num;var n=e.data.list.end_time.replace(/-/g,"/"),r=Date.parse(new Date(n))-Date.parse(new Date);e.data.list.timeC=r/1e3,t.qData=e.data}))},searchKwUser:function(t){var n=this;return h(r.default.mark((function a(){var i;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n.userList=[],e.showLoading({title:"匹配中..."}),r.next=4,n.searchActivedUser(t);case 4:i=r.sent,n.userList=i,e.hideLoading();case 7:case"end":return r.stop()}}),a)})))()},searchActivedUser:function(e){var t=this;return h(r.default.mark((function n(){var a,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$https.get("/Home/Jzbxcx/keywords_user?keywords="+e);case 2:return a=n.sent,i=t.uid&&t.uidInfo?[t.uidInfo]:[],n.abrupt("return",i.concat.apply(i,u(a.data.list.filter((function(e){return e&&0!=e.type&&2==e.auth_status&&e.auth_poster!=t.uid&&e.auth_poster!=t.$store.state.infoAuthorize.poster&&!t.firstUid.includes(e.auth_poster)})).map((function(e){return e.checked=!1,e})))));case 5:case"end":return n.stop()}}),n)})))()},searchAllUser:function(e,t){var n=this;return h(r.default.mark((function a(){var i;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,n.$https.get("/Home/Jzbxcx/keywords_ku",{params:{cate:e,keywords:t}});case 2:return i=r.sent,r.abrupt("return",i.data.list.filter((function(t){if(t.tel)return t.auth_name=t.name,t.auth_intro=t.description,t.type=e-1||4,t.auth_title="该用户暂未激活",t.pic=t.pic_name1?"https://www.100ec.cn"+t.pic_name1:"https://www.100ec.cn/Public/home/images/icon-rw.png",t.tel})));case 4:case"end":return r.stop()}}),a)})))()},handleChangeStep:function(e,t){var n=this;return h(r.default.mark((function a(){var i,o,u;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t||t.newInvite){r.next=33;break}if(1!=e){r.next=22;break}if(n.formInfo=t.form,0==n.infoAuthorize.type){r.next=8;break}return n.submitViewpoint(),r.abrupt("return");case 8:if(n.formInfo.isMate){r.next=18;break}return n.uid&&(n.formInfo.uid=n.uid),n.firstUid=[n.uid],r.next=13,n.submitQuestion();case 13:if(i=r.sent,i){r.next=16;break}return r.abrupt("return");case 16:n.isSecond=!0,e=n.uid?2:3;case 18:n.formInfo.keywords=t.form.keywords,n.kw=t.form.keywords,r.next=31;break;case 22:if(2!=e){r.next=31;break}return n.formInfo.uid=t.uid,n.firstUid=t.uid.split(","),r.next=27,n.submitQuestion();case 27:if(o=r.sent,o){r.next=30;break}return r.abrupt("return");case 30:n.isSecond=!0;case 31:r.next=34;break;case 33:t&&t.newInvite&&(1==e?(u=n.qData.keywords.map((function(e){return e.keywords})).reduce((function(e,t){return e+","+t})),n.uidInfo="",n.searchKwUser(u)):2==e&&t.uid&&n.newInvite(t.uid));case 34:n.current=e;case 35:case"end":return r.stop()}}),a)})))()},submitQuestion:function(){var t=this;return h(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading({title:"发布中...",mask:!0}),n.next=3,t.$https.post("/Home/Jzbxcx/add_questions",t.formInfo);case 3:if(a=n.sent,e.hideLoading(),1!=a.data.code){n.next=10;break}t.id=a.data.id,e.showToast({title:"发布成功！"}),n.next=13;break;case 10:if(2!=a.data.code){n.next=13;break}return e.showModal({title:"提示",content:"发布错误原因：".concat("已到最大提问数"==a.data.msg?"您同时进行的采访提问已达最大数量，是否跳转至列表处理未结束的采访？":a.data.msg,"，"),success:function(t){t.confirm&&e.navigateTo({url:"/pagesPersonal/cf/cf"})}}),n.abrupt("return",!1);case 13:return e.setStorageSync("indexRefresh",!0),n.abrupt("return",!0);case 15:case"end":return n.stop()}}),n)})))()},newInvite:function(t){var n=this;return h(r.default.mark((function a(){var i,o,s;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.showLoading({title:"发布中...",mask:!0}),r.next=3,n.$https.get("/Home/Jzbxcx/add_questions_answer",{params:{id:n.id,uid:t}});case 3:i=r.sent,e.hideLoading(),1==i.data.code&&(s=t.split(","),n.firstUid=(o=n.firstUid).concat.apply(o,u(s)),n.handleEndQ(n.id),e.showToast({title:"发布成功！"}));case 6:case"end":return r.stop()}}),a)})))()},submitViewpoint:function(){var t=this;return h(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading({title:"发布中...",mask:!0}),n.next=3,t.$https.post("/Home/Jzbxcx/add_viewpoint",t.formInfo);case 3:a=n.sent,e.hideLoading(),1==a.data.code&&(e.showToast({title:"发布成功！"}),t.handleReturnIndex());case 6:case"end":return n.stop()}}),n)})))()},handleReturnIndex:function(){e.setStorageSync("indexRefresh",!0),e.switchTab({url:"/pages/index/index"})}}};t.default=g}).call(this,n("543d")["default"])},"70dd":function(e,t,n){"use strict";var r=n("368c"),a=n.n(r);a.a},9211:function(e,t,n){"use strict";n.r(t);var r=n("a5a0"),a=n("b84a");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("70dd");var o,u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"174a0e7e",null,!1,r["a"],o);t["default"]=s.exports},a5a0:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var r={uNoticeBar:function(){return n.e("uview-ui/components/u-notice-bar/u-notice-bar").then(n.bind(null,"b4de"))},uSteps:function(){return n.e("uview-ui/components/u-steps/u-steps").then(n.bind(null,"21b0"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(e){this.noticeShow=!1})},i=[]},b84a:function(e,t,n){"use strict";n.r(t);var r=n("6d48"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a}},[["4e1b","common/runtime","common/vendor"]]]);