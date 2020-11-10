
let dataField = [
	{
		label: '全部',
		value: '',
	},{
		label: '零售电商',
		value: 'lsds',
	},{
		label: '产业电商',
		value: 'b2bds',
	},{
		label: '生活服务电商',
		value: 'shfwds',
	},{
		label: '物流科技',
		value: 'wlkj',
	},{
		label: '金融科技',
		value: 'jrkj',
	},
]
let dataType = [
	{
		label: '独角兽',
		value: '1'
	},
	{
		label: '千里马',
		value: '2'
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
