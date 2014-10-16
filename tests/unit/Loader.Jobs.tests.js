var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('JobLoader', function () {
    var JobLoader;

    before(function (done) {
        JobLoader = require('../../lib/persistence/loader/JobLoader');

        var JobModel = require('../../lib/persistence/model/Job');

        require('../util/dbPrepare.threeJobs')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('latestJobs', function() {
        var jobLoader, error, jobs;

        before(function(done) {
            (new JobLoader()).loadJobsSinceDate(new Date(2014, 1, 28), function(_error, _jobs) {
                error = _error;
                jobs = _jobs;
                done();
            });
        });

        it('should load the latest wishes since date', function() {
            expect(error).to.be.null;
            expect(jobs.length).to.equal(2);
        });
    })
});