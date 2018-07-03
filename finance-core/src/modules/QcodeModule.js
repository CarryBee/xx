'use strict'
const qr = require('qr-image');
const crypto = require('crypto');
module.exports = class QcodeMoudle {
    constructor() {
        this.map = new Map();
        this.save = this.map.set;
        this.read = this.map.get;
    }
    
    setDB(save, read) {
        this.save = save;
        this.read = read;
    }

    // PC端输出二维码
    getImage() {
        const sha1 = crypto.createHash('sha1');
        sha1.update('time:' + new Date().getTime());
        const code = qr.imageSync(sha1.digest('hex'), { type: 'png' });
        return "data:image/png;base64," + code.toString('base64');
    }

    // 手机端确认
    verity(code, token) {
        this.save(code, {token:token, create:new Date().getTime()});
    }

    // PC端认证
    auth(code) {
        const user = this.read(code);
        const now = new Date().getTime();
        if(now - user.create > 60 * 1000) throw new Error("token 失效");
        if(!user || !user.token) throw new Error("token 不存在");
        return user.token;
    }
}