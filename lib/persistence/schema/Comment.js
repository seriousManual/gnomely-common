var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createDate: {type: Date, 'default': function () {
        return new Date();
    }},
    text: String
});

module.exports = commentSchema;