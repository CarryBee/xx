const mongoose = require('mongoose');
const {User, Stuff, Phone, Machine} = require("../DataBaseTool");
// 关于商品的管理
class StuffModule {

    constructor() {}

    static async list() {
        return await Stuff.find({});
    }

    static async setStuff(params) {
        if(params._id) {
            return await Stuff.updateStuff(params._id, params.title, params.text, params.price, params.rate, params.brand);
        } else {
            if(!params.title) throw new Error("商品名称必填");
            if(!params.price) throw new Error("商品价格必填");
            if(!params.brand) throw new Error("商品品牌必填");
            params.publishtime = new Date();
            const stuff = new Stuff(params);
            return await stuff.save();
        }
    }

    
}
module.exports = StuffModule;
