const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

let router = new Router()

router.get('/',async(ctx,next) =>{
  let url = ctx.url
  let method = ctx.method
  if(url === '/' && method === 'GET' ) {
    let cookie = ctx.cookies.get('uid')
    if(!cookie) {
      let html = `
      <a href="/login">请登陆</a>
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
  }
})

let uid = 1
let login = new Router()
login.get('/',async (ctx,next) => {
  ctx.cookies.set('uid',uid++)
  ctx.redirect('/')
})

let exit = new Router()
exit.get('/',async(ctx,next)=>{
  ctx.cookies.set('uid',null) 
  ctx.redirect('/')
})

//装载所有的子路由
router.use('/login',login.routes(),login.allowedMethods())
router.use('/exit',exit.routes(),exit.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('server is running in 3000')
})