var JobModel = require('../model/Job');

var InviteModel = require('../model/Invite');

function MiscLoader () {

}

MiscLoader.prototype.loadInviteById = function (inviteId, callback) {
    InviteModel
        .findOne({_id: inviteId})
        .exec(callback);
};

MiscLoader.prototype.acknowledgeInvite = function (inviteId, callback) {
    InviteModel
        .findByIdAndUpdate(inviteId, {ack: true })
        .exec(callback);
};

MiscLoader.prototype.createInvite = function (organisationId, mail, name, callback) {
    (new InviteModel({organisationId: organisationId, mail: mail, name: name}))
        .save(callback);
};

module.exports = MiscLoader;