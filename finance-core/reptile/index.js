
const FinanceBaseTool = require("../src/FinanceBaseTool");
const TongfuFlow = require("./TongfuFlow");
/**
 * 
 * TongfuFlowRun
 * Tongfu版本爬虫与数据获取
 * 
 */
async function TongfuFlowRun() {
    try {
        await FinanceBaseTool.start(); // 启动 MySQL
        const dip = new FinanceBaseTool().getSqlDisposer();

        /**
         * 读取通付的数据
         */
        let begin = new Date().getTime();
        let res = await TongfuFlow.run(); // 所有数据
        let end = new Date().getTime();
        // console.log(res);
        console.log("总耗时" + (end-begin)/1000 + "秒");
        console.log("激活条目共" + res.jihuo.length + "条，刷卡条目共" + res.shuaka.length + "条");
        /**
         * 插入数据库固化
         */
        let dpr = await dip(async function(conn) {
            // 批量插入
            let rs = await conn.query("REPLACE INTO tongfu_jihuo_flow(`tid`,`name`,`number`, `agent`, `machine_sn`, `time`, `event_name`, `isuse`, `money`, `payback`, `state`, `enabletime`) VALUES ?", [res.jihuo]);
            console.log("影响条目：" + rs.affectedRows);
            console.log("数据库状态："+ rs.message);
            return 101;
        });
        console.log(dpr);
        /**
         * 启动分成，对每条数据事务处理
         */

        // ????

    } catch(e) {
        console.log("Tongfu版本爬虫过程：" + e);
    }
}
TongfuFlowRun();
