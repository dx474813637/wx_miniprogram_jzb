
let dataField = [
	{
		label: '全部',
		value: '全部',
		extra: 0,
	},{
		label: '零售电商',
		value: '零售电商',
		extra: 1,
	},{
		label: '产业电商',
		value: '产业电商',
		extra: 2,
	},{
		label: '生活服务电商',
		value: '生活服务电商',
		extra: 3,
	},{
		label: '物流科技',
		value: '物流科技',
		extra: 4,
	},{
		label: '金融科技',
		value: '金融科技',
		extra: 5,
	},
]
let dataType = [
	{
		label: '独角兽',
		value: '独角兽',
		extra: 0,
	},
	{
		label: '千里马',
		value: '千里马',
		extra: 1,
	}
]

let sjkInfo = {
	api: '/Index/unicorn_json',
	name: '电商独角兽数据库',
	nav: [
			{
				name: 'chen',
				label: '规模',
				icon: 'list',
				value: '独角兽',
				selector:['select', 'single-column']
			},
			{
				name: 'cate',
				label: '分类',
				icon: 'grid',
				value: '',
				selector:['select', 'single-column']
			},
			{
				name: 'time',
				label: '年份',
				icon: 'calendar',
				value: new Date().getFullYear() + '年',
				selector:['select', 'single-column']
			},
		],
}

export { dataField, dataType, sjkInfo}
