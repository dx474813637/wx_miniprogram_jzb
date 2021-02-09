let dataCpy = [
	{
		label: '零售电商',
		value: '零售电商',
		extra: 0,
		children: [
			{
				label: '壹玖壹玖',
				value: '壹玖壹玖',
				extra: 0
			},
			{
				label: '康泽药业',
				value: '康泽药业',
				extra: 1
			},
			{
				label: '家电网',
				value: '家电网',
				extra: 2
			},
			{
				label: '酒便利',
				value: '酒便利',
				extra: 3
			},
			{
				label: '猫诚股份',
				value: '猫诚股份',
				extra: 4
			},
			{
				label: '乐汇电商',
				value: '乐汇电商',
				extra: 5
			},
			{
				label: '喜宝动力',
				value: '喜宝动力',
				extra: 6
			},
			{
				label: '昆汀科技',
				value: '昆汀科技',
				extra: 7
			},
			{
				label: '他趣股份',
				value: '他趣股份',
				extra: 8
			},
			{
				label: '优雅电商',
				value: '优雅电商',
				extra: 9
			},
			{
				label: '全网数商',
				value: '全网数商',
				extra: 10
			},
			{
				label: '红酒世界',
				value: '红酒世界',
				extra: 11
			},
			{
				label: '悦为电商',
				value: '悦为电商',
				extra: 12
			},
			{
				label: '春水堂',
				value: '春水堂',
				extra: 13
			},
			{
				label: '唯车电商',
				value: '唯车电商',
				extra: 14
			},
			{
				label: '茶人岭',
				value: '茶人岭',
				extra: 15
			},
			{
				label: '奥斯马特',
				value: '奥斯马特',
				extra: 16
			},
			{
				label: '桃花坞',
				value: '桃花坞',
				extra: 17
			},
			{
				label: '速普电商',
				value: '速普电商',
				extra: 18
			},
		]
	},
	{
		label: '产业电商',
		value: '产业电商',
		extra: 1,
		children: [
			{
				label: '钢银电商',
				value: '钢银电商',
				extra: 0
			},
			{
				label: '钢宝股份',
				value: '钢宝股份',
				extra: 1
			},
			{
				label: '浩德钢圈',
				value: '浩德钢圈',
				extra: 2
			},
			{
				label: '中钢网',
				value: '中钢网',
				extra: 3
			},
			{
				label: '中钢电商',
				value: '中钢电商',
				extra: 4
			},
			{
				label: '报春电商',
				value: '报春电商',
				extra: 5
			},
			{
				label: '锦桥电商',
				value: '锦桥电商',
				extra: 6
			},
			{
				label: '信立方',
				value: '信立方',
				extra: 7
			},
			{
				label: '搜了网络',
				value: '搜了网络',
				extra: 8
			},
			{
				label: '中塑在线',
				value: '中塑在线',
				extra: 9
			},
			{
				label: '讯网网络',
				value: '讯网网络',
				extra: 10
			},
			{
				label: '滨兴科技',
				value: '滨兴科技',
				extra: 11
			},
		]
	},
	{
		label: '生活服务电商',
		value: '生活服务电商',
		extra: 2,
		children: [
			{
				label: '神州优车',
				value: '神州优车',
				extra: 0
			},
			{
				label: '骏途网',
				value: '骏途网',
				extra: 1
			},
			{
				label: '差旅天下',
				value: '差旅天下',
				extra: 2
			},
			{
				label: '虎凤蝶',
				value: '虎凤蝶',
				extra: 3
			},
			{
				label: '留成网',
				value: '留成网',
				extra: 4
			},
			{
				label: '淘车无忧',
				value: '淘车无忧',
				extra: 5
			},
			{
				label: '小马科技',
				value: '小马科技',
				extra: 6
			},
			{
				label: '爱车坊',
				value: '爱车坊',
				extra: 7
			},
		]
	},
	{
		label: '跨境电商',
		value: '跨境电商',
		extra: 3,
		children: [
			{
				label: '世贸通',
				value: '世贸通',
				extra: 0
			},
			{
				label: '渝欧股份',
				value: '渝欧股份',
				extra: 1
			},
			{
				label: '遨森电商',
				value: '遨森电商',
				extra: 2
			},
			{
				label: '宝贝格子',
				value: '宝贝格子',
				extra: 3
			},
			{
				label: '百事泰',
				value: '百事泰',
				extra: 4
			},
			{
				label: '宝信环球',
				value: '宝信环球',
				extra: 5
			},
			{
				label: '理德铭',
				value: '理德铭',
				extra: 6
			},
			{
				label: '跨境翼',
				value: '跨境翼',
				extra: 7
			},
			{
				label: '五五海淘',
				value: '五五海淘',
				extra: 8
			},
			{
				label: '择尚科技',
				value: '择尚科技',
				extra: 9
			},
			{
				label: '淘淘羊',
				value: '淘淘羊',
				extra: 10
			},
			{
				label: '万方网络',
				value: '万方网络',
				extra: 11
			},
		]
	},
]

let sjkInfo = {
	api: '/Home/Jzbxcx/new_data_json?dataid=6',
	name: '新三板电商财报数据库',
	nav: [
			{
				name: 'xsbcpy',
				label: '领域/公司',
				icon: 'list',
				value: '零售电商-壹玖壹玖',
				selector:['select', 'mutil-column-auto']
			},
			
		],
}
export {dataCpy, sjkInfo}