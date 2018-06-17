'use strict'
const mongoose = require('mongoose');
const MachineSchema = new mongoose.Schema({
    user:  { // 用户id
        type : mongoose.Schema.ObjectId,
        ref : 'User' // 关联用户架构
    },
    snap:  { // 快照id
        type : mongoose.Schema.ObjectId,
        ref : 'StuffSnap' // 关联商品快照
    },
    code: String // 机器id

});

MachineSchema.statics.add = async function(userid, snap, code) {
    
    let state = await this.findOne({code: code}, {snap: snap, _id: userid}).exec();
    if(!state) {
        state = await this.create({_id: userid, snap: snap, code: code});
        return state;
    }
    return undefined;
}

MachineSchema.statics.list = async function (userid) {
    let num = await this.find({_id: userid}).exec();
	return num;
};

module.exports = MachineSchema;
