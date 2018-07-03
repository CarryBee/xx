'use strict'
const Router = require("koa-router");
const WOauth = require("../tools/WXOauth");
const $ = new Router();

$.get('/bindcode', async ctx => {
	const code = "addfas";
	const userid = "";
	try { 
		const result = await WOauth.promised(ctx);
		ctx.body = result;
	} catch(err) {
		if(err.indexOf("http") >= 0) ctx.redirect(err); // 跳转
		throw err;
	}
});

module.exports = $.routes();