var util = require('util');

var Job = require('./Job');

function MailJob(from, to, subject, template, data) {
    this._payload = {
        from: from,
        to: to,
        subject: subject,
        template: template,
        data: data
    };

    Job.call(this, 'mail');
}

util.inherits(MailJob, Job);

MailJob.prototype.createPersistenceJob = function() {
    return this._createPersistenceJob(this._payload);
};

module.exports = MailJob;