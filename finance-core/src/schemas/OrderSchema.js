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
    freemach: Number, // 使用了优惠额度
    publishtime: Date, // 创建时间


});

// 本身的格式测试
OrderSchema.methods.check = async function() { // 有问题即终止
    this.pay = false; // 未付款
    this.publishtime = new Date(); // 创建时间，订单时间
    if(!this.user) throw new Error("无法关联购买用户"); // 无法关联到谁买的
    if(!this.snap || this.snap.length < 1) throw new Error("购物车为空"); // 快照为空
    if(this.allprice == undefined) throw new Error("订单失效");   // 无效的价格
    const num = this.allprice.toFixed(2);
    if(num < 0 || num > 10000) throw new Error("价格异常"); // 价格超过边界
    this.allprice = num;
    if(this.freemach == undefined) throw new Error("订单失效");  // 无效的优惠
    if(this.freemach < 0 || this.freemach > 10) throw new Error("额度异常");  // 优惠数超过边界
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
