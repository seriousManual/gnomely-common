var JobModel = require('../model/Job');

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

module.exports = JobLoader;