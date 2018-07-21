const tenpay = require("tenpay");
// const config = require("../config.js");
const Router = require("koa-router");
const Invoice = require("../tools/financebox/Invoice") // 金额校验工具
const $ = new Router();

/*
const tenpayConfig = {
  appid: config.appid,
  mchid: config.mchid,
  partnerKey: config.partnerKey,
  // pfx: require('fs').readFileSync('证书文件路径'),
  notify_url: config.notify_url,
  spbill_create_ip: config.spbill_create_ip
}
const tenpayApi = new tenpay(tenpayConfig);
*/

//================  微信统一预付单接口
/**
 * 充值接口
 * curl http://localhost:3000/tenpay/payRecharge -d nickname="xxxx" -H 'token: xxxx'
 */
$.post('/payrecharge', async ctx => {
  ctx.body = ctx.header;
});

/**
 * 支付订单接口
 */
$.post('/payRecharge', async ctx => {

});

/**
 * 预付会员接口
 */
$.post('/payRecharge', async ctx => {

});

async function tenpayParams (event, ctx) {
  const user = ctx.prb.getCurrentUser(); // 得到用户信息
  let amount = ctx.prb.post().amount; // 充值的钱
  const openid = user.openid;
  const userid = user.userid;
  const level = user.level;

  if (!amount || amount < 0) { throw new Error('无效支付金额'); }
  if (!userid || !level) { throw new Error('无效用户'); }
  if (!openid) { throw new Error('非微信用户无法使用微信充值'); }
  if(["rechange", "payorder", "payvip"].indexOf(event) === -1) { 
    throw new Error('非允许支付业务类型'); 
  }

  const invo = new Invoice();
  invo.plusnum = amount;
  amount = invo.amount;
  
  let params = {
    out_trade_no: 'test_unified_001',
    body: '商城充值',
    total_fee: amount,
    amount,
    event: 'rechange',
    ...openid
  }
  let unifiedOrderRes = await tenpayApi.unifiedOrder(params)
  // const sandboxAPI = await tenpay.sandbox(tenpayConfig);
  // let unifiedOrderRes = await sandboxAPI.unifiedOrder(params)
  console.log('unifiedOrderRes', unifiedOrderRes)
  ctx.body = HR({
    data: {
      unifiedOrderRes
    }
  })
} 



// 微信支付通知，回调函数
/**
 *
 * 微信支付回调
 * 三个入口
 *
 */
$.get('/weixintenpaycallback', async ctx => {// (充值正常模式) 额外驱动

    const body = {
        rechange: "ok",
        payorder: "ok",
        payvip: "ok"
    }
    console.log('rechange', ctx)
    // 拿到回调后增加对应钱包的钱，（+）{userid:"karonl", event:"rechange", params:undefined, amount:100}
    ctx.body.rechange = "ok";
    // 如果有订单编号，则执行 payorder 的扣款逻辑 {userid:"karonl", event:"payorder", params:{orderid:"222sfasdf"}, amount:100}
    let event = "";
    if(event == "payorder") {
        payorder();
        ctx.body.payorder = "ok";
    }
    // 如果有升级编号，则执行 payvip 的扣款逻辑 {userid:"karonl", event:"payvip", params:{aimlevel:12}, amount:100}
    if(event == "payvip") {
        payvip();
        ctx.body.payvip = "ok";
    }
});

module.exports = $.routes();
