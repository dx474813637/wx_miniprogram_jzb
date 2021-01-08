
let mainTar = [
	{
		label: '北京',
		value: '北京',
		extra: 0
	},
	{
		label: '上海',
		value: '上海',
		extra: 1
	},
	{
		label: '广州',
		value: '广州',
		extra: 2
	},
	{
		label: '深圳',
		value: '深圳',
		extra: 3
	},
	{
		label: '杭州',
		value: '杭州',
		extra: 4
	},
	{
		label: '成都',
		value: '成都',
		extra: 5
	},
	{
		label: '宁波',
		value: '宁波',
		extra: 6
	},
	{
		label: '合肥',
		value: '合肥',
		extra: 7
	},
	{
		label: '大连',
		value: '大连',
		extra: 8
	},
	{
		label: '重庆',
		value: '重庆',
		extra: 9
	},
	{
		label: '青岛',
		value: '青岛',
		extra: 10
	},
	{
		label: '天津',
		value: '天津',
		extra: 11
	},
	{
		label: '南京',
		value: '南京',
		extra: 12
	},
	{
		label: '南昌',
		value: '南昌',
		extra: 13
	},
	{
		label: '武汉',
		value: '武汉',
		extra: 14
	},
	{
		label: '昆明',
		value: '昆明',
		extra: 15
	},
	{
		label: '西安',
		value: '西安',
		extra: 16
	},
	{
		label: '兰州',
		value: '兰州',
		extra: 17
	},
	{
		label: '厦门',
		value: '厦门',
		extra: 18
	},
	{
		label: '唐山',
		value: '唐山',
		extra: 19
	},
	{
		label: '无锡',
		value: '无锡',
		extra: 20
	},
	{
		label: '威海',
		value: '威海',
		extra: 21
	},
	{
		label: '东莞',
		value: '东莞',
		extra: 22
	},
	{
		label: '义乌',
		value: '义乌',
		extra: 23
	},
]


let sjkInfo = {
	api: '/Home/Jzbxcx/new_data_json?dataid=10',
	name: '跨境电商综试区数据库',
	nav: [
			{
				name: 'name',
				label: '城市',
				icon: 'map',
				value: '',
				selector:['select', 'single-column']
			},
			
		],
}
export { mainTar, sjkInfo}
