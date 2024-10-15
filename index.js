// 获取dom元素
const dom = el => document.querySelector(el)
const province = dom('#province')
const city = dom('#city')
const area = dom('#area')

// 渲染列表
renderSelect(province, datas)
renderSelect(city)
renderSelect(area)

/**
 * 渲染下拉列表
 * @param {element} selct 填充的元素
 * @param {Array} list  渲染的数据 | 数组为空则不填充，默认禁用
 */
function renderSelect(selct, list = []) {
	// 初始化选择提示信息
	const tipName = selct.getAttribute('data-name')
	selct.querySelector('.select-input').innerText = `请选择${tipName}`
	if (!list.length) {
		// 清空禁用项的选择子元素
		selct.querySelector('.options').innerHTML = ''
		selct.classList.add('disabled')
		return
	} else {
		selct.classList.remove('disabled')
	}
	// 将数据挂载到dom元素上
	selct.datas = list
	const ul = selct.querySelector('.options')
	ul.innerHTML = list.map(item => `<li>${item.label}</li>`).join('')
}

// 注册事件
registerEvent(province)
registerEvent(city)
registerEvent(area)
registerProvinceEvnet()
registercityEvnet()

/**
 * 公共模块注册事件
 * @param {element} el 元素
 */
function registerEvent(el) {
	// title 点击事件
	el.querySelector('.title').addEventListener('click', () => {
		// 如果当前选择框处于禁用状态不执行任何操作
		if (el.classList.contains('disabled')) {
			return
		}
		// 获取所有展开的选择框
		const expands = document.querySelectorAll('.select.expand')
		// 隐藏所有展开的选择框
		expands.forEach(item => {
			if (item !== el) {
				item.classList.remove('expand')
			}
		})
		// 给当前点击元素展开选择框
		el.classList.toggle('expand')
	})
	// ul 点击事件
	el.querySelector('.options').addEventListener('click', function (e) {
		// 检测点击事件源名称，判断点击的是否是li标签
		const tagName = e.target.tagName
		if (tagName !== 'LI') return
		// 选中上次添加选中样式的li清除掉
		this.querySelector('li.active') && this.querySelector('li.active').classList.remove('active')
		// 给当前点击的li添加选中样式
		e.target.classList.add('active')
		// 通过选择的li修改title的文本
		el.querySelector('.title .select-input').innerText = e.target.innerText
		// 选中之后折叠
		el.classList.remove('expand')
	})
}

/**
 * 注册省份的点击事件
 */
function registerProvinceEvnet() {
	const ul = province.querySelector('.options')
	ul.addEventListener('click', e => {
		// 获取点击源的值
		if (e.target.tagName !== 'LI') return
		// 获取自定义属性的值
		const li = e.target
		// 根据挂载在dom身上的datas属性获取数据
		const list = province.datas.find(item => item.label === li.innerText).children
		// 渲染列表
		renderSelect(city, list)
		// 点击省份时禁用区域选择器
		renderSelect(area)
	})
}

/**
 * 注册城市的点击事件
 */
function registercityEvnet() {
	const ul = city.querySelector('.options')
	ul.addEventListener('click', e => {
		// 获取点击源的值
		if (e.target.tagName !== 'LI') return
		// 获取自定义属性的值
		const li = e.target
		// 根据挂载在dom身上的datas属性获取数据
		const list = city.datas.find(item => item.label === li.innerText).children
		// 渲染列表
		renderSelect(area, list)
	})
}
