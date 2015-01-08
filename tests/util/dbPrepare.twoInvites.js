var async = require('async');

var InviteModel = require('../../lib/persistence/model/Invite');

function dbPrepare (callback) {
    async.parallel([
        function (callback) {
            (new InviteModel({
                _id: '54454b2973fca3141c272d0c',
                organisationId: 'fooOrgIdent',
                ack: false,
                mail: 'fooMail',
                name: 'fooName',
                createDate: new Date(2014, 0, 1)
            })).save(callback);
        },
        function (callback) {
            (new InviteModel({
                _id: '54454b2973fca3141c272d0b',
                organisationId: 'fooOrgIdent',
                ack: false,
                mail: 'barMail',
                name: 'barName',
                createDate: new Date(2014, 0, 1)
            })).save(callback);
        },
        function (callback) {
            (new InviteModel({
                _id: '54454b2973fca3141c272d0a',
                organisationId: 'fooOrgIdent',
                ack: false,
                mail: 'bazMail',
                name: 'bazName',
                createDate: new Date(2014, 0, 1)
            })).save(callback);
        }
    ], callback);

}

module.exports = dbPrepare;