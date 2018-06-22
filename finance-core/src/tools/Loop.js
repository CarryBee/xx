'use strict'
const compose = require("koa-compose");
const FinanceBaseTool = require("../FinanceBaseTool");

// ctx
// mongodb 读取用户信息、计算费率、
// mysql 充值扣费、充值额度返现与标注

// 充值-检测累积充值-分成计算


module.exports = class Loop {

    constructor() {
        this.fns = [];
        this.fns.push(this.startTransaction);
    }

    use (fn) {
        this.fns.push(fn);
    }

    async startTransaction (ctx, next) {
        const dip = new FinanceBaseTool().getSqlDisposer();
        await dip(async function(conn) {
            ctx.conn = conn;
            await conn.beginTransaction();
            return;
        })
        await next();
    }
    
    run (ctx) {
        const fn = compose(this.fns);
        return fn(ctx).then(() => {
            // 判断是否准确性
            // console.log(ctx, "commit");
            ctx.conn.commit();
            return Promise.resolve({ok:1, ctx: ctx});
        }).catch(err => {
            // console.log(err, "rollback");
            ctx.conn.rollback();
            return Promise.reject(err);
        });
        
    }

};