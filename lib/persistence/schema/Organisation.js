var mongoose = require('mongoose');

var organisationSchema = mongoose.Schema({
    name: String,
    ident: { type: String, index: { unique: true } },
    members: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    createDate: { type: Date, 'default': function () {
        return new Date();
    } }
});

organisationSchema.pre('save', function (next) {
    this.ident = createIdent(this.name);

    next();
});

function createIdent (organisationName) {
    return organisationName
        .replace(/\s/g, '_')
        .replace(/ö/g, 'oe')
        .replace(/ä/g, 'ae')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-zA-Z0-9_]/g, '')
        .toLowerCase();
}

module.exports = organisationSchema;