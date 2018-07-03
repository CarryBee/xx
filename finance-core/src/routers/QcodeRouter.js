'use strict'
const Router = require("koa-router");
const WOauth = require("../tools/WXOauth");
const QcodeMoudle = require("../modules/QcodeModule");
const $ = new Router();

$.get('/bindcode/:code', async ctx => {
	try { 
		if(!ctx.params || !ctx.params.code) throw new Error("code is null");
		const result = await WOauth.promised(ctx);
		const userinfo = await UserModule.getWXUserInfo(result.openid || "000");
		const hashcode = ctx.params.code;

		const inst = QcodeMoudle.instace();
		inst.verity(hashcode, userinfo._id);
		console.log(inst.map);
		ctx.body = result;
	} catch(err) {
		if(err.indexOf("http") >= 0) ctx.redirect(err); // 跳转
		throw err;
	}
});

module.exports = $.routes();