const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const historyApiFallback = require('koa2-connect-history-api-fallback')
const json = require('koa-json')
// const static = require('koa-static')
const staticCache = require('koa-static-cache')
const router = require('koa-router')()

const app = new Koa()

app.use(bodyParser())
app.use(json())

app.use(historyApiFallback({
  // verbose: true,
  index: '/'
}))

app.use(staticCache(path.join(__dirname, './dist')), { dynamic: true }, { maxAge: 365 * 24 * 60 * 60 })

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './dist'), {
  extension: 'ejs'
}))

app.use(require('./routers/index').routes())

//全局处理
app.use(async(ctx, next) => {
  if (/getUser/g.test(ctx.request.url)) {
    await next()
  } else {
    if (ctx.cookies.get('koaTest')) {
      await next()
    } else {
      ctx.res.writeHead(401)
    }
  }
})

// 路由
router.use('/api/userController', require('./routers/user').routes())

// 路由挂载
app.use(router.routes())

app.listen(8083)
console.log(`listening on port 8083`)
