window.dom = {
  // 创建节点(可以多节点，<template>可容纳任意标签)
  create(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    return container.content.firstChild
  },

  // 用于新增弟弟
  after(node, node1) {
    node.parentNode.insertBefore(node1, node.nextSibling)
  },

  // 用于新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },

  // 新增儿子
  append(parent, node) {
    parent.appendChild(node)
  },

  //新增爸爸
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },

  //删除节点
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },

  // 删除后代
  empty(node) {
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },

  //读写属性
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },

  //读写文本内容,兼容IE
  text(node, string) {//适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerHTML = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerHTML
      } else {
        return node.textContent
      }
    }
  },

  //读写HTML内容
  html(node, string) {//适配
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },

  //修改style
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div, 'color', 'red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      //dom.style(div, 'color')
      if (typeof name === 'string') {
        return node.style[name]
      } else if (name instanceof Object) {
        //dom.style(div,{color: 'red'})
        const object = name
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },

  //添加class,删除class
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },

  //添加事件监听
  on(node, eventName, fn) {
    return node.addEventListener(eventName, fn)
  },

  //删除监听事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },

  //获取标签或元素
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },

  //获取父元素
  parent(node) {
    return node.parentNode
  },

  //获取子元素
  children(node) {
    return node.children
  },

  //获取兄弟姐妹元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },

  //获取弟弟
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },

  //获取哥哥
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },

  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },

  //获取排行老几
  index(node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  },
}