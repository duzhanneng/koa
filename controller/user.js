const { user } = require('../db/sqlMap')
const { query } = require('../db/util')

exports.getUser = async ctx => {
  const { username, password } = ctx.query
  const res = await query(user.query, [username, password])
  if (res.length === 1) {
    ctx.cookies.set('koaTest', res[0].id, { expires: new Date(Date.now() + 900000), httpOnly: true })
    ctx.body = {
      resuleCode: 200,
      resultData: null,
      resultMessage: ''
    }
  } else {
    ctx.body = {
      resuleCode: 500,
      resultData: null,
      resultMessage: '账号或密码错误'
    }
    ctx.res.writeHead(500)
  }
}

exports.getPermission = async ctx => {
  ctx.body = {
    resuleCode: 200,
    resultData: 'root',
    resultMessage: ''
  }
}
