require('../../../common/vendor.js');
let dataField = [
	// {
	// 	label: '全部',
	// 	value: '全部',
	// 	extra: 0,
	// },
	{
		label: '零售电商',
		value: '零售电商',
		extra: 0,
	},{
		label: '产业电商',
		value: '产业电商',
		extra: 1,
	},{
		label: '生活服务电商',
		value: '生活服务电商',
		extra: 2,
	},{
		label: '物流科技',
		value: '物流科技',
		extra: 3,
	},{
		label: '金融科技',
		value: '金融科技',
		extra: 4,
	},
]
let dataType = [
	{
		label: '全部',
		value: '全部',
		extra: 0,
	},
	{
		label: '上市',
		value: '上市',
		extra: 1,
	},
	{
		label: '独角兽',
		value: '独角兽',
		extra: 2,
	},
	{
		label: '千里马',
		value: '千里马',
		extra: 3,
	}
]
let hotCities = [
	{
		label: '全部',
		value: '全部',
		extra: 0,
	},
	{
		label: '北京',
		value: '北京',
		extra: 1,
	},
	{
		label: '上海',
		value: '上海',
		extra: 2,
	},
	{
		label: '杭州',
		value: '杭州',
		extra: 3,
	},
	{
		label: '深圳',
		value: '深圳',
		extra: 4,
	},
	{
		label: '广州',
		value: '广州',
		extra: 5,
	},
]


let sjkInfo = {
	api: '/Home/Jzbxcx/new_data_json?dataid=11',
	name: '“百强”电商数据库',
	nav: [
			{
				name: 'a104',
				label: '规模',
				icon: 'list',
				value: '',
				selector:['select', 'single-column']
			},
			{
				name: 'a101',
				label: '分类',
				icon: 'grid',
				value: '零售电商',
				selector:['select', 'single-column']
			},
			{
				name: 'a103',
				label: '热门城市',
				icon: 'map',
				value: '',
				selector:['select', 'single-column']
			},
		],
}
export { dataField, dataType, hotCities, sjkInfo}
