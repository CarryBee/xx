'use strict'
const mongoose = require('mongoose');
const UnidSchema = new mongoose.Schema({
    key: Number

});

//unin id
UnidSchema.statics.get = async function () {
    let num = await this.findOneAndUpdate({},{$inc:{key: 1}}, {new:true}).exec();
    if(!num || !num.key) {
        num = await this.create({key: 20000});
        num.key = 20000;
    }
	return num.key;
};

module.exports = UnidSchema;
