require('../../../common/vendor.js');let dataField = [
	{
		label: '全部',
		value: '全部',
		extra: 0,
		children: [
			{
				label: '全部',
				value: 'all',
				extra: 0
			}
		]
	},
	{
		label: '零售电商',
		value: '零售电商',
		extra: 1,
		children: [
			{
				label: '全部',
				value: '1',
				extra: 0
			},
			{
				label: '跨境电商',
				value: '2',
				extra: 1
			},
			{
				label: '品牌电商',
				value: '8',
				extra: 2
			},
			{
				label: '社交电商',
				value: '10',
				extra: 3
			},
			{
				label: '生鲜电商',
				value: '12',
				extra: 4
			},
			{
				label: '二手电商',
				value: '13',
				extra: 5
			},
			{
				label: '汽车电商',
				value: '14',
				extra: 6
			},
		]
	},
	{
		label: '生活服务电商',
		value: '生活服务电商',
		extra: 2,
		children: [
			{
				label: '全部',
				value: '3',
				extra: 0
			},
			{
				label: '在线旅游',
				value: '9',
				extra: 1
			},
			{
				label: '在线教育',
				value: '11',
				extra: 2
			},
			{
				label: '在线餐饮',
				value: '16',
				extra: 3
			},
			{
				label: '交通出行',
				value: '17',
				extra: 4
			},
			{
				label: '在线票务',
				value: '18',
				extra: 5
			},
			{
				label: '汽车电商',
				value: '14',
				extra: 6
			},
		]
	},
]

let dataTime = [
	// {
	// 	label: '至今',
	// 	value: '',
	// 	extra: 0
	// },
	{
		label: '全年',
		value: 'whole_year',
		extra: 0
	},
	{
		label: '1月',
		value: '1_month',
		extra: 1
	},
	{
		label: '2月',
		value: '2_month',
		extra: 2
	},
	{
		label: '3月',
		value: '3_month',
		extra: 3
	},
	{
		label: '第一季度',
		value: 'first_quarter',
		extra: 4
	},
	{
		label: '4月',
		value: '4_month',
		extra: 5
	},
	{
		label: '5月',
		value: '5_month',
		extra: 6
	},
	{
		label: '6月',
		value: '6_month',
		extra: 7
	},
	{
		label: '第二季度',
		value: 'second_quarter',
		extra: 8
	},
	{
		label: '上半年',
		value: 'first_half',
		extra: 9
	},
	{
		label: '618',
		value: '_618',
		extra: 10
	},
	{
		label: '7月',
		value: '7_month',
		extra: 11
	},
	{
		label: '8月',
		value: '8_month',
		extra: 12
	},
	{
		label: '9月',
		value: '9_month',
		extra: 13
	},
	{
		label: '第三季度',
		value: 'third_quarter',
		extra: 14
	},
	{
		label: '10月',
		value: '10_month',
		extra: 15
	},
	{
		label: '双11',
		value: 'single_day',
		extra: 16
	},
	{
		label: '11月',
		value: '11_month',
		extra: 17
	},
	{
		label: '12月',
		value: '12_month',
		extra: 18
	},
	{
		label: '第四季度',
		value: 'fourth_quarter',
		extra: 19
	},
	
]

let sjkInfo = {
	api: '/Home/Jzbxcx/json_315_post.html',
	name: '电商评级数据库',
	nav: [
			{
				name: 'pjtype',
				label: '领域/行业',
				icon: 'list',
				value: '',
				selector:['select', 'mutil-column-auto']
			},
			{
				name: 'year',
				label: '年份',
				icon: 'calendar',
				value: '2020',
				selector:['select', 'single-column']
			},
			{
				name: 'time',
				label: '时间段',
				icon: 'clock',
				value: '至今',
				selector:['select', 'single-column']
			},
		],
}
export { dataField, dataTime, sjkInfo}
