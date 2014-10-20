var async = require('async');

var UserModel = require('../../lib/persistence/model/User');
var OrganisationModel = require('../../lib/persistence/model/Organisation');
var WishModel = require('../../lib/persistence/model/Wish');

function dbPrepare (callback) {
    async.parallel([
        function (callback) {
            (new OrganisationModel({
                _id: '50341373e894ad16347efe01',
                name: 'Foo Organisation',
                members: ['50341373e894ad16347efe02']
            })).save(callback);
        },
        function (callback) {
            (new UserModel({
                _id: '50341373e894ad16347efe02',
                name: 'fooName',
                mail: 'foo@mail.com',
                password: 'fooPassword',
                organisations: ['50341373e894ad16347efe01']
            })).save(callback);
        },
        function (callback) {
            (new WishModel({
                _id: '50341373e894ad16347efe03',
                title: 'fooTitle1',
                content: 'fooContent1',
                organisation: 'foo_organisation',
                author: '50341373e894ad16347efe02'
            })).save(callback);
        },
        function (callback) {
            (new WishModel({
                _id: '50341373e894ad16347efe04',
                title: 'fooTitle2',
                content: 'fooContent2',
                organisation: 'foo_organisation',
                author: '50341373e894ad16347efe02'
            })).save(callback);
        },
        function (callback) {
            (new WishModel({
                _id: '50341373e894ad16347efe05',
                title: 'fooTitle3',
                content: 'fooContent3',
                organisation: 'foo_organisation',
                author: '50341373e894ad16347efe02',
                bought: {
                    author: '50341373e894ad16347efe02'
                },
                comments: [
                    {
                        _id: '50313373e894ad16347efe05',
                        author: {_id: '50341373e894ad16347efe02', name: 'fooName'},
                        text: 'fooCommentText'
                    }
                ]
            })).save(callback);
        }
    ], callback);

}

module.exports = dbPrepare;