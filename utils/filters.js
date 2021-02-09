//type => 认证身份
const typeToLabel = v => {
	if(v == 0) return '记者'
	else if(v == 1) return '专家'
	else if(v == 2) return '公关'
	else return '未认证'
}


//电诉宝state状态转化
const dsbStatusToLabel = v => {
	if(v == 1) return '未审核'
	else if(v == 2) return '已移交'
	else if(v == 3) return '已受理'
	else if(v == 4)  return '已评价'
	else if(v == 5)  return '受理无效'
}

//对联系数字字母组合的信息打码
const personalInfoFilter = v => {
	if(!v) return v
	return v.replace(/([0-9]{10,})/g, function(str) {
		return str.slice(0, 3) + ("*").repeat(str.length - 7) + str.slice(-4)
	})
}

//电诉宝评级等级转化
const dsbPjToLevel = v => {
	if(v == 'bad') return '不满意'
	else if(v == 'pleased') return '满意'
	else if(v == 'perfect') return '非常满意'
	else if(v == 'common') return '一般'
}

//不活跃用户简介内容过滤
const inactiveUserInfo = v => {
	return v.replace(/&lt;.+?&gt;/g, str => {
		if(str.includes('/p')) {
			return "\n"
		}
		return ""
	})
	.replace(/&amp;nbsp;/g, '')
}

//时间格式
const timeFilter = v => {
	if(!v) return null
	let dateArr = v.split(' ')[0].split('-')
	let timeArr = v.split(' ')[1].split(':')
	let arr = [...dateArr, ...timeArr]
	arr = arr.map(ele => +ele)
	// console.log(arr)
	let now = new Date().toLocaleString()
	let nowArr1 = now.split(' ')[0].split('/')
	let nowArr2 = now.split(' ')[1].slice(2).split(':')
	let nowArr = [...nowArr1, ...nowArr2]
	nowArr = nowArr.map(ele => +ele)
	if(now.indexOf('下午') != -1) {
		nowArr[3] = nowArr[3] + 12
	}
	// console.log(nowArr)
	
	if(nowArr[0] == arr[0] && nowArr[1] == arr[1] && nowArr[2] - arr[2] <= 1) {
		if(nowArr[2] == arr[2]) {
			if(nowArr[3] == arr[3]) {
				return nowArr[4] - arr[4] + 1 + '分钟前'
			}
			else if(nowArr[4] < arr[4] && nowArr[3] - arr[3] == 1){
				return nowArr[4] - arr[4] + 61 + '分钟前'
			}
			return nowArr[3] - arr[3] + '小时前'
			
		}else if(nowArr[2] - arr[2] == 1 && nowArr[3] - arr[3] < 0) {
			return (+nowArr[3]) - (+arr[3]) + 24 + '小时前'
		}else {
			return v.split(' ')[0].slice(5)
		}
	}
	if(nowArr[0] != arr[0]) {
		return v.split(' ')[0]
	}
	return v.split(' ')[0].slice(5)
}

module.exports = {
    typeToLabel,
    timeFilter,
	dsbStatusToLabel,
	dsbPjToLevel,
	personalInfoFilter,
	inactiveUserInfo
}