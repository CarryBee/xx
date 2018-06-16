var crypto = require("crypto");
var SHA = function(){};

SHA.prototype.set = function(str){
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

module.exports = SHA;