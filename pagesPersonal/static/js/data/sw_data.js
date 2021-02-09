
let dataField = [
	// {
	// 	label: '全部',
	// 	value: '全部',
	// 	extra: 0
	// },
	{
		label: '零售电商',
		value: '零售电商',
		extra: 0
	},{
		label: '产业电商',
		value: '产业电商',
		extra: 1
	},{
		label: '跨境电商',
		value: '跨境电商',
		extra: 2
	},{
		label: '生活服务电商',
		value: '生活服务电商',
		extra: 3
	},{
		label: '物流科技',
		value: '物流科技',
		extra: 4
	},
]
let time = [
	{
		label: '2020年',
		value: 2020,
		extra: 0
	},
	{
		label: '2019年',
		value: 2019,
		extra: 1
	},
	{
		label: '2018年',
		value: 2018,
		extra: 2
	}
	
]




let sjkInfo = {
	api: '/Home/Jzbxcx/new_data_json?dataid=9',
	name: '“死亡”电商数据库',
	nav: [
			{
				name: 'shares',
				label: '分类',
				icon: 'grid',
				value: '零售电商',
				selector:['select', 'single-column']
			},
			{
				name: 'area',
				label: '地区',
				icon: 'map',
				value: '',
				selector:['select', 'mutil-column-auto']
			},
			{
				name: 'dtime',
				label: '关停年份',
				icon: 'clock',
				value: '',
				selector:['select', 'single-column']
			}
		],
}
export { dataField, time, sjkInfo}
