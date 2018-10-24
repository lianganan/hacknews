const http = require('http')
const extend =require('./extend')
const router = require('./router')

const server = http.createServer()
server.on('request', (req, res) => {

  extend(req,res)
  router(req,res)
})
server.listen(3080, () => {
  console.log('服务器已开启')
})
