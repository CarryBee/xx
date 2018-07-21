const jv = require("./jwtcontrol");
class ParamsBox {

    // 过滤器

    constructor(ctx) {
        this.ctx = ctx;
        return this;
    }

    getCurrentUser() {
        const user = new jv(this.ctx).verify(); // 针对 header token
        return user; // 返回加密内容
    }

    get() {
        let query = this.ctx.query;
        if(!query) throw new Error("ctx.get params is null");
        // { ss: 'ss' }
        return query;
    }
    
    post() {
        if(!this.ctx.request) throw new Error("ctx.post params is null");
        const body = this.ctx.request.body;
        if(!body) throw new Error("ctx.post params is null");
        // { ss: 'ss' }
        return body;
    }

    static routes() {
        return async (ctx, next) => {
            const prb = new ParamsBox(ctx);
            ctx.prb = prb;
            await next();
        }
    }
}
module.exports = ParamsBox;