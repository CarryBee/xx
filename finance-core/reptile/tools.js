const Tongfu = require("./Tongfu");
const tf = new Tongfu();
const Retriter = require("./Retriter");

// 通付两个抓取
const rt = new Retriter(async function() {
    console.log("准备登录");
    let answer = await tf.getRandamCode();
    let login = await tf.getLogin(answer);
    console.log(login);
    
    let page2num = 0;
    let page2 = 0;
    do {
        page2++;

        const rt = new Retriter(async function() {
            return await tf.getListOfUser(page2, "20180601", "20180624");
        });
        rt.setname("抓取激活"+page2+"页");
        rt.errcall(obj => console.log("[" + obj.name + "失败] 第"+obj.time+"次重试", "原因：" + obj.err.message));
        let res = await rt.run();
        // console.log(res);
        page2num = res.length;
            
        console.log("激活第"+page2+"页", "共"+page2num + "条");
    } while(page2num > 0 && page2num > 18);

    // 读取历史刷卡记录
    let pagenum = 0;
    let page = 0;
    do {
        page++;

        const rt = new Retriter(async function() {
            return await tf.getListOfCash(page, "20180620", "20180622");
        });
        rt.setname("抓取刷卡"+page+"页");
        rt.errcall(obj => console.log("[" + obj.name + "失败] 第"+obj.time+"次重试", "原因：" + obj.err.message));
        let res = await rt.run();
        pagenum = res.length;
            
        console.log("刷卡第"+page+"页", "共"+pagenum + "条");
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

