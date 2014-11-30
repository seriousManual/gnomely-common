var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createDate: {type: Date, 'default': function () {
        return new Date();
    }},
    text: String
});

module.exports = commentSchema;