var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    author: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    createDate: {type: Date, 'default': function () {
        return new Date();
    }},
    text: String
});

module.exports = commentSchema;