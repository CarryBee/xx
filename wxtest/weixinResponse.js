/**
 * Created by karonl on 2016/1/12.
 * 回应服务器的回传和认证
 */
const Router = require('koa-router');
const $ = new Router();
const SHA = require("./tools/sha1");

/*
const record = require('../modules/record');

$.post('/', async ctx => {
    let buck = '';
    ctx.request.req.on('data', function(data) {
        buck += data.toString();
    });
    ctx.request.req.on('end', function() {
        if(buck.indexOf('<Event><![CDATA[VIEW]]></Event>') > 0) {

        } else {
            record.add(buck);
        }
        
    });
    ctx.body = '';
});
*/

$.get('/', async ctx => {
    var signature = ctx.query.signature;
    var timestamp = ctx.query.timestamp;
    var nonce = ctx.query.nonce;
    var echostr = ctx.query.echostr;
    ctx.body = await signatureFun(signature, timestamp, nonce, echostr);
});
/*
* 微信加密验证函数
* */
async function signatureFun(signature, timestamp, nonce, echostr) {
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "karonl"; // 协定口令
    oriArray.sort();
    var original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature);
    var sha = new SHA();
    var scyptoString = sha.set(original);
    console.log("scyptoString : " + scyptoString);
    if (signature == scyptoString) {
        return echostr;
        console.log("Confirm and send echo back");
    } else {
        return "";
        console.log("Failed!");
    }
}


module.exports = $;