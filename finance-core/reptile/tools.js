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
            return await tf.getListOF(page, "20180616", "20180622");
        });
        rt.setname("抓取"+page+"页");
        rt.errcall(obj => console.log("[" + obj.name + "失败] 第"+obj.time+"次重试", "原因：" + obj.err.message));
        let res = await rt.run();
        pagenum = res.length;
            
        console.log("第"+page+"页", "共"+pagenum + "条");
    } while(pagenum > 0);
    return "success";
});
rt.setname("程序启动");
rt.settime(10); // 重试次数
rt.errcall(obj => console.log("[" + obj.name + "失败] 第"+obj.time+"次重试", "原因：" + obj.err.message));
rt.run().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

