var util = require('util');

var Job = require('./Job');

var JOB_KEY = 'invite';

function InviteJob (id, name, mail, token, orgIdent) {
    this._id = id || null;

    this._payload = {
        name: name,
        mail: mail,
        token: token,
        orgIdent: orgIdent
    };

    Job.call(this, JOB_KEY);
}

util.inherits(InviteJob, Job);

InviteJob.prototype.createPersistenceJob = function () {
    return this._createPersistenceJob(this._payload);
};

InviteJob.fromPersistenceJob = function(persistenceJob) {
    var payload = persistenceJob.payload;
    var id = persistenceJob._id;

    return new InviteJob(id, payload.name, payload.mail, payload.token, payload.orgIdent);
};

InviteJob.prototype.id = function(id) {
    if (id !== undefined) this._id = id;

    return this._id;
};

InviteJob.prototype.name = function() {
    return this._payload.name;
};

InviteJob.prototype.mail = function() {
    return this._payload.mail;
};

InviteJob.prototype.token = function() {
    return this._payload.token;
};

InviteJob.prototype.orgIdent = function() {
    return this._payload.orgIdent;
};

InviteJob.key = JOB_KEY;

module.exports = InviteJob;