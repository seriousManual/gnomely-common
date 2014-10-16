var mongoose = require('mongoose');

var organisationModel = require('../schema/Organisation');

module.exports = mongoose.model('Organisation', organisationModel);