const FinanceBaseTool = require("../src/FinanceBaseTool");
function sleep() {
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    });
}

// 更新事务
async function select() {
    const dip = new FinanceBaseTool().getSqlDisposer();
    dip(async function(conn) {
        // let res = await conn.query('select * from coinset');
        // console.log(res);
        
        try {
            await conn.beginTransaction();
            console.log('begin');
            const aa = await conn.query('select * from coinset where id=3 lock in share mode;'); // 默认情况下有写入队列
            //console.log(aa[0].names);
            const len = aa[0].names + "c";
            const bb = await conn.query('update coinset set names = "'+len+'" where id=3;');;
            console.log(bb.affectedRows);
            //await sleep();
            //throw new Error("sss");
            conn.commit();
        } catch (err) {
            console.log(err.code);
            console.log('rollback');
            conn.rollback();
        }

    });
}

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
a();