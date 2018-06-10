'use strict'
const Router = require("koa-router");
const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const ERO = require("../tools/Errorbody");
const {Stuff} = require("../DataBaseTool");
const $ = new Router();
const UserModule = require("../modules/UserModule");

$.get('/', async ctx => {

	// 序列化
	let one = await Stuff.findxx();
	console.log(ERO(0, "test", one));
	ctx.body = one;

	// 反序列化
	
	let two = new Stuff(one);
	console.log(JSON.stringify(one.speak()));
	two.save();
});

// 微信正常登陆
$.get('/entry', async ctx => {
	// 读取openid，并且读取用户，一起写入session
	
});

// 创建用户
$.get('/create', async ctx => {
	//读取openid
	try {
		let res = await UserModule.create({});
		ctx.body = ERO(0, "创建用户", res);
	} catch(e) {
		ctx.body = ERO(501, "创建用户", "失败", e.toString());
	}
	
});

// 绑定账户密码到openid
$.get('/bind', async ctx => {
	try {
		let res = await UserModule.bindaccount({
			openid:"bbbbb",
			account:"123",
			password:"123"
		});
		ctx.body = ERO(0, "绑定账户密码到openid", res);
	} catch(e) {
		ctx.body = ERO(501, "绑定账户密码到openid", "失败", e.toString());
	}
	
});

// 绑定账户密码到openid
$.get('/login', async ctx => {
	//不会读取login，通过账户密码写session

	
});

module.exports = $.routes();