function LinkGenerator(base) {
    this._base = base;
}

LinkGenerator.prototype.generateOrganisationUrl = function (organisationIdent) {
    //http://gnomely.ernestly.com/#/org/ernst_family
    return this._base + '/#/org/' + organisationIdent;
};

LinkGenerator.prototype.generateInviteUrl = function (organisationIdent) {
    //http://gnomely.ernestly.com/#/org/ernst_family/invite
    return this._base + '/#/org/' + organisationIdent + '/invite';
};

module.exports = LinkGenerator;