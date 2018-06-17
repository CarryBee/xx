const jv = require("./jwtcontrol");
class ParamsBox {

    // 过滤器

    constructor(ctx) {
		this.ctx = ctx;
    }

    getCurrentUser() {
        const user = new jv(this.ctx).verify();
        return user;
    }

    get() {
        let query = this.ctx.query;
        if(!query) throw new Error("ctx.get params is null");
        // { ss: 'ss' }
        return query;
    }
    
    post() {
        let body = this.ctx.request.body;
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