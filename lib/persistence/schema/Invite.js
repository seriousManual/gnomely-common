var mongoose = require('mongoose');

var inviteSchema = mongoose.Schema({
    organisationId: {type: String, required: true},
    ack: {type: Boolean, 'default': false},
    mail: String,
    name: String,
    createDate: {type: Date, 'default': function () {
        return new Date();
    }}
});

module.exports = inviteSchema;