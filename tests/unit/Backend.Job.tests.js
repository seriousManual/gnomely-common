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

        it('should hava a key', function() {
            expect(MailJob.key).to.equal('mail');
        });

        describe('createJob', function() {
            var mailJob;

            before(function () {
                mailJob = new MailJob('fromFoo', 'toFoo', 'subjectFoo', 'templateFoo', {data: 'foo'}, 'de');
                mailJob.id('idFoo');
            });

            it('should return the correct Job', function () {
                var persistenceJob = mailJob.createPersistenceJob().toJSON();

                expect(persistenceJob.type).to.equal('mail');
                expect(persistenceJob.payload).to.deep.equal({
                    to: 'toFoo',
                    from: 'fromFoo',
                    subject: 'subjectFoo',
                    template: 'templateFoo',
                    data: {
                        data: 'foo'
                    },
                    language: 'de'
                });

                expect(mailJob.id()).to.equal('idFoo');
                expect(mailJob.to()).to.equal('toFoo');
                expect(mailJob.from()).to.equal('fromFoo');
                expect(mailJob.subject()).to.equal('subjectFoo');
                expect(mailJob.template()).to.equal('templateFoo');
                expect(mailJob.data()).to.deep.equal({data: 'foo'});
                expect(mailJob.language()).to.equal('de');
            });
        });

        describe('createJob from payload', function() {
            var persistenceJob, mailJob;

            before(function() {
                mailJob = MailJob.fromPayload({
                    to: 'toFoo', from: 'fromFoo', subject: 'subjectFoo', template: 'templateFoo', data: {data: 'foo'}, language: 'fooLanguage'
                });
                mailJob.id('idFoo');
                persistenceJob = mailJob.createPersistenceJob().toJSON();
            });

            it('should return the correct Job from payload', function () {
                expect(persistenceJob.type).to.equal('mail');
                expect(persistenceJob.payload).to.deep.equal({
                    to: 'toFoo',
                    from: 'fromFoo',
                    subject: 'subjectFoo',
                    template: 'templateFoo',
                    data: {
                        data: 'foo'
                    },
                    language: 'fooLanguage'
                });

                expect(mailJob.id()).to.equal('idFoo');
                expect(mailJob.to()).to.equal('toFoo');
                expect(mailJob.from()).to.equal('fromFoo');
                expect(mailJob.subject()).to.equal('subjectFoo');
                expect(mailJob.template()).to.equal('templateFoo');
                expect(mailJob.data()).to.deep.equal({data: 'foo'});
                expect(mailJob.language()).to.equal('fooLanguage');
            });
        });
    });
});