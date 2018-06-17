'use strict'
// 生成订单时候生成快照并且引用，可供后期查询
const mongoose = require('mongoose');
const stuffSchema = new mongoose.Schema({
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
    }]
});

stuffSchema.methods.speak = function () {
  return this._id;
};

stuffSchema.statics.addImg = function (_id, tag, url) {
    const id = mongoose.Types.ObjectId(_id);
    return this.update({_id: id}, {$push:{"content":{tag: tag, imgs: url} }}).exec();
};

stuffSchema.statics.delImg = function (_id, imgid) {
    const id = mongoose.Types.ObjectId(_id);
    return this.update({_id: _id}, {$pull:{"content":{_id: imgid} }}).exec();
};

module.exports = stuffSchema;
