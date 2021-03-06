'use strict'
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const IO = require('koa-socket');
const { UserdataBaseTool } = require("./src/UserdataBaseTool");
const FinanceBaseTool = require("./src/FinanceBaseTool");
const jwt = require("jsonwebtoken");
const jv = require("./src/tools/jwtcontrol");
const session = require("./src/tools/session");
const HR = require('./src/tools/handleRes')
const ParamsBox = require('./src/tools/ParamsBox')
const app = new Koa();
const sock = new IO();
const $ = new Router();


const secret = 'llkaksldfjnn982jdn';
session(app);
sock.attach(app); // socket监听
app.use(bodyParser());
app.use(cors({origin: "*"})); // 完全开放域
/**
  * 统一返回类型：
  * {
  *  code:200,
  *  message: '操作成功',
  *  data: {
  *    loginToken: 'loginToken'
  *  }
  * }
**/

// 统一的处理
// 非业务接口code：{200: 操作成功，404 接口不存在, -1: token 过期或校验失败, '500': '其他错误'}
let handleCode = {'200': '操作成功','404': '接口不存在', '-1': 'token过期或校验失败', '500': '系统异常'}
let handleErrData = (obj) => {
  let resObj = {
    code: obj.code || obj.errCode || '500',
    message: obj.message || obj.errmsg || handleCode[obj.code || obj.errCode] || '系统异常',
    name: obj.name || '',
    data: obj.data || {}
  }
  if (typeof obj === 'string') {
    resObj.message = obj
    return HR(resObj)
  }
  return HR(resObj)
}
let handleErr = async (ctx, next) => {
  let errMsg = '系统异常'
  try {
    await next()
    if (ctx.status !== 200) {
      if (ctx.status === 404) {errMsg = '接口不存在'}
      ctx.body = HR({code: errMsg.code || ctx.status, message: errMsg})
      console.error('Error Url', ctx.originalUrl, JSON.stringify(ctx.body))
    }
  } catch (err) {
    ctx.body = handleErrData(err)
    console.error('Error Url', ctx.originalUrl, JSON.stringify(ctx.body))
  }
  return
}

app.use(handleErr);
app.use(ParamsBox.routes());
// app.use(handleSuccess)

// 授权测试
$.get('/auth', async ctx => {
    let profile = {
        openid: '',
        _id: '58971e9d7661a0069c2ad608'
    };
    ctx.session.views = "ll";
    let token = jwt.sign(profile, secret, { expiresIn: "50h"});
    ctx.body = { token: token };
});

$.get('/success', async ctx => {
	console.log(ctx.session.views);
    try {
        const body = new jv(ctx).verify();
        ctx.body = ERO(0, "授权成功", body);
    }catch (err){
        ctx.body = ERO(401, "授权失败");
    }

});

// 路由
const UserRouter = require("./src/routers/UserRouter");
const StuffRouter = require("./src/routers/StuffRouter");
const OrderRouter = require("./src/routers/OrderRouter");
const QcodeRouter = require("./src/routers/QcodeRouter");
const TenpayRouter = require("./src/routers/TenpayRouter");

$.use('/user', UserRouter);
$.use('/stuff', StuffRouter);
$.use('/order', OrderRouter);
$.use('/qcode', QcodeRouter);
$.use('/tenpay', TenpayRouter);
app.use($.routes());
app.use(serve(`${__dirname}/static`));
(async function(){
  await UserdataBaseTool.start(); // 启动 MongoDB
  await FinanceBaseTool.start(); // 启动 MySQL
  await app.listen(3000, () => { // 启动服务
      console.log("KoaServer started successfully");
	    console.log("server running...");
	});
})();
