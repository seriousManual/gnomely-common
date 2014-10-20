var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    createDate: {type: Date, 'default': function () {
        return new Date();
    }},
    ack: {type: Boolean, 'default': false},
    type: {type: String, required: true},
    payload: {type: mongoose.Schema.Types.Mixed, 'default': function () {
        return {};
    }}
});

module.exports = jobSchema;