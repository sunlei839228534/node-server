const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
//koa-bodyparser插件的作用是 处理request中的post数据，然后将他放在ctx(context上下文)中的request对象中的body里

app.use(bodyParser())

app.use(async (ctx)=>{
  let postData = ctx.request.body
  ctx.body = postData
})


app.listen(3000)