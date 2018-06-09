'use strict'
/*
用户通过唯一id创建，可以是openid（唯一）或者或者账户密码登陆
进入页面时候如果无openid则通过手机登陆，如果有openid则手机登陆时候进行绑定
无openid每次进入都需要手机验证码

有openid则优先创建，进入页面后的手机绑定进行资料增加
无openid则不需要创建，进入页面后通过手机号码创建，手机登陆后自动绑定


用户字段
userid:
openid:(有即可创建，但第一次需要)
mobile:(后面强制绑定，绑定手机找回账户，手机不可解绑)
head:
nickname:
name:
account:{username: password} (方便前端调试)


*/
const mongoose = require('mongoose');
const {User} = require("../DataBaseTool");
class UserModule {

	constructor() {}

	static create(userinfo) {
		return new Promise((resolve, reject) => {
			if(userinfo && userinfo.openid) {
				let user = new User({
					openid: userinfo.openid
				});
				user.initialize(); // 数据初始化
				user.save((err, doc) => {
					if(err) reject(err);
					else resolve(doc);
				});
			} else {
				reject(new Error("非微信进入注册"));
			}
		});
	}

	// 绑定账户密码
	static async bindaccount(userinfo){
		if(userinfo && userinfo.openid && userinfo.account && userinfo.password) {
			let one = await User.findOne({openid: userinfo.openid});
			if(one) {
				let user = new User(one); // 反序列化账户
				user.account = userinfo.account;
				user.password = userinfo.password;
				let res = await User.regaccount(userinfo.account, userinfo.password);
				if(res) {
					user.save();
					return "success";
				} else throw new Error("account 账户已存在");
			} else throw new Error("openid 账户不存在");
		} else throw new Error("openid 账户不存在");
	}

}

module.exports = UserModule;
/*
通过openid获取用户具体信息
通过账户密码获取用户具体信息
*/