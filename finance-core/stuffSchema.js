'use strict'
const mongoose = require('mongoose');
const stuffSchema = new mongoose.Schema({
    title: String
});

stuffSchema.methods.speak = function () {
  return this.title;
};

stuffSchema.statics.findxx = function () {
    console.log("x");
    return this.find({"title":"zx"}).exec();
};

module.exports = stuffSchema;
