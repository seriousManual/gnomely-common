var util = require('util');

var Job = require('./Job');

var JOB_KEY = 'mail';

function MailJob (from, to, subject, template, data, language) {
    this._payload = {
        from: from,
        to: to,
        subject: subject,
        template: template,
        data: data,
        language: language
    };

    Job.call(this, JOB_KEY);
}

util.inherits(MailJob, Job);

MailJob.prototype.createPersistenceJob = function () {
    return this._createPersistenceJob(this._payload);
};

MailJob.fromPayload = function(payload) {
    return new MailJob(payload.from, payload.to, payload.subject, payload.template, payload.data, payload.language);
};

module.exports = MailJob;