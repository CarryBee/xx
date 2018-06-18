'use strict'
// 生成订单时候生成快照并且引用，可供后期查询
const mongoose = require('mongoose');
const stuffSnapSchema = new mongoose.Schema({
    title: String, // 商品标题
    price: Number, // 价格
    text: String, // 说明文字
    mainpic: String, // 主要图片
    publishtime: Date, // 发布时间
    rate: Number, // 费率
    brand: String, // 厂家品牌中文名字 
    content: [{
        tag: String, // 描述文字
        imgs: String // 标签对应的图片
    }],
    createtime: Date // 快照创建时间
});

stuffSnapSchema.methods.speak = function () {
  return this._id;
};

stuffSnapSchema.statics.createSnap = async function (stuff) {
    const stuffsnap = {};
    stuffsnap.title = stuff.title;
    stuffsnap.text = stuff.text;
    stuffsnap.price = stuff.price;
    stuffsnap.rate = stuff.rate;
    stuffsnap.brand = stuff.brand;
    stuffsnap.content = stuff.content; // 图片与文字
    stuffsnap.createtime = new Date();
    return await this.create(stuffsnap);
}

module.exports = stuffSnapSchema;
