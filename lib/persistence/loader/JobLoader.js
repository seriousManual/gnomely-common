var JobModel = require('../model/Job');

var MailJob = require('../../backend/MailJob');
var InviteJob = require('../../backend/InviteJob');

function JobLoader () {

}

JobLoader.prototype.loadJobsSinceDate = function (sinceDate, callback) {
    JobModel
        .find({createDate: {
            '$gt': new Date(sinceDate)
        }})
        .exec(callback);
};

JobLoader.prototype.loadJobsByTypeSinceDate = function (type, sinceDate, callback) {
    JobModel
        .find({
            type: type,
            createDate: {'$gt': new Date(sinceDate)}
        })
        .exec(callback);
};

JobLoader.prototype.loadJobsUnacknowledgedByType = function (type, callback) {
    JobModel
        .find({ type: type,ack: false })
        .exec(callback);
};

JobLoader.prototype.acknowledgeJob = function(id, callback) {
    JobModel
        .findByIdAndUpdate(id, {ack: true })
        .exec(callback);
};

JobLoader.prototype.createMailJob = function (from, to, subjectTemplate, bodyTemplate, data, language, callback) {
    (new MailJob(null, from, to, subjectTemplate, bodyTemplate, data, language))
        .createPersistenceJob()
        .save(callback);
};

JobLoader.prototype.createInviteJob = function (name, mail, token, orgIdent, callback) {
    (new InviteJob(null, name, mail, token, orgIdent))
        .createPersistenceJob()
        .save(callback);
};

module.exports = JobLoader;