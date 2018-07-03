'use strict'
const Router = require("koa-router");
const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const ERO = require("../tools/Errorbody");
const HR = require("../tools/handleRes");
const {Stuff, Machine} = require("../UserdataBaseTool");
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

/**
 * 
 * 主要登录入口，带注册
 * 
*/
// 通过微信，静默登录注册全流程
async function LoginAndRegByOpenid(openid) {
	try {
		let userinfo = await UserModule.getWXUserInfo(openid);
		if(!userinfo) { // 用户不存在, 可以 openid 与 电话号码注册
			userinfo = await UserModule.createUser({
				openid: openid
			});
		}
		const user = {
			userid: userinfo._id,
			level: userinfo.level // 用户等级
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

/**
 * 
 * 主要登录入口，带注册
 * 
*/
// 通过手机，静默登录注册全流程
async function LoginAndRegByPhone(phone) {
	// 以后使用
}

/**
 * 
 *  主要登录入口，不带注册
 * 
 */
async function LoginByQRCode(scancode) {
	// 检测到二维码关联的账户，并且读取进行登录
}

$.get('/loginbycode', async ctx => {
	
});

// 更改头像
$.post('/setheadname', async ctx => {
	try {
		let res = await UserModule.setHeadName({
			_id: '5b20013a16515ba2bc86bcc5'
		}, '微信用户', 'http://header');
		ctx.body = ERO(0, "更新头像", res);
	} catch(e) {
		ctx.body = ERO(501, "更新头像", "失败", e.message);
	}
});

// 设置自己的扫码推荐人，刚进入时设置
$.post('/setupshao', async ctx => {
	try {
		let user = await UserModule.setUpShao({
			_id: "5b25444d4fdf2ade722ec3ab",
			fatunid: "20002", // 电话号码绑定和短id绑定两个选一个
			uphone: undefined // 电话号码绑定和短id绑定两个选一个
		});
		return ctx.body = ERO(0, "更新上级", user);
	} catch(e) {
		throw {message: ERO(501, "更新上级", "失败", e.message) };
	}
});

// 发生验证码
$.post('/getphonecode', async ctx => {
	try {
		let res = await UserModule.sendCode({
			_id:"bbbbb",
			phone:"123"
		});
		ctx.body = ERO(0, "发生验证码", res);
	} catch(e) {
		ctx.body = ERO(501, "发生验证码", "失败", e.message);
	}
});

// 绑定手机号码到_id 校验验证码
$.post('/bindphone', async ctx => {
	try {

		let res = await UserModule.bindPhone({
			_id: "5b25444d4fdf2ade722ec3ab",
			phone:"123",
			code: "86086"
		});
		ctx.body = ERO(0, "绑定账户手机号码", res);
	} catch(e) {
		ctx.body = ERO(501, "绑定账户手机号码", "失败", e.message);
	}

});

// 绑定机器
$.get('/bindmachine', async ctx => {
	//
	try {
		let res = await UserModule.setMachine({
			_id: "5b25444d4fdf2ade722ec3ab",
			snap:"5b25444d4fdf2ade722ec3ab", // 订单列表可以拿到该参数
			code: "86086"
		});
		ctx.body = ERO(0, "绑定机器码", res);
	} catch(e) {
		ctx.body = ERO(501, "绑定机器码", "失败", e.toString());
	}
});

/**
 * 通过code获取微信用户信息，用于登录和绑定
 * 成功返回 {loginToken: String}
 * 登录失败返回 微信相关信息
 */
$.get('/loginWithCode', async (ctx, next) => {
  console.log('loginWithCode', ctx.query.code)
  let code = ctx.query.code
  if (!code) {
    throw {message: '没有code参数'}
  }
  try {
    let wxInfo = await wxApi.getUserByCode(code)
    let openId = wxInfo.openid
    console.log('wxInfo' , code, wxInfo)
    let loginRes = await LoginAndRegByOpenid(openId)
    ctx.body = HR({
      data: loginRes
    })
  } catch (err) {
    console.error(err)
    throw {message: '登陆失败' ,data: err}
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

// 绑定账户密码到_id
$.post('/bind', async ctx => {
	try {
		let res = await UserModule.bindAccount({
			_id:"bbbbb",
			account:"123",
			password:"123"
		});
		ctx.body = ERO(0, "绑定账户密码到openid", res);
	} catch(e) {
		ctx.body = ERO(501, "绑定账户密码到openid", "失败", e.message);
	}

});

// 绑定账户密码到openid
$.post('/login', async ctx => {
	//不会读取login，通过账户密码写session
});

module.exports = $.routes();
