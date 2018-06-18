'use strict'
const Router = require("koa-router");
const ERO = require("../tools/Errorbody");
const HR = require("../tools/handleRes");
const $ = new Router();
const OrderModule = require("../modules/OrderModule");

const jv = require("../tools/jwtcontrol");

// 创建订单
$.get('/addorder', async ctx => {
	try{
		const list = ["5b26980d4f2b66ff144caf9f","5b2698084f2b66ff144caf9b"];
		
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
