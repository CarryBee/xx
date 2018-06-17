'use strict'
const Router = require("koa-router");
const ERO = require("../tools/Errorbody");
const HR = require("../tools/handleRes");
const $ = new Router();
const StuffModule = require("../modules/StuffModule");

const jv = require("../tools/jwtcontrol");

$.get('/upsertstuff', async ctx => {
	
	try {
		let params = {
			_id: "5b2698084f2b66ff144caf9b", // 无id时自动创建，有时更新字段
			title: "title", // 必填
			text: "text",
			price: 100, // 必填
			rate: 10,
			brand: "brand" // 必填
		}
		const res = await StuffModule.setStuff(params);
		ctx.body = ERO(0, "更新或上架商品", res);
	} catch(e) {
		ctx.body = ERO(501, "更新或上架商品", "失败", e.message);
	}
});



module.exports = $.routes();
