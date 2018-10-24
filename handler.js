const fs = require('fs')
const path =require('path')
const querystring = require('querystring')
const mime = require('mime')
module.exports = {
  showIndex: (req,res) => {
    readFileData( data =>{
      res.render('index.html', data)
    })
  },
  showDetails: (req,res) => {
    let id = req.query.id
    readFileData(data => {
      obj = data.list.find(item => item.id === +id)
      res.render('details.html', obj)
    })
  },
  showSubmit: (req,res) => {
    res.render('submit.html')
  },
  addGet: (req,res) => {
    let obj = req.query
    obj.id = +new Date()
    readFileData(data => {
      data.list.unshift(obj)
      writeFileData(data, () => {
        res.redirect('/')
      })
    })
  },
  addPost: (req,res) => {
    let result = ''
    req.on('data', data => {
      result += data
    })
    req.on('end', () => {
      let obj = querystring.parse(result)
      obj.id = +new Date()
      readFileData(data => {
        data.list.unshift(obj)
        writeFileData(data, () => {
          res.redirect('/')
        })
      })
    })
  },
  showStatic: (req,res) => {
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) return console.log('读取文件失败', err)
      res.setHeader('content-type', mime.getType(req.url))
      return res.end(data)
    })
  },
  show404: (req,res) => {
    res.statusCode = 404
    res.setHeader('content_type', 'text/html')
    res.end('404,Not Found')
  }
}

//读取文件
function readFileData(callback) {
  let filePath = path.join(__dirname, 'data', 'data.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return console.log('读取文件失败', err)
    data = JSON.parse(data)
    callback(data)
  })
}

//写入文件
function writeFileData(data, callback) {
  fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(data, null, 2), err => {
    if (err) return console.log('写入文件失败', err)
    callback()
  })
}