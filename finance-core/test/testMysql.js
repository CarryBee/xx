const FinanceBaseTool = require("../src/FinanceBaseTool");

async function a() {
    await FinanceBaseTool.start();

    const dip = new FinanceBaseTool().getSqlDisposer();
    dip(async function(connection) {
        let res = await connection.query('select * from coinset');
        console.log(res);
    });
}
a();