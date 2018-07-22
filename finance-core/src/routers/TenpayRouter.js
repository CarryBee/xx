const tenpay = require("tenpay");
const config = require("../config.js");
const ERO = require("../tools/Errorbody");
const Router = require("koa-router");
const Invoice = require("../tools/financebox/Invoice") // 金额校验工具
const OrderModule = require("../modules/OrderModule");
const $ = new Router();


const tenpayConfig = {
  appid: config.appid,
  mchid: config.mchid,
  partnerKey: config.partnerKey,
  // pfx: require('fs').readFileSync('证书文件路径'),
  notify_url: config.notify_url,
  spbill_create_ip: config.spbill_create_ip
}
const tenpayApi = new tenpay(tenpayConfig);

//================  微信统一预付单接口  ================
async function tenpayParams(out_trade_no, event, amount, user, params) {
  const userid = user.userid;
  const level = user.level;
  const product = {
    rechange: "钱包充值",
    payorder: "线上购物",
    payvip: "合伙人业务"
  }

  // 一大堆校验机制
  if (!amount || amount < 0) { throw new Error('无效支付金额'); }
  if (!userid || !level) { throw new Error('无效用户'); }
  // if (!openid) { throw new Error('非微信用户无法使用微信充值'); }
  if (["rechange", "payorder", "payvip"].indexOf(event) === -1) {
    throw new Error('非允许支付业务类型');
  }
  const invo = new Invoice();
  invo.plusnum = amount; // 正数范围检验
  amount = invo.amount;
  // 一大堆校验机制
  const attach = { // 自定义参数，支付微信回调时候要用
    event, // 区分渠道
    userid, // 充值要用
    level, // 升级要用
    amount, // 记录日志要用
    ...params // 订单和升级要用
  };

  const payConfig = {
    out_trade_no: out_trade_no,
    body: '四汇金融云平台服务:' + product[event],
    total_fee: amount,
    attach
  }
  return await tenpayApi.unifiedOrder(payConfig);
}
/**
 * 充值接口
 * curl http://localhost:3000/tenpay/payRecharge -d nickname="xxxx" -H 'token: xxxx'
 */
$.post('/payrecharge', async ctx => {
  try {
    const amount = ctx.prb.postParam("amount"); // 充值的钱，用户输入的
    const user = ctx.prb.getCurrentUser(); // 得到用户信息
    const out_trade_no = "userid_" + user.userid; // 记录在微信里面的下单号

    const res = await tenpayParams(out_trade_no, "recharge", amount, user);
    ctx.body = ERO(0, "统一下单", res);
  } catch(err) {
    ctx.body = ERO(501, "统一下单", "生成预付错误", err.message);
  }
});
/**
 * 支付订单接口
 */
$.post('/payorder', async ctx => {
  try {
    const orderid = ctx.prb.postParam("orderid"); // 订单id，根据选择购物生成
    const user = ctx.prb.getCurrentUser(); // 得到用户信息
    
    const order = await OrderModule.getUnpaidOrderByID(orderid); // 已支付订单会直接失败
    const out_trade_no = "orderid_" + order._id; // 记录在微信里面的下单号
    const amount = order.allprice; // 根据订单id计算价格，

    const res = await tenpayParams(out_trade_no, "payorder", amount, user, { orderid } );
    ctx.body = ERO(0, "统一下单", res);
  } catch(err) {
    ctx.body = ERO(501, "统一下单", "生成预付错误", err.message);
  }
});
/**
 * 支付会员接口
 */
$.post('/payvip', async ctx => {
  try {
    const aimlevel = ctx.prb.postParam("aimlevel"); // 目标级别，根据菜单中选择生成
    const user = ctx.prb.getCurrentUser(); // 得到用户信息
  
    const amount = 100; // 根据等级计算差价, [待修改]
    const out_trade_no = "userid_" + user.userid; // 记录在微信里面的下单号

    const res = await tenpayParams(out_trade_no, "payvip", amount, user, { aimlevel } );
    ctx.body = ERO(0, "统一下单", res);
  } catch(err) {
    ctx.body = ERO(501, "统一下单", "生成预付错误", err.message);
  }
});

//================  微信统一预付单接口  ================







//================  微信支付回调函数入口  ================

// 微信支付通知，回调函数
/**
 *
 * 微信支付回调
 * 三种模式入口
 *
 */
$.post('/weixintenpaycallback', tenpayApi.middleware(), async ctx => { // (充值正常模式) 额外驱动

  const message = ctx.request.weixin; // 返回内容
  const openid = message.openid;
  const order_id = message.out_trade_no;
  const attach = JSON.parse(message.attach);

  const body = {
    rechange: "ok",
    payorder: "ok",
    payvip: "ok"
  }
  // 拿到回调后增加对应钱包的钱，（+）{userid:"karonl", event:"rechange", amount:100}
  ctx.body.rechange = "ok";
  // 如果有订单编号，则执行 payorder 的扣款逻辑 {userid:"karonl", event:"payorder", orderid:"222sfasdf" }
  let event = "";
  if (event == "payorder") {
    payorder();
    ctx.body.payorder = "ok";
  }
  // 如果有升级编号，则执行 payvip 的扣款逻辑 {userid:"karonl", event:"payvip", aimlevel:12 }
  if (event == "payvip") {
    payvip();
    ctx.body.payvip = "ok";
  }

  ctx.reply('错误消息' || '');
});

//================  微信支付回调函数入口  ================

module.exports = $.routes();
