// 测试
const div = dom.create('<div>newDiv</div>')
console.log(div)
dom.after(test, div)

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

const node = dom.empty(window.empty)
console.log(node)

dom.text(test, '你好，这是新内容')
console.log(dom.text(test))