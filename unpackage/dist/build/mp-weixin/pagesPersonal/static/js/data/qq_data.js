require('../../../common/vendor.js');
let mainTar = [
	{
		label: '中国',
		value: '中国',
		extra: 0
	},
	{
		label: '美国',
		value: '美国',
		extra: 1
	},
	{
		label: '日本',
		value: '日本',
		extra: 2
	},
	{
		label: '德国',
		value: '德国',
		extra: 3
	},
	{
		label: '韩国',
		value: '韩国',
		extra: 4
	},
	{
		label: '英国',
		value: '英国',
		extra: 5
	},
	{
		label: '法国',
		value: '法国',
		extra: 6
	},
	{
		label: '加拿大',
		value: '加拿大',
		extra: 7
	},
	{
		label: '西班牙',
		value: '西班牙',
		extra: 8
	},
	{
		label: '澳大利亚',
		value: '澳大利亚',
		extra: 9
	},
	{
		label: '印度',
		value: '印度',
		extra: 10
	},
	{
		label: '泰国',
		value: '泰国',
		extra: 11
	},
	{
		label: '意大利',
		value: '意大利',
		extra: 12
	},
	{
		label: '丹麦',
		value: '丹麦',
		extra: 13
	},
	{
		label: '瑞士',
		value: '瑞士',
		extra: 14
	},
	{
		label: '荷兰',
		value: '荷兰',
		extra: 15
	},
	{
		label: '俄罗斯',
		value: '俄罗斯',
		extra: 16
	},
	{
		label: '墨西哥',
		value: '墨西哥',
		extra: 17
	},
	{
		label: '比利时',
		value: '比利时',
		extra: 18
	},
	{
		label: '瑞典',
		value: '瑞典',
		extra: 19
	},
	{
		label: '巴西',
		value: '巴西',
		extra: 20
	},
	{
		label: '土耳其',
		value: '土耳其',
		extra: 21
	},
	{
		label: '爱尔兰',
		value: '爱尔兰',
		extra: 22
	},
	{
		label: '奥地利',
		value: '奥地利',
		extra: 23
	},
	{
		label: '乌克兰',
		value: '乌克兰',
		extra: 24
	},
	{
		label: '南非',
		value: '南非',
		extra: 25
	},
	{
		label: '新加坡',
		value: '新加坡',
		extra: 26
	},
	{
		label: '卢森堡',
		value: '卢森堡',
		extra: 27
	},
]


let sjkInfo = {
	api: '/Home/Jzbxcx/new_data_json?dataid=5',
	name: '全球电商数据库',
	nav: [
			{
				name: 'cate',
				label: '国家',
				icon: 'map',
				value: '',
				selector:['select', 'single-column']
			},
			
		],
}
export { mainTar, sjkInfo}
