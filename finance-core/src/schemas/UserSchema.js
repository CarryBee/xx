'use strict'
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    unid: String, // 唯一id
    title: String,
    openid: String, // 记录微信的openid
    account: String, // 有账号密码时可以登陆
    password: String,
    nickname: String, // 微信昵称
    headurl: String, // 微信头像
    phone: String,
    upshao: { // 推荐者ID 静态关联，168分成可以动态计算，注册时候关联
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    },
    uppayer: { // 刷卡链上级刷卡者 动态关联，刷卡可以动态计算
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    },
    upproxy: { // 上级代理商 动态关联，提现时候动态计算
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    },
    upproxylist: [{ // 用于各个代理商可以查看成员信息，在更新上级代理时候，触发更新
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    }],
    proxy: { type:Boolean, default:false },
    proxyopera: { type:Boolean, default:false }, // 代理商还是运营中心
    payback: { type:Boolean, default:false }, // 是否返现过
    freemach: Number, // 每个人免费两台机子


    
    
    
    // 累积充值

    /*
    用户通过唯一id创建，可以是openid（唯一）或者手机号码（唯一，手机号码不可更换）
    */
});

UserSchema.methods.speak = function () {
  return this._id;
};

UserSchema.methods.initialize = function () {
	this.title = "openid";
  	return;
};



//绑定账户密码
UserSchema.statics.regaccount = async function (account, password) {
	let res = await this.findOne({account: account}).exec();
	if(!res) return true;
	else return false;
};

UserSchema.statics.findxx = function () {
    return this.findOne({}).exec();
};

UserSchema.statics.createUser = function (userinfo) {
    return this.findOne({}).exec();
};

module.exports = UserSchema;
