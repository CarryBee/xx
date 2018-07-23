'use strict'
// 总后台授权登录时候要使用
const Router = require("koa-router");
// const WOauth = require("../tools/WXOauth");
// const QcodeMoudle = require("../modules/QcodeModule");
// const UserModule = require("../modules/UserModule");
const $ = new Router();

// $.get('/bindcode/:code', async ctx => {
// 	try {
// 		if(!ctx.params || !ctx.params.code) throw new Error("code is null");
// 		const result = await WOauth.promised(ctx);
// 		const userinfo = await UserModule.getWXUserInfo(result.openid || "000");
// 		const hashcode = ctx.params.code;
//
// 		const inst = QcodeMoudle.instance();
// 		inst.verity(hashcode, userinfo._id);
// 		console.log(inst.map);
// 		ctx.body = result;
// 	} catch(err) {
// 		console.log("x",err);
// 		if(err && err.toString().indexOf("http") >= 0) ctx.redirect(err); // 跳转
// 		throw err;
// 	}
// });

module.exports = $.routes();
