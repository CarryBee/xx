'use strict'
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    title: String

    /*
    用户通过唯一id创建，可以是openid（唯一）或者手机号码（唯一，手机号码不可更换）
    */
});

UserSchema.methods.speak = function () {
  return this._id;
};

UserSchema.statics.findxx = function () {
    return this.findOne({}).exec();
};

UserSchema.statics.createUser = function (userinfo) {
	let 
    return this.findOne({}).exec();
};

module.exports = UserSchema;
