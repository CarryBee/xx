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

const jv = require("../tools/jwtcontrol");

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

$.get('/create', async ctx => {

	ctx.body = await LoginAndRegByOpenid("zxczxczxc2");
});

/*
	主要登录入口
*/
// 通过微信，静默登录注册全流程
async function LoginAndRegByOpenid(openid) {
	try {
		let userinfo = await UserModule.getWXUserInfo(openid);
		if(!userinfo) { // 用户不存在
			userinfo = await UserModule.createUser({
				openid: openid
			});
		}
		const user = {
			userid: userinfo._id
		};
		user.token = jv.sign(user); // JWT签名
		user.unid = userinfo.unid;
		user.openid = userinfo.openid; // 额外绑定
		user.phone = userinfo.phone; // 额外绑定

		return user;
	} catch(e) {
		throw {message: ERO(501, "创建用户", "失败", e.message)};
	}
}

/*
	主要登录入口
*/
// 通过手机，静默登录注册全流程
async function LoginAndRegByPhone(phone) {
	// 以后使用
}

// 更改头像
$.get('/setheadname', async ctx => {
	try {
		let res = await UserModule.setHeadName({
			_id: '5b20013a16515ba2bc86bcc5'
		}, '微信用户', 'bbb');
		ctx.body = ERO(0, "更新头像", res);
	} catch(e) {
		ctx.body = ERO(501, "更新头像", "失败", e.message);
	}
});

// 设置自己的扫码推荐人，刚进入时设置
$.post('/setupshao', async ctx => {

	try {
		console.log(ctx.prb.getCurrentUser());
		let user = await UserModule.setUpShao({
			_id: "5b25444d4fdf2ade722ec3ab",
			fatunid: "20002"
		});
		return ctx.body = user;
	} catch(e) {
		throw {message: ERO(501, "创建用户", "失败", e.message) };
	}
});

/**
 * 通过code获取微信用户信息，用于登录和绑定
 * 成功返回 {loginToken: String}
 * 登录失败返回 微信相关信息
 */
$.get('/loginWithCode', async (ctx, next) => {
  let code = ctx.query.code
  if (!code) {
    throw {message: '没有code参数'}
  }
  try {
    let wxInfo = await wxApi.getUserByCode(code)
    let openId = wxInfo.openId

    let loginRes = await LoginAndRegByOpenid(openId)
    ctx.body = HR({
      data: loginRes
    })
  } catch (err) {
    throw {data: err}
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
