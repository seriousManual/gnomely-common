var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

describe('JobLoader', function () {
    var JobLoader;

    before(function (done) {
        JobLoader = require('../index').loader.JobLoader;

        require('./util/dbPrepare.threeJobs.js')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('latestJobs', function () {
        var error, jobs;

        before(function (done) {
            (new JobLoader()).loadJobsSinceDate(new Date(2014, 1, 28), function (_error, _jobs) {
                error = _error;
                jobs = _jobs;
                done();
            });
        });

        it('should load the latest wishes since date', function () {
            expect(error).to.be.null;
            expect(jobs.length).to.equal(2);
        });
    });

    describe('latestJobsByType', function () {
        var error, jobs;

        before(function (done) {
            (new JobLoader()).loadJobsByTypeSinceDate('fooType', new Date(2014, 5, 1), function (_error, _jobs) {
                error = _error;
                jobs = _jobs;
                done();
            });
        });

        it('should load the latest wishes since date', function () {
            expect(error).to.be.null;
            expect(jobs.length).to.equal(1);
            expect(jobs[0].type).to.equal('fooType');
        });
    });

    describe('unacknowledgedByType', function () {
        var error, jobs;

        before(function (done) {
            (new JobLoader()).loadJobsUnacknowledgedByType('fooType', function (_error, _jobs) {
                error = _error;
                jobs = _jobs;
                done();
            });
        });

        it('should load the latest wishes since date', function () {
            expect(error).to.be.null;
            expect(jobs.length).to.equal(1);
            expect(jobs[0].type).to.equal('fooType');
        });
    });

    describe('acknowledge', function () {
        var error, job;

        before(function (done) {
            (new JobLoader()).acknowledgeJob('54454b2973fca3141c272d1e', function (_error, _job) {
                error = _error;
                job = _job;
                done();
            });
        });

        it('should load the latest wishes since date', function () {
            expect(error).to.be.null;
            expect(job.ack).to.be.true;
        });
    });

    describe('createMailJob', function() {
        var error, job;

        before(function (done) {
            (new JobLoader()).createMailJob('fooFrom@mail.com', 'fooTo@mail.com', 'fooWishSubject', 'fooWishBody', {foo: 'bar'}, 'de', function(_error, _job) {
                error = _error;
                job = _job;
                done();
            });
        });

        it('should not return an error', function() {
            expect(error).to.be.null;
        });

        it('should create an job', function() {
            expect(job.type).to.equal('mail');
            expect(job.payload).to.deep.equal({
                data: {foo: 'bar'},
                from: 'fooFrom@mail.com',
                language: 'de',
                subject: 'fooWishSubject',
                template: 'fooWishBody',
                to: 'fooTo@mail.com'
            });
            expect(job.ack).to.be.false;
        });
    });

    describe('createInviteJob', function() {
        var error, job;

        before(function (done) {
            (new JobLoader()).createInviteJob('fooName', 'fooMail', 'fooToken', 'fooOrgIdent', function(_error, _job) {
                error = _error;
                job = _job;
                done();
            });
        });

        it('should not return an error', function() {
            expect(error).to.be.null;
        });

        it('should create an job', function() {
            expect(job.type).to.equal('invite');
            expect(job.payload).to.deep.equal({
                name: 'fooName',
                mail: 'fooMail',
                token: 'fooToken',
                orgIdent: 'fooOrgIdent'
            });
            expect(job.ack).to.be.false;
        });
    });
});