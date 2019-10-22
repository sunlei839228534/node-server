const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
//form数据以流的方式传输给后端服务，所以需要监听data 和 end这两个事件
//在数据流结束后，触发end事件，随后把结果result通过parseQueryStr这个函数解析成JSON 最终resolve出去

app.use(bodyParser())

app.use(async (ctx)=>{
  let postData = ctx.request.body
  ctx.body = postData
})


app.listen(3000)