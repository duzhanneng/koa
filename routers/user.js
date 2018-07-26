const router = require('koa-router')()
const controller = require('../controller/user')

router.get('/getUser', controller.getUser)
router.get('/getPermission', controller.getPermission)

module.exports = router
