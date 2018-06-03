'use strict'
const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const app = new Koa();
const router = new Router();

const { DataBaseTool, Stuff } = require("./DataBaseTool");

router.get('/', async ctx => {
	let nw = new Stuff({"title":"xx"});
	nw.save();
	
	let one = await Stuff.findxx();
	ctx.body = one;
});
app.use(router.routes());
app.use(serve(`${__dirname}/static`));

(async function(){
	await DataBaseTool.start();
	await app.listen(3000, () => {
	    console.log("Koa Server is running");
	});
})();
