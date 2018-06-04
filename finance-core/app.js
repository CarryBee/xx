'use strict'
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const app = new Koa();
const router = new Router();

const {DataBaseTool, Stuff, state} = require("./DataBaseTool");

router.get('/', async ctx => {

	// 序列化
	let one = await Stuff.findxx();
	console.log(one);
	ctx.body = one;

	// 反序列化
	let two = new Stuff(one);
	console.log(one.speak());
	two.save();
	
});
app.use(router.routes());
app.use(serve(`${__dirname}/static`));

(async function(){
	await DataBaseTool.start();
	await app.listen(3000, () => {
	    console.log("Koa Server is running");
	});
})();
