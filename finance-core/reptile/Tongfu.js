'use strict'
const superagent = require("superagent");
const config = require("./config");
let cookieMap = new Map();


module.exports = class Tongfu {
    
    constructor() {}
    
    // 验证过
    getRandamCode () {
        const that = this;
        return new Promise((resolve, reject) => {
            superagent.get(config.url + "/imageshow.jsp?" + Math.random())
            .timeout(6000)
            .set("Cookie", getcookies())
            .end(function(err, res){
                if (err) reject(err);
                loopcookies(res.header['set-cookie']);
    
                const codepic = "data:image/jpeg;base64," + res.body.toString('base64');
                console.log("获取验证码：成功");
                that.checkRandamCode(codepic, function(err, code) {
                    if (err) reject(err);
                    console.log("验证码识别结果：" + code);
                    // getLogin(code);
                    resolve(code);
                });
            });
        });
    };

    // 识别验证码
    checkRandamCode(codepic, callback) {
    //console.log("识别验证码：loading..");
        superagent.post(config.codeVerifyUrl)
        .timeout(12000)
        .set("Authorization", "APPCODE " + config.appcode)
        .type('form')
        .send({
            "v_pic": codepic,
            "v_type":"ne4"
        })
        .end(function(err, res){
            if (err) callback(err);
                
            if(res && res.text) {
                const body = JSON.parse(res.text);
                console.log(body);
                callback(undefined, body.v_code.toLowerCase());
            } else {
                callback(err);
            }
                
        });
    }

    // 登录
    getLogin (answer) {
        return new Promise((resolve, reject) => {
            superagent.post(config.url + "/100101.prm?AGET_ID=13760050600&USERID=13760050600&USERPWD=3362383&RAND="+answer+"&USRIP=223.73.136.202&iSec="+ Math.random())
            .timeout(6000)
            .set("Accept-Language", "zh-cn")
            .set("Cookie", getcookies())
            .set("user-agent", config.useragent)
            .set("Host", config.Host)
            .set("Origin", config.Origin)
            .set("referer", config.referer)
            .end(function(err, res){
                    if (err) reject(err);
    
                    var cookie = res.header['set-cookie'];
                    loopcookies(cookie);
    
                    if(res && res.text) {
                        let jes = JSON.parse(res.text);
                        if(jes.RSPMSG == "校验通过") {
                            resolve(jes.AGE_NAME + jes.RSPMSG);
                        } else reject(new Error("校验不通过"));
                    } else reject(new Error("登录失败"));
            });
        });
       
    }


    // 获取充值列表：第三方用户id与消费记录、订单号
    getListOF (pageNum = 1, begin, end) {
        return new Promise((resolve, reject) => {
            superagent.post(config.url + "/100131t.prms")
                .timeout(6000)
                .set("Accept-Language", "zh-cn")
                .set("Cookie", getcookies())
                .set("user-agent", config.useragent)
                .set("Host", config.Host)
                .set("Origin", config.Origin)
                .set("referer", config.referer)
                .type('form')
                .send({
                    "pageNum": pageNum,"CUST_ID":"","CUST_NAME":"","AGENT_ID":"","AGENT_NAME":"","PRDORDNO":"","begin_date":begin,"end_date":end,"ORDSTATUS":"01","SUB_AGENTS":"","PAYMENT_TYPE":"","BANKNO":"","FEE_TYPE":"","CARD_TYPE":"","DTEL":""})
                .end(function(err, res){
                    if (err) reject(err);
                    if (res) {
                        let cookie = res.header['set-cookie'];
                        loopcookies(cookie);
                        let res2 = getFromHtml(res.text);
                        resolve(res2);
                    } else {
                        resolve(res);
                    }
                    
                });
        });
    };

}





// 登陆




//获取第三方用户id与机器的关系表
function getListOF2 (pageNum = 1) {
    superagent.post(config.url + "/serveFeeUsrList.prm")
        .set("Accept-Language", "zh-cn")
        .set("Cookie", getcookies())
        .set("user-agent", config.useragent)
        .set("Host", config.Host)
        .set("Origin", config.Origin)
        .set("referer", config.referer)
        .type('form')
        .send({
            "pageNum": pageNum,
            "CUST_ID":"", 
            "CUST_NAME": "",
            "BEGIN_DATE": "20180501",
            "END_DATE": "20180610",
            "FEE_NAME": "", 
            "AGET_ID": "",
            "AGE_NAME": "",
            "TERNO": "",
            "ISVALID": "",
            "ACT_STATE": "",
            "START_DATE": "",
            "FIN_DATE": "",
            "SUB_AGENTS":"" })
        .end(function(err, res){
            if (err) throw err;
            var cookie = res.header['set-cookie'];

            loopcookies(cookie);
            //console.log(res.body);
            //getTitles();
            //console.log(res.text);
            let res = getFromHtml(res.text);
            console.log(res);
            
        })
};

// 最后行为检测
function ping () {
    superagent.get(config.url + "/100103.prm?menu_id=010101&_=1528614268648")
        .set("Accept-Language", "zh-cn")
        .set("Cookie", getcookies())
        .set("user-agent", config.useragent)
        .set("Host", config.Host)
        .set("Origin", config.Origin)
        .set("referer", config.referer)
        .end(function(err, res){
            if (err) throw err;
            var cookie = res.header['set-cookie'];

            loopcookies(cookie);
            getFromHtml(res.text);
        })
}

// 标注表格获取
function getFromHtml (html) {
    let repon = html.match(/<tbody>[\s|\S]*?<\/tbody>/g);
    repon = repon[0];
    repon = repon.replace(/ /g,"");
    repon = repon.replace(/\r/g,"");
    repon = repon.replace(/\n/g,"");
    repon = repon.replace(/\t/g,"");
    let reponarr = repon.match(/<tr[^>/]*>[\s|\S]*?<\/tr>/g);
    if(!reponarr || reponarr.length < 1) {
        return [];
    }
    // console.log(repon);
    let rows = [];
    for(let tr = 0; tr < reponarr.length; tr++) {
        let reg = new RegExp(/<td[^>/]*>(.+?)<\/td>/g);
        let obj = [];
        for(let i = 0; i<20; i++){
            let rep = reg.exec(reponarr[tr]);
            if(rep)
                obj.push(rep[1]);
            else break;    
        }
        rows.push(obj);
    }
    return rows;
}

function loopcookies(cooks){
  if(cooks && cooks.length > 1)
  for(let cook of cooks){
    cook = cook.split(';'); 
    let value = cook[0].split('=');
    if(value[1]){
      cookieMap.set(value[0], value[1]);
    } else continue;
  }
}

function getcookies(){
  let str = '';
  cookieMap.forEach(function (value, key, map) {
    str += key + '=' + value + ';'
  });
  return str;
}
