
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
		label: '全部',
		value: ''
	},
	{
		label: '上市',
		value: '1'
	},
	{
		label: '独角兽',
		value: '2'
	},
	{
		label: '千里马',
		value: '3'
	}
]
let hotCities = [
	{
		label: '全部',
		value: '',
	},
	{
		label: '北京',
		value: 'bj',
	},
	{
		label: '上海',
		value: 'sh',
	},
	{
		label: '杭州',
		value: 'hz',
	},
	{
		label: '深圳',
		value: 'sz',
	},
	{
		label: '广州',
		value: 'gz',
	},
]


let sjkInfo = {
	api: '/Index/new_data_json?dataid=11',
	name: '“百强”电商数据库',
	nav: [
			{
				name: 'a104',
				label: '规模',
				icon: 'list',
				value: '独角兽',
				selector:['select', 'single-column']
			},
			{
				name: 'a101',
				label: '分类',
				icon: 'grid',
				value: '',
				selector:['select', 'single-column']
			},
			{
				name: 'hotCity',
				label: '热门城市',
				icon: 'map',
				value: '',
				selector:['select', 'single-column']
			},
		],
}
export { dataField, dataType, hotCities, sjkInfo}
