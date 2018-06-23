let pro = new Promise((resolve, reject) => {
	throw new Error("xxx");
	// reject("xxx");
}).catch(err => {
	//throw new Error("eerr");;
	console.log("b", err);
});

pro.then(res => {
	console.log("a", res);
});



/*
let pro2 = async function() {
	return await pro;
}
*/

/*
async function test(){
	try {


		await pro();
	} catch(e) {
		console.log("====:" + e);
	}
}
*/

/*
pro2().then(function(doc) {
	console.log(doc);
});
*/
