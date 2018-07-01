const FinanceBaseTool = require("../src/FinanceBaseTool");
const Loop = require("../src/tools/financebox/Loop");
const Invoice = require("../src/tools/financebox/Invoice");
function sleep() {
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    });
}


let finRouter = new Loop();

finRouter.set(async (ctx, next) => {
    // 开启事务
    const dip = new FinanceBaseTool().getSqlDisposer();
    await dip(async function(conn) {
        ctx.conn = conn;
        await conn.beginTransaction();
        return;
    })
    await next(); // 主调用线
}, ctx => {
    // 完成事务
    console.log(ctx);
    ctx.conn.commit();
}, (err, ctx) => {
    // 回滚
    console.log(err);
    console.log("重置");
    ctx.conn.rollback();
});

// 充值
finRouter.use("#recharge", async (ctx, next) => {

    console.log("#recharge");
    console.log("=",ctx.req);

    
    let num = parseFloat("10.2222");
    if(num > 0 && num < 1000000) {
        await ctx.conn.query('select * from user_ficts where id=1 lock in share mode;');
        const bb = await ctx.conn.query('update user_ficts set recharge = recharge + ? where id=1;', num);
        console.log("affectedRows", bb.affectedRows);
        const ye = await ctx.conn.query('select * from user_ficts where id=1 lock in share mode;');
        console.log(ye[0].recharge);
        
    } else throw new Error("is not float");
    
    await next();
    return "a";
});

// 提现
finRouter.use("#reduce", async (ctx, next) => {
    console.log("#reduce");
    console.log("=",ctx.req);
    
    const num = 1;
    const bb = await ctx.conn.query('update user_ficts set reduce = reduce - ? where id=1;', num);
    console.log("affectedRows", bb.affectedRows);
 
    await next();
    return "b";
});

// 返现
finRouter.use("#cashback", async (ctx, next) => {
    const aa = await ctx.conn.query('select * from coinset where id=3 lock in share mode;'); // 默认情况下有写入队列
    //console.log(aa[0].names);
    const len = aa[0].names + "n";
    const bb = await ctx.conn.query('update coinset set names = "'+len+'" where id=3;');;
    console.log("affectedRows", bb.affectedRows);
    await next();
});



async function b() {
    await FinanceBaseTool.start();
    // 订单id
    // 计算获利
    const us = [ 
        { userid: 'C', amount: 100 },
        { userid: 'B', amount: 20 },
        { userid: 'A', amount: 20 } 
    ];

    

    try {
        const invoices = [];
        // 校验格式
        for(let one of us) {
            let inv = new Invoice();
            inv.userid = one.userid;
            inv.plusnum = one.amount;
            invoices.push(one);
        }
        
        const res = await finRouter.run([{
            path: "#recharge",
            invoices: invoices
        },{
            path: "#reduce",
            invoices: invoices
        }]);
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