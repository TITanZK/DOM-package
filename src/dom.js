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

  //添加class

  //删除class

  //添加事件监听

  //删除监听事件
}