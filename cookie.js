const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

//bodyparser需要提前调用
app.use(bodyparser())

let router = new Router()
router.get('/',async(ctx,next) =>{
    let cookie = ctx.cookies.get('username')
    if(!cookie) {
      let html = `
      <a href="/POST">请注册</a>
      `
      ctx.body = html
    }else {
      let user = cookie
      let html = `
      <div>
      欢淫回来!${user}
      <a href="/exit">退出</a>
      </div>
      `
      ctx.body = html
    }
})

router.get('/POST',async (ctx)=>{
  ctx.body = `
  <h1>输入信息完成注册</h1>
  <form method="POST" action="/login">
  <input name="username" />
  <input name="password" />
  <button type="submit">注册</button>
  <form>
  `
})

let uid = 1
let login = new Router()
login.post('/',async (ctx,next) => {
  ctx.cookies.set('username',ctx.request.body.username)
  ctx.redirect('/')
})

let exit = new Router()
exit.get('/',async(ctx,next)=>{
  ctx.cookies.set('username',null) 
  ctx.redirect('/')
})

//装载所有的子路由
router.use('/login',login.routes(),login.allowedMethods())
router.use('/exit',exit.routes(),exit.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('server is running in 3000')
})