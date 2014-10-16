var OrganisationModel = require('../model/Organisation');

function OrganisationLoader () {

}

OrganisationLoader.prototype.loadOrganisationByIdent = function (ident, callback) {
    OrganisationModel
        .findOne({ident: ident})
        .populate('members', 'name _id')
        .exec(callback);
};

module.exports = OrganisationLoader;