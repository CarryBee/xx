'use strict'
const mongoose = require('mongoose');
const StuffSnapSchema = new mongoose.Schema({
    title: String, // 商品标题
    text: String, // 说明文字
    price: Number, // 价格
    
    publishtime: Date, // 发布时间
    modifytime: Date, // 修改时间

    rate: Number, // 费率
    brand: String, // 厂家品牌中文名字 
    content: [{
        tag: String, // 描述文字
        imgs: String // 标签对应的图片
    }]
});


StuffSnapSchema.statics.updateStuff = function (_id, title, text, price, rate, brand) {
    let id = mongoose.Types.ObjectId(_id);
    const stuff = {modifytime: new Date()}
    if(title) stuff.title = title;
    if(text) stuff.text = text;
    if(price) stuff.price = price;
    if(rate) stuff.rate = rate;
    if(brand) stuff.brand = brand;

    return this.update({_id: id}, {$set: stuff}).exec();
};

StuffSnapSchema.statics.addImg = function (_id, tag, url) {
    const id = mongoose.Types.ObjectId(_id);
    return this.update({_id: id}, {$push:{"content":{tag: tag, imgs: url} }}).exec();
};

StuffSnapSchema.statics.delImg = function (_id, imgid) {
    const id = mongoose.Types.ObjectId(_id);
    return this.update({_id: _id}, {$pull:{"content":{_id: imgid} }}).exec();
};

module.exports = StuffSnapSchema;
