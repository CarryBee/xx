module.exports = class Retriter {
	constructor(pms, time = 1) {
		if(typeof pms !== "function") throw new Error(pms + " is not function");
		this.pms = pms;
		this.time = time;
		this.maxtime = 3;
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
	    if(this.time > this.maxtime) throw new Error(name + " 超过重试次数");

	    try {
	        res = await this.pms(); // 执行
	        if(!res) throw new Error("获取不到数据");
	    } catch (e) {
			console.log("[" + name + "] 第"+this.time+"次重试", "原因：" + e.message);
			const rt = new Retriter(this.pms, ++this.time);
			rt.settime(this.maxtime);
			rt.setname(name);
	        res = await rt.run();
	    }

	    return res;
	}
}