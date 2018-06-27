'use strict'
const compose = require("koa-compose");


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

        if(!ctx || !ctx.invoices) throw new Error("ctx need invoices");

        const fn = compose(this.fns);
        return fn(ctx).then(() => {
            // console.log(ctx, "commit");
            if(this.commit) this.commit(ctx);
            return Promise.resolve({ok:1, ctx: ctx});
        }).catch(err => {
            // ctx.conn.rollback();
            if(this.rollback) this.rollback(err, ctx);
            return Promise.reject(err);
        });
        
    }

};