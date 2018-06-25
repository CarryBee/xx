const Tongfu = require("./Tongfu");
const tf = new Tongfu();
const Retriter = require("./Retriter");

const rt = new Retriter(async function() {
    console.log("准备登录");
    let answer = await tf.getRandamCode();
    let login = await tf.getLogin(answer);
    console.log(login);
    let pagenum = 0;
    let page = 0;
    do {
        page++;

        const rt = new Retriter(async function() {
            return await tf.getListOF(page, "20180620", "20180622");
        });
        rt.setname("抓取"+page+"页面");
        let res = await rt.run();
        pagenum = res.length;
            
        console.log("第"+page+"页", "共"+pagenum);
    } while(pagenum > 0);
    return "success";
});
rt.setname("程序启动");
rt.run().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

