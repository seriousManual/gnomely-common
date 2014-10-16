var mongoose = require('mongoose');

var userSchema = require('../schema/User');

module.exports = mongoose.model('User', userSchema);