var PersistenceJob = require('../persistence/model/Job');

function Job (type) {
    this._type = type;
}

Job.prototype._createPersistenceJob = function (payload) {
    return new PersistenceJob({
        type: this._type,
        payload: payload
    });
};

Job.prototype.createPersistenceJob = function () {
    throw new Error('"createPersistenceJob" not impelemented');
};

module.exports = Job;