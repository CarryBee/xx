'use strict'
const compose = require("koa-compose");


module.exports = class Loop {

    constructor() {
        this.fns = [];
        this.shift = undefined;
    }

    set (fn, commit, rollback) {
        // this.fns.unshift(fn);
        this.shift = fn;
        if(commit) this.commit = commit;
        if(rollback) this.rollback = rollback;
    }

    use (path, fn) {
        // 判断
        if(typeof path === 'string') {
            const dip = async function(ctx, next) {
                if(ctx.req && ctx.req.path && ctx.req.path == path) {
                    return await Promise.resolve(fn(ctx, next)); 
                } else {
                    return await next();
                }
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

    transfn (ctx, groupfn) { // 绑定上下文
        return async (allctx, next) => {
            // allctx 全局的
            allctx.req = ctx; // 绑定
            ctx.res = await groupfn(allctx);
            allctx.req = undefined; // 注销当前上下文
            return await next(); // 空的, 主调用线
        }
    }
    
    run (ctx) {
        let fn;
        if(Array.isArray(ctx)) {
            const zfns = [];
            const groupfn = compose(this.fns); // use function 整组
            
            for(let one of ctx) {
                if(!one || !one.invoices) throw new TypeError("ctx need invoices");
                zfns.push(this.transfn(one, groupfn)); // 每个组增加
            }
            zfns.unshift(this.shift);
            fn = compose(zfns); ctx = {resp:ctx};
        } else {
            if(!ctx || !ctx.invoices) throw new TypeError("ctx need invoices");
            this.fns.unshift(this.shift);
            fn = compose(this.fns); // 原生
            ctx = {req: ctx, resp:[ctx]};
        }
        
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