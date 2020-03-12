const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 2* 60 })
function UrlFromRequest(req) {
  const url = req.protocol + '://' + req.headers.host + req.originalUrl
  return url
}
function s(req, res, next) {
  const url = UrlFromRequest(req)
  cache.set(url, res.locals.data)
  return next()
}
function g(req, res, next) {
  const url = UrlFromRequest(req)
  const content = cache.get(url)
  if (content) {
    return res.status(200).send(content)
  }
  return next()
}

module.exports = { g,s }
