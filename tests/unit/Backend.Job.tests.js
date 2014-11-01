var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

describe('backendJob', function () {
    describe('Job', function () {
        var job, Job;

        before(function () {
            Job = require('../../lib/backend/Job');
            job = new Job('foo');
        });

        it('should create a PersistenceJob', function () {
            var createdJob = job._createPersistenceJob({foo: 'bar'}).toJSON();

            expect(createdJob.type).to.equal('foo');
            expect(createdJob.payload).to.deep.equal({foo: 'bar'});
        });

        it('should throw', function () {
            expect(function () {
                job.createPersistenceJob();
            }).to.throw();
        });
    });

    describe('MailJob', function () {
        var MailJob;

        before(function () {
            MailJob = require('../../').jobs.Mail;
        });

        describe('createJob', function() {
            var mailJob;

            before(function () {
                mailJob = new MailJob('fromFoo', 'toFoo', 'subjectFoo', 'templateFoo', {data: 'foo'}, 'de');
            });

            it('should return the correct Job', function () {
                var createdJob = mailJob.createPersistenceJob().toJSON();

                expect(createdJob.type).to.equal('mail');
                expect(createdJob.payload).to.deep.equal({
                    to: 'toFoo',
                    from: 'fromFoo',
                    subject: 'subjectFoo',
                    template: 'templateFoo',
                    data: {
                        data: 'foo'
                    },
                    language: 'de'
                });
            });
        });

        describe('createJob from payload', function() {
            var createdJob;

            before(function() {
                createdJob = MailJob.fromPayload({
                    to: 'toFoo', from: 'fromFoo', subject: 'subjectFoo', template: 'templateFoo', data: {data: 'foo'}, language: 'fooLanguage'
                }).createPersistenceJob().toJSON();
            });

            it('should return the correct Job from payload', function () {
                expect(createdJob.type).to.equal('mail');
                expect(createdJob.payload).to.deep.equal({
                    to: 'toFoo',
                    from: 'fromFoo',
                    subject: 'subjectFoo',
                    template: 'templateFoo',
                    data: {
                        data: 'foo'
                    },
                    language: 'fooLanguage'
                });
            });
        });
    });
});