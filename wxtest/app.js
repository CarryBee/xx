'use strict'
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
// const WOauth = require("../finance-core/src/tools/WXOauth");
const session = require("../finance-core/src/tools/session");
const app = new Koa();
const $ = new Router();
const wResponse = require("./weixinResponse");


session(app);

$.get('/user', async ctx => {
	try{
		// const result = await WOauth.promised(ctx);
		// 服务器获取成功
		ctx.body = 'result';
	} catch(err) {
		if(err.indexOf("http") >= 0) ctx.redirect(err); // 跳转
        else ctx.body = err;
	}

});
$.use('/wx', wResponse.routes()); // 路由

app.use($.routes());
app.use(serve(`${__dirname}/static`));
app.listen(8111, () => {
  console.log("Koa Server is running");
});
