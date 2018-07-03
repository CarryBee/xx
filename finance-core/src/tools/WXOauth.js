'use strict'
// 2016-3
/*
如何使用：
const result = await WOauth.promised(ctx);
*/
const OAuth = require('wechat-oauth');
const config = require('./config');
const localhost = config.wxurl;
const objdb = {};
const client = new OAuth(config.wxapp,  config.wxsecret, function (openid, callback) {
    callback(null, objdb[openid]);
},function (openid, token, callback) {
    objdb[openid] = token;
    callback();
});

exports.promised = function (ctx) {
    return new Promise((resolve, reject) => {
        console.log('进行授权');
        this.set(ctx, function (err, info) {
            if (err) reject(err);
            else resolve(info);
        });
    });
};

exports.clean = function(ctx){
    ctx.session.openid = undefined;
    return ctx.session.openid;
}

exports.check = function (ctx) {
    return !isContains(ctx.headers['user-agent'], 'MicroMessenger');
}

exports.set = function (ctx, callback) {
    const code = ctx.query.code;
    const url = localhost + ctx.path;
    if (code == undefined && ctx.session.openid) {
        console.info('#### 授权过记录了 session，无需跳转');
        //没有code，只有session
        let tmpid = ctx.session.openid;
        console.log('tmpid:'+tmpid);
        getWithID(tmpid, url, callback);
    } else if (code == undefined && !ctx.session.openid) {
        //没有code也没有session
        console.info('#### 没有code, 没有session, 初级授权');
        let urlx = client.getAuthorizeURL(url, 'getopenid', 'snsapi_base');
        callback(urlx, undefined); //初级授权申请，带code跳转
    } else {
        //有返回code
        let state = ctx.query.state; // 直接兑换
        client.getAccessToken(code, function (err, result) { // code向服务器请求的结果
            if (checkmode(result) && checkcode(result)) { // true true
                console.info('#### 有code的高级授权');
                let tmpid = result.data.openid;
                ctx.session.openid = tmpid;
                getInfoFromWX(tmpid, function (doc) {
                    if (doc) {
                        callback(undefined, doc);
                    } else {
                        callback(undefined, '# 微信高级授权失败');
                        /*
                        //access数据过期
                        var tmp = url.replace(/code=/g, "codeused="); //去除使用过的code，重新走流程获取
                        url = tmp.replace(/state=/g, "stateused="); //去除使用过的state，重新走流程获取
                        var urlx = client.getAuthorizeURL(url, 'getuserinfo', 'snsapi_userinfo');
                        callback(urlx, undefined); //高级授权申请，带code跳转
                        */
                    }
                });
            } else if (!checkmode(result) && checkcode(result)) { // false true
                console.info('#### 有code的初级授权');
                let tmpid = result.data.openid;
                ctx.session.openid = tmpid;
                getWithID(tmpid, url, callback);
            } else { // false/true false
                console.info('# 授权失败');
                //var tmp = url.replace(/code=/g, "codeused="); //去除使用过的code，重新走流程获取
                //tmp = tmp.replace(/state=/g, "stateused="); //去除使用过的state，重新走流程获取
                //tmp = url;
                const tmp = url;
                let urlx;
                if (state == 'getuserinfo') { //更换code
                    urlx = client.getAuthorizeURL(tmp, 'getuserinfo', 'snsapi_userinfo'); //更换新的code
                } else {
                    urlx = client.getAuthorizeURL(tmp, 'getopenid', 'snsapi_base'); //更换新的code
                }
                //页面可以根据codeused来关闭页面
                callback(urlx, undefined); //初级授权模式，得不到id，因为使用了过期的code,跳转为没有code状态
            }
        });
    }

}

/*
有id的判断
*/
function getWithID(tmpid, url, callback) {
    getinfo(tmpid, function (doc) {
        if (doc) { // 本地缓存看有没有
            callback(undefined, doc);
        } else {
            //var tmp = url.replace(/code=/g, "codeused="); //去除使用过的code，重新走流程获取
            //url = tmp.replace(/state=/g, "stateused="); //去除使用过的state，重新走流程获取
            
            let urlx = client.getAuthorizeURL(url, 'getuserinfo', 'snsapi_userinfo');
            callback(urlx, undefined); //高级授权申请，带code跳转
        }
    });
}
/*
获取个人信息
*/
function getinfo(openid, callback) {
    getInfoFromDB(openid, function (doc) { // 从本地服务器数据库拿
        if (doc) {
            callback(doc);
        } else {
            getInfoFromWX(openid, function (doc) { // 从微信服务器拿 access数据过期前可拿
                if (doc) {
                    callback(doc);
                } else {
                    //access数据过期
                    callback(undefined);
                }
            });
        }
    });
}


/*
从数据库抽取个人数据，如果数据过期，则从微信读取
*/
function getInfoFromDB(openid, callback) { // 数据库拿的

    callback(false);
    return;
    // 阻断

    // 从数据库读取用户信息
    /*
    new User().getInfoByWX(openid).then(doc => { // 已经创建了
        if (doc && doc.time && (new Date().getTime()) - doc.time < 3600 * 1000 * 24 * 30) {
            callback(doc); //30天内没过期的情况
        } else {
            callback(undefined);
        }
    });
    */
    /*
    async function runbot() {
       return await readFromDB();
    }
    runbot(openid).then(function(doc) {
	    if(doc) callback(doc);
        else callback(undefined); // 设置为读取不到
    });
    */
   
   
}

// 补充
async function readFromDB() {

    return true;
}

// 补充
function saveToDB() {
    // 本地数据库缓存
}

/*
从微信抽取个人数据
*/
function getInfoFromWX(openid, callback) {
    client.getUser(openid, function (err, result) { // 自动搜索数据库获取access token
        if (err) { //如果失效重新获取
            callback(undefined);
        } else {
            // 从微信获得个人资料后更新到数据库，并且增加字段
            saveToDB(openid, result);
            // 从微信获取到高级信息
            callback(result); 
        }
    });
}

/*
判断mode是初级还是高级
*/
function checkmode(result) {
    if (result && result.data && result.data.scope) {
        if(result.data.scope == 'snsapi_userinfo'){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/*
判断code有效性
*/
function checkcode(result) {
    if (result && result.data && result.data.openid) {
        return true;
    } else {
        return false;
    }
}

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}