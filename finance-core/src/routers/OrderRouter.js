'use strict'
const Router = require("koa-router");
const ERO = require("../tools/Errorbody");
const HR = require("../tools/handleRes");
const $ = new Router();
const OrderModule = require("../modules/OrderModule");
const finRouter = require("../modules/FinRouter");
const Invoice = require("../tools/financebox/Invoice");

const jv = require("../tools/jwtcontrol");


// 创建订单
/*
进入结算页面，把用户选择的商品id数组，或者单个商品id传入。
返回：
{
    "pay": false,   // 是否已经付款
    "snap": [  // 商品的快照，用来显示在结算页面的。如果传入数组，则这个地方也是数组
        {
            "_id": "5b27dc5218b4ff184d833d82", // 商品快照的id
            "title": "title",  // 商品标题
            "text": "text",  // 商品文字描述
            "price": 101.1234,  // 商品标价，如果有真实价格，则可以划线划掉。没优惠券时都显示这个价格
			"actualprice": 0,  // 商品真实价格，两个价格不一样证明用了优惠券，可以标注
			"usefreemach": true, // 是否使用了优惠额度
            "rate": 10,
            "brand": "brand", // 产家
            "content": [ ],  // 显示图片
            "createtime": "2018-06-18T16:22:42.915Z", // 显示创建时间
            "__v": 0
        }
    ],
    "_id": "5b27dc5218b4ff184d833d83",  // 订单id，点击确认支付，支付的时候传入
    "user": "5b2543b9e17d86de098a4821",  // 用户id
    "allprice": 0,  // 需要扣除的整体价格，前端显示要扣的金钱，用了优惠券，变成0
    "freemach": 1,  // 使用的优惠券的张数，前端显示用的额度，消耗1张
    "__v": 0,
    "publishtime": "2018-06-18T16:22:42.932Z"
}
*/

/*
下单失败，缺货时候的返回，一般缺货会出现在商品买单时候商品删除，基本不可能出现

{
    "errCode": 501,
    "errmsg": "商品缺货",
    "name": "创建订单",
    "content": {
        "_id": "5b26980d4f2b66ff144caf9f",
        "msg": "商品缺货"
    }
}
*/
$.get('/addorder', async ctx => {
	try{
		const list = ["5b2698084f2b66ff144caf9b", "5b26980d4f2b66ff144caf9c"];

		const order = new OrderModule("5b2543b9e17d86de098a4821", list);
		const res = await order.createByList();
		ctx.body = ERO(0, "创建订单", res);
    } catch(e) {
		if(e && e._id) {
			ctx.body = ERO(501, "创建订单", "商品缺货", e);
			// {"errCode":501,"errmsg":"商品缺货","name":"创建订单","content":{"_id":"5b26980d4f2b66ff144caf9f","msg":"商品缺货"}}%
		} else {
			ctx.body = ERO(501, "创建订单", "系统错误", e.message);
		}

    }
});

//=========================================================

// 发起支付[订单]与[升级]与[充值]

//=========================================================


/**
 *
 * @param {String} userid 用户名，可以从token来
 * @param {String} orderid 订单预付单的ID
 */
async function payorder(userid, orderid) {
    const order = await OrderModule.getUnpaidOrderByID(orderid); // 获取未支付订单

    let inv = new Invoice();// 校验格式
    inv.userid = userid;
    inv.minus = order.allprice; // 扣费用
    inv.freemach = order.freemach; // 扣额度
    const invoices = [inv]; // 默认只有一单

    await finRouter.run({
        path: "#testrecharge",
        invoices: invoices
    });
    return await OrderModule.setPayOrder(orderid);// 并且标志订单为完成
}
$.get('/payorder', async ctx => {  // (正常模式) 钱包有余额，购物直接扣
    // 根据订单 id 进行事务并对钱包的扣除
    try {
        const userid = "one.userid5";
        const orderid = "5b27e08d1e3410194300f462"; // 订单预付单的ID
        const res = await payorder(userid, orderid);// 并且标志订单为完成
        ctx.body = ERO(0, "支付订单", res);
    } catch(e) {
        ctx.body = ERO(501, "支付订单", "支付失败", e.message);
    }
});

// 无需创建升级单，直接传目标级别过来计算即可
/**
 *
 * 合伙人 5
 * 超级合伙人 6
 * 团队合伙人 7
 * @param {String} userid 用户名，可以从token来
 * @param {String} aimlevel 级别，目标级别
 *
 */
async function payvip(userid, aimlevel) {
    const diff = 12; // 得到差价
    let inv = new Invoice();// 校验格式
    inv.userid = userid;
    inv.minus = diff; // 扣费用
    const invoices = [inv];
    // 根据身份计算价格进行事务并对钱包的扣除
    await finRouter.run({
        path: "#testrecharge",
        invoices: invoices
    });
    // 并且改变用户标志，执行到此证明扣费正常
    return await UserModule.setUserLevel({_id:userid}, aimlevel);
}
$.get('/payvip', async ctx => {  // (正常模式) 钱包有余额，升级直接扣
    try {
        const aimlevel = 3;
        const diff = 12; // 得到差价
        const userid = "one.userid5";

        // 并且改变用户标志，执行到此证明扣费正常
        const res = await payvip(userid, aimlevel);
        ctx.body = ERO(0, "升级账户", res);
    } catch(e) {
        ctx.body = ERO(501, "升级账户", "升级失败", e.message);
    }
});


/**
 *
 * 充值/扣费测试
 */
$.get('/testpay', async ctx => {
    try {
        const invoices = [];
        // 校验格式
        let inv = new Invoice();
        inv.userid = "one.userid5";
        inv.minus = 12.23;
        invoices.push(inv);

        let begin = new Date().getTime();
        const res = await finRouter.run({
            path: "#testrecharge",
            invoices: invoices
        });
        let end = new Date().getTime();
        console.log("花费："+(end-begin)/1000+"秒");
        // console.log(res.ok); // 事务状态
        // ctx.body = res.ok;
        ctx.body = res.ok;
    } catch (e) {
        console.log("err2:", e);
        ctx.body = "xxx";
    }
});

module.exports = $.routes();
