var util = require('util');

var Job = require('./Job');

var JOB_KEY = 'mail';

function MailJob (from, to, subject, template, data, language) {
    this._id = null;

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

MailJob.prototype.id = function(id) {
    if (id !== undefined) this._id = id;

    return this._id;
};

MailJob.prototype.from = function() {
    return this._payload.from;
};

MailJob.prototype.to = function() {
    return this._payload.to;
};

MailJob.prototype.subject = function() {
    return this._payload.subject;
};

MailJob.prototype.template = function() {
    return this._payload.template;
};

MailJob.prototype.data = function() {
    return this._payload.data;
};

MailJob.prototype.language = function() {
    return this._payload.language;
};

MailJob.key = JOB_KEY;

module.exports = MailJob;