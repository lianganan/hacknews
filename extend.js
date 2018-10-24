const url = require('url')
const template = require('art-template')
const path = require('path')

// 负责给req和res提供一些通用的方法
// 增强req和res的功能
module.exports = (req,res) => {
  // 已经把地址栏中的参数给解析好了，放到req.query属性上
  req.query = url.parse(req.url,true).query
  // 模板引擎用于渲染页面
  // 在app.js中，给res对象增加了一个方法，render方法
  res.render = function render(page, data) {
    data = data || {}
    let result = template(path.join(__dirname, 'views', page), data)
    res.setHeader('content-type', 'text/html')
    res.end(result)
  }
  //页面重定向
  res.redirect = function (page) {
    res.statusCode = 302
    res.setHeader('Location', page)
    res.end()
  }
}