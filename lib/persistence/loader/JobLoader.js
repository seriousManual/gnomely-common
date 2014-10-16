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

module.exports = JobLoader;