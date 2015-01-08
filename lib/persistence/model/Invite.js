var mongoose = require('mongoose');

var inviteSchema = require('../schema/Invite');

module.exports = mongoose.model('Invite', inviteSchema);