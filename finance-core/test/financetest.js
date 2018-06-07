const ComputeBox = require("./src/tools/ComputeBox");


let Z = {name:'Z', level: 7, upsao:undefined, proxy: true };
let Z2 = {name:'Z2', level: 6, upsao:Z, uptixian: Z };
let Z3 = {name:'Z3', level: 5, upsao:Z2, uptixian: Z2  };
let A = {name:'A', level: 7, upsao:Z3 };
let A2 = {name:'A2', upsao:A };
let A3 = {name:'A3', level: 5, upsao:A2 };
let B = {name:'B', level: 6, upsao:A3 };
let B2 = {name:'B2', level: 5, upsao:B };
let C = {name:'C', level: 5, upsao:B2, uptixian: Z2 };

let cb = new ComputeBox(C);
/*
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
*/
let rates = {
	'Z2-C': 0.65, // Z2分给C 0.65
	'Z-Z2': 0.7, // Z分给Z2 0.7
}
// let res = cb.bindTixianFun01(20);
cb.pathTixianFun01();
let map = cb.computeTixianFun01(5000 * 0.2, rates);  

console.log(map);
