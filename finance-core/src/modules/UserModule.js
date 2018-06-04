/*
用户通过唯一id创建，可以是openid（唯一）或者或者账户密码登陆
进入页面时候如果无openid则通过手机登陆，如果有openid则手机登陆时候进行绑定
无openid每次进入都需要手机验证码

有openid则优先创建，进入页面后的手机绑定进行资料增加
无openid则不需要创建，进入页面后通过手机号码创建，手机登陆后自动绑定


用户字段
userid:
openid:(有即可创建，但第一次需要)
mobile:(后面强制绑定，绑定手机找回账户，手机不可解绑)
head:
nickname:
name:
account:{username: password} (方便前端调试)


*/
const mongoose = require('mongoose');

/*
通过openid获取用户具体信息
通过账户密码获取用户具体信息
*/