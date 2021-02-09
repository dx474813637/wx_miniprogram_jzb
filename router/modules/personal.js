const personal = [
	{
		path: '/pagesPersonal/score/score',
		component: () => import(/* webpackChunkName: "score" */ '@/pagesPersonal/score/score.vue')
	},
	{
		path: '/pagesPersonal/scoreRules/scoreRules',
		component: () => import(/* webpackChunkName: "scoreRules" */ '@/pagesPersonal/scoreRules/scoreRules.vue')
	},
	{
		path: '/pagesPersonal/jd/jd',
		component: () => import(/* webpackChunkName: "jd" */ '@/pagesPersonal/jd/jd.vue')
	},
	{
		path: '/pagesPersonal/cf/cf',
		component: () => import(/* webpackChunkName: "cf" */ '@/pagesPersonal/cf/cf.vue')
	},
	{
		path: '/pagesPersonal/jdDetail/jdDetail',
		component: () => import(/* webpackChunkName: "jdDetail" */ '@/pagesPersonal/jdDetail/jdDetail.vue')
	},
	{
		path: '/pagesPersonal/rzApply/rzApply',
		component: () => import(/* webpackChunkName: "rzApply" */ '@/pagesPersonal/rzApply/rzApply.vue')
	},
	{
		path: '/pagesPersonal/messageList/messageList',
		component: () => import(/* webpackChunkName: "messageList" */ '@/pagesPersonal/messageList/messageList.vue')
	},
	{
		path: '/pagesPersonal/messageDetail/messageDetail',
		component: () => import(/* webpackChunkName: "messageDetail" */ '@/pagesPersonal/messageDetail/messageDetail.vue')
	},
	{
		path: '/pagesPersonal/friendsList/friendsList',
		component: () => import(/* webpackChunkName: "friendsList" */ '@/pagesPersonal/friendsList/friendsList.vue')
	},
	{
		path: '/pagesPersonal/follow/follow',
		component: () => import(/* webpackChunkName: "follow" */ '@/pagesPersonal/follow/follow.vue')
	},
	{
		path: '/pagesPersonal/collection/collection',
		component: () => import(/* webpackChunkName: "collection" */ '@/pagesPersonal/collection/collection.vue')
	},
	{
		path: '/pagesPersonal/update/update',
		component: () => import(/* webpackChunkName: "update" */ '@/pagesPersonal/update/update.vue')
	},
	{
		path: '/pagesPersonal/userHide/userHide',
		component: () => import(/* webpackChunkName: "userHide" */ '@/pagesPersonal/userHide/userHide.vue')
	},
	{
		path: '/pagesPersonal/userAgree/userAgree',
		component: () => import(/* webpackChunkName: "userAgree" */ '@/pagesPersonal/userAgree/userAgree.vue')
	}
	,{
		path: "/pagesPersonal/wxAuthorize/wxAuthorize",
		component: () => import(/* webpackChunkName: "wxAuthorize" */ '@/pagesPersonal/wxAuthorize/wxAuthorize.vue')
	}
	,{
		path : "/pagesPersonal/data/data",
		component: () => import(/* webpackChunkName: "data" */ '@/pagesPersonal/data/data.vue')
	}
	,{
		path : "/pagesPersonal/dataItem/dataItem",
		component: () => import(/* webpackChunkName: "dataItem" */ '@/pagesPersonal/dataItem/dataItem.vue')
	}
	,{
		path : "/pagesPersonal/handbook/handbook",
		component: () => import(/* webpackChunkName: "handbook" */ '@/pagesPersonal/handbook/handbook.vue')
	}
	
]


export default personal