const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {title: '123123'})
})

module.exports = router
