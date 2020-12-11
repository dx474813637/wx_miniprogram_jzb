
const typeToLabel = v => {
	if(v == 0) return '记者'
	else if(v == 1) return '专家'
	else if(v == 2) return '公关'
	else return '未认证'
}

const timeFilter = v => {
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
    timeFilter
}