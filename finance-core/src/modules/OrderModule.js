const mongoose = require('mongoose');
const {User, Stuff, StuffSnap, Order} = require("../UserdataBaseTool");
const FinanceBaseTool = require("../FinanceBaseTool");
const math = require("mathjs");
math.config({
    number: 'BigNumber',
    precision: 20 
});
class OrderModule {

    constructor(user, stufflist) {
        this.userid = user;
        this.user = mongoose.Types.ObjectId(this.userid); // 会校验
        this.stufflist = stufflist;
        this.stuffsnaplist = [];
    }

    // 设置订单支付状态
    static async setPayOrder(orderid) {
        orderid = mongoose.Types.ObjectId(orderid);
        return await Order.update({_id: orderid}, {$set: {pay: true}}, {new: true});
    }

    // 获取指定未支付的单
    static async getUnpaidOrderByID(orderid) {
        orderid = mongoose.Types.ObjectId(orderid);
        const order = await Order.findOne({_id: orderid});
        if(!order || order.allprice == undefined) throw new Error("找不到该订单号，无法付款");
        if(order.pay) throw new Error("该订单无需重复付款");
        return order;
    }

    // 读取用户拥有的免费额度
    static async getFreemach(userid) {
        const dip = new FinanceBaseTool().getSqlDisposer();
        return await dip(async function(connection) {
            let res = await connection.query('select * from user_ficts where userid = ?;', userid);
            if(res && res[0]) return res[0].freemach;
            else undefined;
        });
    }

    // 通过商品id创建订单
    async createByList() {
        // 检测商品是否存在，并且创建快照
        // 
        let maxfreemach = await OrderModule.getFreemach(this.userid) || 0; // 总的免费的机子数

        this.user = await User.findOne({_id: this.user});
        if(!this.user) throw new Error("用户不存在");

        let freemach = 0; // 免费数
        let allprice = math.bignumber(0);

        const stuffsnaplist = this.stuffsnaplist;
        for(let onestuff of this.stufflist) {
            
            const stuffid = mongoose.Types.ObjectId(onestuff);
            const stuff = await Stuff.findOne({_id: stuffid});

            if(stuff) { // 存在商品
                stuff.actualprice = stuff.price; // 创建实际价格属性
                if(maxfreemach > 0 && maxfreemach <= 10) { // 有免费额度
                    stuff.usefreemach = true;
                    stuff.actualprice = 0; // 创建实际价格属性
                    freemach++; // 次数增加
                }
                // 计算价格
                allprice = math.add(allprice, math.bignumber(stuff.actualprice)); // 实际价格计算
                // 存入快照
                stuffsnaplist.push(await StuffSnap.createSnap(stuff)); // 存起来快照
            } else throw {_id: onestuff, msg:"商品缺货"};
        }

        allprice = math.format(allprice);
        
        const neworder = await Order.create({ // 创建订单
            user: this.user._id,
            snap: this.stuffsnaplist,
            allprice: allprice,
            freemach: freemach
        });
        await neworder.check(); // 校验所有入库格式
        const res = await neworder.save();

        return res;

    }

    
}
module.exports = OrderModule;
