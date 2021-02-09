const open = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
		name: 'index',
        meta: {
	        title: '首页',
	    },
    }
	,{
		path: "/pages/qaDetail/qaDetail",
		component: () => import(/* webpackChunkName: "qaDetail" */ '@/pages/qaDetail/qaDetail.vue')
	}
	,{
		path: "/pages/userList/userList",
		component: () => import(/* webpackChunkName: "userList" */ '@/pages/userList/userList.vue')
	}
	,{
		path: "/pages/homePage/homePage",
		component: () => import(/* webpackChunkName: "homePage" */ '@/pages/homePage/homePage.vue')
	}
	,{
		path: "/pages/news/news",
		component: () => import(/* webpackChunkName: "news" */ '@/pages/news/news.vue')
	}
	,{
		path: "/pages/newsDetail/newsDetail",
		component: () => import(/* webpackChunkName: "newsDetail" */ '@/pages/newsDetail/newsDetail.vue')
	}
	,{
		path: "/pages/personal/personal",
		component: () => import(/* webpackChunkName: "personal" */ '@/pages/personal/personal.vue')
	}
	,{
		path : "/pages/ideaFeed/ideaFeed",
		component: () => import(/* webpackChunkName: "ideaFeed" */ '@/pages/ideaFeed/ideaFeed.vue')
	}
	,{
		path : "/pages/search/search",
		component: () => import(/* webpackChunkName: "search" */ '@/pages/search/search.vue')
	}
	,{
		path : "/pages/searchRes/searchRes",
		component: () => import(/* webpackChunkName: "searchRes" */ '@/pages/searchRes/searchRes.vue')
	}
	,{
		path : "/pages/send/send",
		component: () => import(/* webpackChunkName: "send" */ '@/pages/send/send.vue')
	}
	,{
		path : "/pages/ideaFeed/ideaFeed",
		component: () => import(/* webpackChunkName: "ideaFeed" */ '@/pages/ideaFeed/ideaFeed.vue')
	}
	,{
		path : "/pages/complain/complain",
		component: () => import(/* webpackChunkName: "complain" */ '@/pages/complain/complain.vue')
	}
	,{
		path : "/pages/complainDetail/complainDetail",
		component: () => import(/* webpackChunkName: "complainDetail" */ '@/pages/complainDetail/complainDetail.vue')
	}
	,{
		path : "/pages/scoreTop/scoreTop",
		component: () => import(/* webpackChunkName: "scoreTop" */ '@/pages/scoreTop/scoreTop.vue')
	}
	,{
		path : "/pages/homePageInactive/homePageInactive",
		component: () => import(/* webpackChunkName: "homePageInactive" */ '@/pages/homePageInactive/homePageInactive.vue')
	}
	,{
		path : "/pages/newsSearch/newsSearch",
		component: () => import(/* webpackChunkName: "newsSearch" */ '@/pages/newsSearch/newsSearch.vue')
	}
	
]
export default open