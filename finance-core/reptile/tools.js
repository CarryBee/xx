const Tongfu = require("./Tongfu");
const tf = new Tongfu();

async function retryRun(pms, time = 0) {
    let res;
    if(time > 3) return [];

    try {
        res = await pms;
        if(!res) {
            res = await retryRun(pms, time++);
        }
    } catch (e) {
        console.log("第"+time+"次重试", e);
        res = await retryRun(pms, time++);
    }

    return res;
}

async function run() {
    try {
        let answer = await tf.getRandamCode();
        let login = await tf.getLogin(answer);
        console.log(login);
        let pagenum = 0;
        let page = 0;
        do {
            page++;
            let res = await retryRun(tf.getListOF(page, "20180620", "20180622"));
            pagenum = res.length;
            
            console.log("第"+page+"页", "共"+pagenum);
        } while(pagenum > 0);
    } catch(e) {
        console.log("a", e);
    }
}
run();