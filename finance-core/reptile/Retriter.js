'use strict'
// 请求重试器
module.exports = class Retriter {
	constructor(pms, time = 1) {
		if(typeof pms !== "function") throw new Error(pms + " is not function");
		this.pms = pms;
		this.time = time;
		this.maxtime = 3;
	}

	errcall(pn) {
		this.errpn = pn;
	}

	setname(name) {
		this.name = name;
	}

	settime(maxtime) {
		this.maxtime = maxtime;
	}

	async run() {
		let res;
		const name = this.name;
	    if(this.time > this.maxtime) throw new Error(name + " 超过重试次数"); // 对外抛

	    try {
	        res = await this.pms(); // 执行
	        if(!res) throw new Error("获取不到数据");
	    } catch (e) {
			
			if(this.errpn) this.errpn({name:name, time:this.time, err:e});
			else console.log("[" + name + "失败] 第"+this.time+"次重试", ":" + e.message);

			const rt = new Retriter(this.pms, ++this.time);
			rt.settime(this.maxtime);
			rt.setname(name);
	        res = await rt.run();
	    }

	    return res;
	}
}