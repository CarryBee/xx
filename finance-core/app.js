'use strict'
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const {DataBaseTool} = require("./src/DataBaseTool");
const jwt = require("jsonwebtoken");
const jv = require("./src/tools/jwtcontrol");
const session = require("./src/tools/session");
const HR = require('./src/tools/handleRes')
const app = new Koa();
const $ = new Router();

const secret = 'llkaksldfjnn982jdn';
session(app);
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
// 路由
const UserRouter = require("./src/routers/UserRouter");
// 统一的处理
let handleErr = async (ctx, next) => {
  let errMsg = '系统异常'
  try {
    await next()
    if (ctx.status !== 200) {
      if (ctx.status === 404) {errMsg = '接口不存在'}
      ctx.body = HR({code: ctx.status, message: errMsg})
    }
  } catch (err) {
    ctx.body = HR({code: ctx.status, message: err.message || errMsg, data: err.data || {}})
  }
  return
}

app.use(handleErr)
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

$.use('/user', UserRouter);
app.use($.routes());
app.use(serve(`${__dirname}/static`));
(async function(){
	await DataBaseTool.start();
	await app.listen(3000, () => {
	    console.log("Koa Server is running");
	});
})();
