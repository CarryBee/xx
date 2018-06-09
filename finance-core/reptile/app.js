let superagent = require('superagent');
let cookieMap = new Map();
let fs = require("fs");
const readline = require('readline');
const cheerio = require('cheerio');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

//getList(getcookies());
getRandamCode();


function getRandamCode () {
    superagent.get('http://tsdl.postar.cn/imageshow.jsp?' + Math.random())
        .set("Cookie", getcookies())
        .end(function(err, res){
            if (err) throw err;
            var cookie = res.header['set-cookie'];

            loopcookies(cookie);
            //console.log(res.body);
            //getTitles();

            fs.writeFile(__dirname + "/imgPath.jpg", res.body, "binary", function(err) {
                console.log(err);
                rl.question('输入验证码:', (answer) => {
                    getLogin(answer);
                });
            })
        })
};

function getLogin (answer) {
    superagent.post("http://tsdl.postar.cn/100101.prm?AGET_ID=13760050600&USERID=13760050600&USERPWD=3362383&RAND="+answer+"&USRIP=223.73.136.202&iSec="+ Math.random())
        .set("Accept-Language", "zh-cn")
        .set("Cookie", getcookies())
        .set("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36")
        .set("Host","tsdl.postar.cn")
        .set("Origin","http://tsdl.postar.cn")
        .set("referer","http://tsdl.postar.cn/")
        .end(function(err, res){
                if (err){
                  throw err;
                };

                var cookie = res.header['set-cookie'];
                loopcookies(cookie);
                
                console.log(res.text);
                getListOF();

        });
}

function getListOF () {
    console.log("="+getcookies());
    superagent.post('http://tsdl.postar.cn/100131t.prms')
        .set("Accept-Language", "zh-cn")
        .set("Cookie", getcookies())
        .set("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36")
        .set("Host","tsdl.postar.cn")
        .set("Origin","http://tsdl.postar.cn")
        .set("referer","http://tsdl.postar.cn/")
        .type('form')
        .send({
            "pageNum": 1,
            "CUST_ID":"",
            "CUST_NAME":"",
            "AGENT_ID":"",
            "AGENT_NAME":"",
            "PRDORDNO":"",
            "begin_date":"20180608",
            "end_date":"20180608",
            "ORDSTATUS":"01",
            "SUB_AGENTS":"",
            "PAYMENT_TYPE":"",
            "BANKNO":"",
            "FEE_TYPE":"",
            "CARD_TYPE":"",
            "DTEL":""})
        .end(function(err, res){
            if (err) throw err;
            var cookie = res.header['set-cookie'];

            loopcookies(cookie);
            //console.log(res.body);
            //getTitles();
            //console.log(res.text);
            getFromHtml(res.text);
            
        })
};

function getFromHtml (html) {
    let repon = html.match(/<tbody>[\s|\S]*?<\/tbody>/g);
    repon = repon[0];
    repon = repon.replace(/ /g,"");
    repon = repon.replace(/\r/g,"");
    repon = repon.replace(/\n/g,"");
    repon = repon.replace(/\t/g,"");
    reponarr = repon.match(/<tr>[\s|\S]*?<\/tr>/g);

    for(let tr = 0; tr < reponarr.length; tr++) {
        let reg = new RegExp(/<td[^>/]*>(.+?)<\/td>/g);
        let obj = [];
        for(let i = 0; i<20; i++){
            let rep = reg.exec(reponarr[tr]);
            if(rep)
                obj.push(rep[1]);
            else break;    
        }
        console.log(obj);
    }
}

function loopcookies(cooks){}
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
