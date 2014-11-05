var JobModel = require('../model/Job');
var MailJob = require('../../backend/MailJob');

function JobLoader () {

}

JobLoader.prototype.loadJobsSinceDate = function (sinceDate, callback) {
    JobModel
        .find({createDate: {
            '$gt': sinceDate
        }})
        .exec(callback);
};

JobLoader.prototype.loadJobsByTypeSinceDate = function (type, sinceDate, callback) {
    JobModel
        .find({
            type: type,
            createDate: {'$gt': sinceDate}
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

module.exports = JobLoader;