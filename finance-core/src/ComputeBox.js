const math = require("mathjs");
math.config({
    number: 'BigNumber',
    precision: 20 
});
/*

let Z = {name:'Z', level: 7, upsao:undefined, proxy: true };
let Z2 = {name:'Z2', level: 6, upsao:Z, uptixian: Z, proxy: true };
let Z3 = {name:'Z3', level: 5, upsao:Z2, uptixian: Z2, proxy: true };
let A = {name:'A', level: 7, upsao:Z3 };
let A2 = {name:'A2', upsao:A };
let A3 = {name:'A3', level: 5, upsao:A2 };
let B = {name:'B', level: 6, upsao:A3 };
let B2 = {name:'B2', level: 5, upsao:B };
let C = {name:'C', level: 5, upsao:B2, uptixian: Z2 };


let cb = new ComputeBox(C);

// 刷卡
let res = cb.pathShukaFun01(20);
console.log(res);

let rates = {
	'7': 0.14, // 0.14
	'6': 0.12, // 0.12
	'5': 0.1 // 0.1
}
// 刷了1000元
let map = cb.computeShukaFun01(1000, rates, "");
console.log(map);


// 提现
let res = cb.bindTixianFun01(20);
cb.pathTixianFun01();
let rates = {
	'Z2-C': 0.65, // Z2分给C 0.65
	'Z-Z2': 0.7, // Z分给Z2 0.7
}
let map = cb.computeTixianFun01(5000 * 0.2, rates);  
*/
class ComputeBox {
	
	constructor(user) {
		this.user = user;
		this.arrUser = []; // 提现用
		this.realTimeUser = []; // 分成用
	}

	/*
		推荐链 upsao 向上查找级别关系链，修改自己的等级
		刷卡分成用。
	*/

	upMyLevelShukaFun01() { // 升级自己同级上升 5 6 7
		if(!this.user.level) { // 没级别
			// 初始化级别，从无到有
			this.level = 5;
			// 寻路查找原链的分成链，实现转换
		} else {
			this.level = this.level++;
		}
	}

	/*
		推荐链 upsao 向上查找级别关系链（中间可重复，以靠下为准）
		进行直链链绑定与分成链绑定 输入长链，变短链
		刷卡分成用。
	*/

	pathShukaFun01(maxloopnum) { // 进行直链链绑定与分成链绑定 输入长链，变短链
		let nowUser = this.user;
		let fatUser;
		let level = this.user.level;
		let countloop = 0;
		
		do {
			countloop++;
			fatUser = nowUser.upsao;
			if(nowUser == this.user) // 第一次就是自己
				this.realTimeUser.push(nowUser);
			else if(fatUser && !fatUser.level){
				// 游客模式，没交钱的，直接忽略
				// console.log("忽略:" + fatUser.name);
			} else if(fatUser && level < fatUser.level) {
				level = fatUser.level;
				this.realTimeUser.push(fatUser);

				if(fatUser.level >= 7) break;
			} else {
				// 同级 B->B 或小于 B->C 则忽略
			}

			nowUser = fatUser;
		} while(nowUser && countloop < maxloopnum); // 有上级就继续
		return this.realTimeUser;
	}

	/*
		推荐链 uptixian 向上查找级别关系链（中间不可重复）
		通过 upsao 找到最近的代理商/运营中心，挂靠上去，一般在建立扫码关系就同步建立
		提现分成使用。
	*/

	bindTixianFun01(maxloopnum) { // 通过 upsao 找到最近的代理商/运营中心，挂靠上去，将 uptixian 记录
		let nowUser = this.user;
		let fatUser;
		let countloop = 0;
		if(nowUser.uptixian)return nowUser;
		do {
			countloop++;
			fatUser = nowUser.upsao;
		
			if(fatUser && fatUser.proxy){
				// 有上级，上级是代理商
				this.user.uptixian = fatUser;
			} // 一直向上找

			nowUser = fatUser;
		} while(nowUser && countloop < maxloopnum); // 有上级就继续
		return this.user;
	}

	/*
		推荐链 uptixian 向上查找级别关系链（中间不可重复）
		通过 upsao 找到最近的代理商/运营中心，每次提现时候会读取
		提现分成使用。
	*/

	pathTixianFun01() {
		let nowUser = this.user;
		do {
			this.arrUser.push(nowUser.name);
			nowUser = nowUser.uptixian; // 没有上级为止
		} while(nowUser);
		return this.arrUser;
	}

	/*
		根据排好分成链，进行分配。根据比例逐级抽取各自部分
		刷卡分成用。
		let rates = {
			'7': 0.14, // 0.14
			'6': 0.12, // 0.12
			'5': 0.1 // 0.1
		}
	*/

	computeShukaFun01(cash, rates, remark) { 
		let tmpobj = new Map();
		let arruser = this.realTimeUser || [];
		for(let i = 0; i < arruser.length; i++) {

			let lnum = math.bignumber(rates[arruser[i].level+""]);
			let rnum;
		    if(arruser[i-1] == undefined)
		    	rnum = 0;
		    else
		    	rnum = -math.bignumber(rates[arruser[i-1].level+""]);
		    
			let te = math.add(lnum, rnum);
			tmpobj.set(arruser[i].name, cash * math.format(te));
		}

		return tmpobj;

	}

	/*
		根据排好分成链，进行分配。根据比例逐级抽取各自部分
		提现分成用。
		let rates = {
			'Z2-C': 0.65, // Z2分给C 0.65
			'Z-Z2': 0.7, // Z分给Z2 0.7
		}
	*/

	computeTixianFun01(cash, rates, remark) { 
		let tmpobj = new Map();
		let arruser = this.arrUser || [];
		let lastrate = 1;
		let lastcach = math.bignumber(cash);
		for(let i = arruser.length; i > 0; i--) {

			let lnum = arruser[i-2];
			let rnum = arruser[i-1]; // 右边
			let rate = rates[rnum + '-' + lnum];
			if(lnum == undefined){
				rate = 0;
			}

			lastcach = math.multiply(math.bignumber(lastcach), math.bignumber(lastrate));
			let nowrate = math.add(math.bignumber(1), -math.bignumber(rate));
			let money = math.multiply(lastcach, math.bignumber(nowrate));

			tmpobj.set(rnum, math.format(money));
			lastrate = rate;
		}

		return tmpobj;

	}


}
module.exports = ComputeBox;