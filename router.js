const handler = require('./handler')

module.exports = (req,res) => {

  if (req.url === '/' || req.url === '/index') {
    handler.showIndex(req, res)
  }
  else if (req.url.startsWith('/details')) {
    handler.showDetails(req, res)

  }
  else if (req.url === '/submit') {
    handler.showSubmit(req, res)
  }
  else if (req.url.startsWith('/assets')) {
    handler.showStatic(req, res)
  }
  else if (req.url.startsWith('/add') && req.method === "GET") {
    handler.addGet(req, res)
  }
  else if (req.url.startsWith('/add') && req.method === "POST") {
    handler.addPost(req,res)
  }
  else {
    handler.show404(req,res)
  }

}