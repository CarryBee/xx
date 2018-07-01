// 分成
const ComputeBox = require("../src/tools/ComputeBox");
const Invoice = require("../src/tools/financebox/Invoice");

// 5 合伙人 6 超级合伙人 7 团队合伙人

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
let res = cb.pathShukaFun01();
// console.log(res);

let rates = {
	'7': 0.14, // 0.14 返回
	'6': 0.12, // 0.12
	'5': 0.1 // 0.1 返回
}
// 刷了1000元
let map = cb.computeShukaFun01(1000, rates, undefined);
console.log(map);