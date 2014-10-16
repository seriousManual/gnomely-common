var mongoose = require('mongoose');

var wishSchema = require('../schema/Wish');

module.exports = mongoose.model('Wish', wishSchema);