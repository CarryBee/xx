'use strict'
/**
 * Created by karonl on 2017/1/2.
 * jwt 具体操作类
 */
const jwt = require('koa-jwt');
const secret = 'llkaksldfjnn982jdn';
class jwtcontrol {
    constructor(ctx){
        this.ctx = ctx;
    }

    static gsecret(){
        return secret;
    }

    verify(){
        if(this.ctx && this.ctx.header && this.ctx.header.token) {
            try {
                const jsonbody = jwt.verify(this.ctx.header.token, secret);
                return jsonbody;
            }catch (err){
                // 授权错误
                throw new Error('授权失败');
            }
        } else {
            // 授权错误
            throw new Error('授权失败');
        }
    }

 
    static vtoken(token){
        try {
            const jsonbody = jwt.verify(token, secret);
            return jsonbody;
        }catch (err){
            // 授权错误
            throw new Error('授权失败');
        }
    }
}
module.exports = jwtcontrol;