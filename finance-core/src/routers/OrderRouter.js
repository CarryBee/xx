'use strict'
const Router = require("koa-router");
const ERO = require("../tools/Errorbody");
const HR = require("../tools/handleRes");
const $ = new Router();
const OrderModule = require("../modules/OrderModule");

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


module.exports = $.routes();
