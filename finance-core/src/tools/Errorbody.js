'use strict'
/**
 * Created by karonl on 2017/1/2.
 */


function ERO(code, string, errmsg, obj) {
	if(!obj)
		return JSON.stringify({errCode:code, name:string, content:errmsg});
	else
    	return JSON.stringify({errCode:code, errmsg:errmsg, name:string, content:obj});
};


module.exports = ERO;