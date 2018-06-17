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
const {User, Unid} = require("../DataBaseTool");
class UserModule {

	constructor() {}

	// 登录成功获取微信的用户信息
	static async getWXUserInfo(openid) {
		const nowUser = await User.findOne({openid: openid});
		// 筛选
		if(nowUser) return nowUser; // 已注册
		else return undefined;
	}

	// 登录成功获取微信的用户信息
	static async getPhoneUserInfo(phone) {
		const nowUser = await User.findOne({phone: phone});
		console.log("phone", nowUser);
		// 筛选
		if(nowUser) return nowUser; // 已注册
		else return undefined;
	}

	// 通过微信openid进行注册
	static async createUser(userinfo) {

		// 支持额外字段 
		/*
		fatunid 上级id
		nickname 名称
		headurl 头像
		uphone 电话号码
		*/
		if(userinfo && (userinfo.phone || userinfo.openid)) {

			if(userinfo.phone && await UserModule.getPhoneUserInfo(userinfo.phone)) throw new Error("该手机已注册");
		
			if(userinfo.openid && await UserModule.getWXUserInfo(userinfo.openid)) throw new Error("该微信ID已注册");
			
			let user = new User({
				unid: await Unid.get(), // 唯一短id
				openid: userinfo.openid, // 微信id
				phone: userinfo.phone // 手机号码
			});
			
			
			user = await UserModule.findUpShao(user, userinfo);

			// userinfo 每个人的免费机子数
			userinfo.freemach = 2;

			// nickname 默认名字
			user.nickname = userinfo.nickname || '微信用户';

			// headurl 默认头像
			user.headurl = userinfo.headurl;

			return await user.save();
		
		} else {
			throw new Error("非正常渠道进入注册");
		}
	}

	// 设置头像名字
	static async setHeadName(userinfo, name, head) {
		const uid = mongoose.Types.ObjectId(userinfo._id); // 自己的id
		const one = await User.findOne({_id: uid});
		const user = new User(one);
		if(name) user.nickname = name;
		if(head) user.headurl = head;
		return await user.save();
	}

	// 设置自己的上级扫码（扫一扫）成员，推荐人 upshao
	static async findUpShao(user, userinfo) {

		if(user && user.upshao) throw new Error("已接受其他账户邀请");

		if(userinfo && userinfo.uphone && !userinfo.fatunid) { // 通过手机
			const fatherUser = await User.findOne({phone: userinfo.uphone}); // 找上级
			if(fatherUser) {
				user.upshao = fatherUser._id; // 推荐链
				user.uppayer = fatherUser._id; // 刷卡链
			} else throw new Error("推荐人号码不存在");
		}
		

		// upshao 推荐人  uppayer 刷卡分成人
		if(userinfo && userinfo.fatunid) {
			const fatherUser = await User.findOne({unid: userinfo.fatunid}); // 找上级
			if(fatherUser) {
				user.upshao = fatherUser._id; // 推荐链
				user.uppayer = fatherUser._id; // 刷卡链
			} else throw new Error("推荐人邀请码不存在");
		}

		return user;
	}

	static async setUpShao(userinfo) {
		const uid = mongoose.Types.ObjectId(userinfo._id); // 自己的id
		const one = await User.findOne({_id: uid});
		let user = new User(one);
		user = await UserModule.findUpShao(user, userinfo);
		const res = await user.save();
		if(res) return {ok:1};
		else throw new Error("更新失败");
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