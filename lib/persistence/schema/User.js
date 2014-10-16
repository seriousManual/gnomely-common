var crypto = require('crypto');
var util = require('util');

var mongoose = require('mongoose');

var createRandomString = require('../../util/randomString');

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true},
    organisations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Organisation'}],
    salt: {type: String, 'default': function () {
        return createRandomString(15);
    }},
    createDate: {type: Date, 'default': function () {
        return new Date();
    }},
    changeDate: Date
});

userSchema.methods.checkPassword = function (candidatePassword) {
    return verifyLogin(this, candidatePassword);
};

userSchema.pre('save', function (next) {
    this.changeDate = new Date();

    if (this.isModified('password')) this.password = createHash(this.salt, this.password);

    next();
});

function createHash (salt, password) {
    var shasum = crypto.createHash('sha256');

    var schema = util.format('%s_%s', salt, password);
    shasum.update(schema);

    return shasum.digest('hex');
}

function verifyLogin (user, password) {
    var testHash = createHash(user.salt, password);

    return testHash === user.password;
}

module.exports = userSchema;