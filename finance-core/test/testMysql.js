const FinanceBaseTool = require("../src/FinanceBaseTool");
const Loop = require("../src/tools/Loop");
function sleep() {
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    });
}


let loop = new Loop();

// 充值
loop.use(async (ctx, next) => {
    await ctx.conn.query('select * from coinset where id=3 lock in share mode;');
    await next();
});

// 提现
loop.use(async (ctx, next) => {
    const aa = await ctx.conn.query('select * from coinset where id=3 lock in share mode;'); // 默认情况下有写入队列
    //console.log(aa[0].names);
    const len = aa[0].names + "c";
    const bb = await ctx.conn.query('update coinset set names = "'+len+'" where id=3;');;
    console.log("affectedRows", bb.affectedRows);
    await next();
});

async function b() {
    await FinanceBaseTool.start();
    try {
        const res = await loop.run({});
        console.log(res.ok); // 事务状态
    } catch (e) {
        console.log("err:", e);
    }
    
}
b();


async function a() {
    await FinanceBaseTool.start();
    select();
    select();
    const dip = new FinanceBaseTool().getSqlDisposer();
    dip(async function(conn) {
        const aa = await conn.query('select * from coinset where id = 3;');
        console.log(aa[0].names);
    });
    select();
    
}
// a();