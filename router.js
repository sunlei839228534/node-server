const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()


//子路由home
home.get('/', async (ctx) =>{
  let html = `
  <ul>
    <li><a href="/page/helloworld">/page/helloworld</a></li>
    <li><a href="/page/404">/page/404</a></li>
  </ul>
  `
  ctx.body = html
})

//子路由page
let page = new Router()
page.get('/404',async (ctx)=> {
  ctx.body = '404.page!'
})
page.get('/helloworld', async(ctx)=>{
  ctx.body = 'helloworldpage'
})


//装载子组件
let router = new Router()
router.use('/',home.routes(),home.allowedMethods())
router.use('/page',page.routes(), page.allowedMethods())

//加载路由的中间件
app.use(router.routes()).use(router.allowedMethods)

app.listen(3000,() => {
  console.log('server is running in 3000')
})

//koa-router根据url的变化返回相应的页面
//首先创建一个子路由1 home  访问home下面的根路径的时候，会返回相应的html
//子路由2 page 下面有两个路径 当访问page下面的/404页面 会返回404的信息
//创建完这两个子路由后，再创建一个根路由来装载这两个子路由，然后使用app.use来加载根路由