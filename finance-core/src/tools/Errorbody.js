'use strict'
/**
 * Created by karonl on 2017/1/2.
 */


function ERO(code, string, errmsg, obj) {
	if(!obj)
		return {errCode:code, name:string, content:errmsg};
	else
    	return {errCode:code, errmsg:errmsg, name:string, content:obj};
};


module.exports = ERO;