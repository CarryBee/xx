'use strict'
const compose = require("koa-compose");

// ctx
// mongodb 读取用户信息、计算费率、
// mysql 充值扣费、充值额度返现与标注

// 充值-检测累积充值-分成计算


module.exports = class Loop {

    constructor() {
        this.fns = [];
    }

    set (fn, commit, rollback) {
        this.fns.unshift(fn);
        if(commit) this.commit = commit;
        if(rollback) this.rollback = rollback;
    }

    use (path, fn) {
        // 判断
        if(typeof path === 'string') {
            const dip = async function(ctx, next) {
                if(ctx.path && ctx.path == path)
                    await Promise.resolve(fn(ctx, next)); 
                else
                    await next();
            }
            this.fns.push(dip);
        } else console.log(fn, "use path is wrong");
    }

    setCommit(fn) {
        this.commit = fn;
    }

    setRollback(fn) {
        this.rollback = fn;
    }
    
    run (ctx) {
        
        const fn = compose(this.fns);
        return fn(ctx).then(() => {
            // 判断是否准确性
            // console.log(ctx, "commit");
            
            if(this.commit) this.commit(ctx);
            return Promise.resolve({ok:1, ctx: ctx});
        }).catch(err => {
            // console.log(err, "rollback");
            // ctx.conn.rollback();
            if(this.rollback) this.rollback(ctx);
            return Promise.reject(err);
        });
        
    }

};