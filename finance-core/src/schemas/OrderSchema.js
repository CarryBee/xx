'use strict'
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    pay: { type:Boolean, default:false },
    user:  { // 用户id 购买者
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    },
    snap:  [{ // 快照id snap = stuff
        type : mongoose.Schema.ObjectId,
        ref : 'StuffSnap' // 关联商品快照
    }],
    allprice: Number,
    publishtime: Date,


});

//
OrderSchema.statics.get = async function () {
    let num = await this.findOneAndUpdate({},{$inc:{key: 1}}, {new:true}).exec();
    if(!num || !num.key) {
        num = await this.create({key: 20000});
        num.key = 20000;
    }
	return num.key;
};

module.exports = OrderSchema;
