var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('JobModel', function () {
    var JobModel, clock;

    before(function () {
        JobModel = require('../../lib/persistence/model/Job');
        clock = sinon.useFakeTimers(0, 'Date');
    });

    after(function () {
        clock.restore();
        mockgoose.reset();
    });

    describe('create a job /w fail', function () {
        var j, error;

        before(function (done) {
            j = new JobModel({});
            j.save(function (_error) {
                error = _error;
                done();
            });
        });

        it('should return the correct error', function () {
            expect(error.message).to.equal('Validation failed');
        });
    });

    describe('create a job /w success', function () {
        var j, error;

        before(function (done) {
            j = new JobModel({
                type: 'fooType'
            });
            j.save(function (_error) {
                error = _error;
                done();
            });
        });

        it('should return the correct error', function () {
            expect(j.type).to.equal('fooType');
            expect(j.createDate.toString()).to.match(/Thu Jan 01 1970/);
            expect(j.payload).to.deep.equal({});
            expect(j.ackDate).to.be.null;
        });
    });

    describe('create a job /w success /w payloade', function () {
        var j, error;

        before(function (done) {
            j = new JobModel({
                type: 'fooType',
                payload: {foo: 'bar'},
                ackDate: new Date()
            });
            j.save(function (_error) {
                error = _error;
                done();
            });
        });

        it('should return the correct error', function () {
            expect(j.type).to.equal('fooType');
            expect(j.createDate.toString()).to.match(/Thu Jan 01 1970/);
            expect(j.payload).to.deep.equal({foo: 'bar'});
            expect(j.ackDate.toString()).to.match(/Thu Jan 01 1970/);
        });
    });
});