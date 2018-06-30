'use strict'
// 金融模块，控制钱包的充值与花费

const Loop = require("../tools/financebox/Loop");
const FinanceBaseTool = require("../FinanceBaseTool");
const finRouter = new Loop();

finRouter.set(async (ctx, next) => {
    const dip = new FinanceBaseTool().getSqlDisposer();
    await dip(async function(conn) {
        ctx.conn = conn;
        await conn.beginTransaction();  // 开启事务
    });
    await next();
}, ctx => {
    ctx.conn.commit(); // 完成事务
}, (err, ctx) => {
    ctx.conn.rollback(); // 回滚
    console.log("FinRouter: " + err);
    console.log("重置");
});

// 测试充值
finRouter.use("#testrecharge", async (ctx, next) => {
  
    for(let invo of ctx.req.invoices) { // 当前上下文
        const bb = await ctx.conn.query('select * from user_ficts where userid = ? for update;', invo.userid);
        if(!bb || bb.length < 1)
            await ctx.conn.query('insert into user_ficts (userid) values (?);', invo.userid);
            
        let pakcsql;
        if(invo.amount < 0)
            pakcsql = 'set reduce = reduce ' + invo.amount;
        else
            pakcsql = 'set recharge = recharge + ' + invo.amount;

        let aa = await ctx.conn.query('update user_ficts '+pakcsql+' where userid = ?;', invo.userid);
        console.log(aa);

        const cc = await ctx.conn.query('select * from user_ficts where userid = ?;', invo.userid);
        let am = cc[0].recharge + cc[0].reduce;
        if(am < 0) throw new Error("余额不足"); 
    }
    
    await next();
});

finRouter.use("#payorder", async (ctx, next) => {

});

// 充值
finRouter.use("#recharge", async (ctx, next) => {

    let num = parseFloat("10.2222");
    if(num > 0 && num < 1000000) {
        await ctx.conn.query('select * from user_ficts where id=1 lock in share mode;');
        const bb = await ctx.conn.query('update user_ficts set recharge = recharge + ? where id=1;', num);
        console.log("affectedRows", bb.affectedRows);
        const ye = await ctx.conn.query('select * from user_ficts where id=1 lock in share mode;');
        console.log(ye[0].recharge);
        await next();
    } else throw new Error("is not float");
});

// 提现
finRouter.use("#reduce", async (ctx, next) => {
    const aa = await ctx.conn.query('select * from coinset where id=3 lock in share mode;'); // 默认情况下有写入队列
    //console.log(aa[0].names);
    const len = aa[0].names + "c";
    const bb = await ctx.conn.query('update coinset set names = "'+len+'" where id=3;');;
    console.log("affectedRows", bb.affectedRows);
    await next();
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

module.exports = finRouter;
