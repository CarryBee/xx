'use strict'
const Router = require("koa-router");
const WOauth = require("../tools/WXOauth");
const $ = new Router();

$.get('/bindcode', async ctx => {
	const code = "addfas";
	const userid = "";
	const result = await WOauth.promised(ctx);
	ctx.body = result;
});

module.exports = $.routes();