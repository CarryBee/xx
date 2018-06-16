'use strict'
const Router = require("koa-router");
const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const ERO = require("../tools/Errorbody");
const HR = require("../tools/handleRes");
const {Stuff} = require("../DataBaseTool");
const $ = new Router();
const UserModule = require("../modules/UserModule");
const OAuth = require('co-wechat-oauth');
const wxApi = new OAuth('wx6f8322dd012ed875', 'd76c5dd2f636241c6ecc99806e1943c3');

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

	// 通过 weixinOacth 获得 weixindata
	let weixindata = {
		openid: "kskdidisss",
		nickname: "微信用户",
		head: "http://微信头像"
	} // 服务器获得

	try {
		let userinfo = UserModule.getWXUserInfo(weixindata.openid);
		if(userinfo) { // 用户存在
			ctx.session.openid = weixindata.openid; // 记录用户openid， 方便直接读取无需授权
			ctx.session.userinfo = userinfo; // 将用户信息进行记录
			ctx.body = userinfo; // 直接输出
		} else {
			// 用户不存在，进行注册
			let res = await UserModule.createUser({
				openid: weixindata.openid,
				unid: "20000", // 上一级独立id，从二维码链接获得
				nickname: undefined,
				headurl: undefined
			});
			ctx.session.openid = weixindata.openid; // 记录用户openid， 方便直接读取无需授权
			ctx.session.userinfo = res; // 将用户信息进行记录
			ctx.body = ERO(0, "创建用户", res);
		}
	} catch(e) {
		ctx.body = ERO(501, "创建用户", "失败", e.toString());
	}
});

// 创建用户
$.get('/create', async ctx => {
	//读取openid
	try {
		let res = await UserModule.createUser({
			openid: 'xxxccxxx'
		});
		ctx.body = ERO(0, "创建用户", res);
	} catch(e) {
		console.log(e);
		ctx.body = ERO(501, "创建用户", "失败", e.toString());
	}
});

// 更改头像
$.get('/setheadname', async ctx => {
	try {
		let res = await UserModule.setHeadName({
			_id: '5b20013a16515ba2bc86bcc5'
		}, '微信用户', 'bbb');
		ctx.body = ERO(0, "更新头像", res);
	} catch(e) {
		ctx.body = ERO(501, "更新头像", "失败", e.toString());
	}
});

/**
 * 通过code获取微信用户信息，用于登录和绑定
 * 成功返回 {loginToken: String}
 * 登录失败返回 微信相关信息
 */
$.get('/loginWithCode/:code', async (ctx, next) => {
  let code = ctx.params.code
  if (!code) {
    throw {message: '没有code参数'}
  }
  try {
    let wxInfo = await wxApi.getUserByCode(code)
    let openId = wxInfo.openId
    // TODO: 使用openId登录
    // 登录失败 返回OpenID等相关信息
    ctx.body = HR({
      data: wxInfo
    })
  } catch (err) {
    throw {message: err}
  }
})

$.get('/wx/getUserByCode/:code', async ctx => {
  let code = ctx.request.query
  console.log('code', code)
  try {
    let res = await wxApi.getUserByCode(code)
    ctx.body = HR({
      data: {
        res
      }
    })
  } catch (err) {
    throw {message: err}
  }

})

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
