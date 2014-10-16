var mongoose = require('mongoose');

var commentSchema = require('./Comment');
var likeSchema = require('./Like');

var wishSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    organisation: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    bought: {
        createDate: Date,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    comments: [commentSchema],
    likes: [likeSchema],
    createDate: { type: Date, 'default': function () { return new Date(); } },
    changeDate: Date
});

wishSchema.pre('save', function (next) {
    this.changeDate = new Date();

    next();
});

module.exports = wishSchema;