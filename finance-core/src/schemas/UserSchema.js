'use strict'
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    title: String,
    openid: String,
    account: String,
    password: String

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
