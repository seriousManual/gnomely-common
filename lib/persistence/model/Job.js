var mongoose = require('mongoose');

var userSchema = require('../schema/Job');

module.exports = mongoose.model('Job', userSchema);