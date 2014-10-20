var async = require('async');

var JobModel = require('../../lib/persistence/model/Job');

function dbPrepare (callback) {
    async.parallel([
        function (callback) {
            (new JobModel({
                _id: '54454b2973fca3141c272d0e',
                type: 'fooType',
                createDate: new Date(2014, 0, 1),
                ack: true,
                payload: {
                    foo: 'bar'
                }
            })).save(callback);
        },
        function (callback) {
            (new JobModel({
                _id: '54454b2973fca3141c272d1e',
                type: 'fooType',
                createDate: new Date(2014, 6, 1),
                payload: {
                    foo: 'bar'
                }
            })).save(callback);
        },
        function (callback) {
            (new JobModel({
                _id: '54454b2973fca3141c272d2e',
                type: 'barType',
                createDate: new Date(2014, 8, 1),
                payload: {
                    bar: 'foo'
                }
            })).save(callback);
        }
    ], callback);

}

module.exports = dbPrepare;