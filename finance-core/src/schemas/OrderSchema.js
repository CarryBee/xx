'use strict'
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    pay: { type:Boolean, default:false }, // 是否支付
    user:  { // 用户id 购买者
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    },
    snap:  [{ // 快照id snap = stuff
        type : mongoose.Schema.ObjectId,
        ref : 'StuffSnap' // 关联商品快照
    }],
    allprice: Number, // 总付款
    publishtime: Date, // 创建时间


});

// 本身的格式测试
OrderSchema.methods.check = async function() {
    console.log(this);
    this.pay = false; // 未付款
    this.publishtime = new Date(); // 创建时间
    if(!this.user) throw new Error("无法关联购买用户");
    if(!this.snap || this.snap.length < 1) throw new Error("购物车为空");
    if(this.allprice == undefined) throw new Error("价格异常"); 
    const num = this.allprice.toFixed(2);
    if(!num || num < 0 || num > 10000) throw new Error("价格异常"); 
    this.allprice = num;
};

//
/*
OrderSchema.statics.get = async function () {
    let num = await this.findOneAndUpdate({},{$inc:{key: 1}}, {new:true}).exec();
    if(!num || !num.key) {
        num = await this.create({key: 20000});
        num.key = 20000;
    }
	return num.key;
};

*/
module.exports = OrderSchema;
