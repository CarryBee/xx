const mongoose = require('mongoose');
const {User, Stuff, StuffSnap, Order} = require("../DataBaseTool");
const math = require("mathjs");
math.config({
    number: 'BigNumber',
    precision: 20 
});
class OrderModule {

    constructor(user, stufflist) {
        this.user = mongoose.Types.ObjectId(user); // 会校验
        this.stufflist = stufflist;
        this.stuffsnaplist = [];
    }

    // 通过商品id创建订单
    async createByList() {
        // 检测商品是否存在，并且创建快照
        // 
        this.user = await User.findOne({_id: this.user});
        if(!this.user) throw new Error("用户不存在");

        let maxfreemach = this.user.freemach || 0; // 总的免费的机子数

        let freemach = 0; // 免费数
        let allprice = math.bignumber(0);

        const stuffsnaplist = this.stuffsnaplist;
        for(let onestuff of this.stufflist) {
            
            const stuffid = mongoose.Types.ObjectId(onestuff);
            const stuff = await Stuff.findOne({_id: stuffid});

            if(stuff) {
                stuff.actualprice = stuff.price; // 创建实际价格属性
                if(maxfreemach > 0 && maxfreemach < 10) { // 有免费额度
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
        
        const neworder = await Order.create({
            user: this.user._id,
            snap: this.stuffsnaplist,
            allprice: allprice,
            freemach: freemach
        });
        await neworder.check(); // 校验
        const res = await neworder.save();
        //res.snap = undefined;

        return res;

    }

    
}
module.exports = OrderModule;
