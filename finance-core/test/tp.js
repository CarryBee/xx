let pro = new Promise((resolve, reject) => {

	reject("xxx");
}).catch(err => {
	throw new Error("eerr");;
	console.log(err);
});

async function test(){
	try {


		await pro();
	} catch(e) {
		console.log("====:" + e);
	}
}
