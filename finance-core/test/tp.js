let pro = new Promise((resolve, reject) => {

	reject("xxx");
}).catch(err => {
	//throw new Error("eerr");;
	console.log(err);
});

let pro2 = async function() {
	return await pro;
}

/*
async function test(){
	try {


		await pro();
	} catch(e) {
		console.log("====:" + e);
	}
}
*/

pro2().then(function(doc) {
	console.log(doc);
});
