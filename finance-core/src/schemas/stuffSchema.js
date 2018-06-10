'use strict'
const mongoose = require('mongoose');
const stuffSchema = new mongoose.Schema({
    title: String
});

stuffSchema.methods.speak = function () {
  return this._id;
};

stuffSchema.statics.findxx = function () {
    return this.findOne({}).exec();
};

module.exports = stuffSchema;