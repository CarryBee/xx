'use strict'
const mongoose = require('mongoose');
const PhoneSchema = new mongoose.Schema({
    phone: String,
    code: String

});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

PhoneSchema.statics.addCode = async function(phone) {
    const code = getRandomInt(10000, 90000);
    let state = await this.findOneAndUpdate({phone: phone}, {code: code}, {new:true}).exec(); // 更新某个号码的验证码
    if(!state) {
        state = await this.create({phone: phone, code: code});
    }
    return state.code;
}

PhoneSchema.statics.get = async function (phone, code) {
    let num = await this.findOne({phone: phone, code: code}).exec();
    if(num) return true;
	return false;
};

module.exports = PhoneSchema;
