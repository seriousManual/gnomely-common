var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createDate: {type: Date, 'default': function () {
        return new Date();
    }}
});

module.exports = likeSchema;