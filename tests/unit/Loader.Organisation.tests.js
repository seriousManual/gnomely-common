var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('OrganisationLoader', function () {
    var organisation, OrganisationLoader;

    before(function (done) {
        OrganisationLoader = require('../../lib/persistence/loader/OrganisationLoader');

        //the models would not have been initialized otherwise..... dirty hack
        var UserModel = require('../../lib/persistence/model/User');
        var OrganisationModel = require('../../lib/persistence/model/Organisation');

        require('../util/dbPrepare.oneOrganisation.oneUser.threeWishes')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('loadOrganisationByIdent (found)', function () {
        var result, error;

        before(function (done) {
            var organisationLoader = new OrganisationLoader();

            organisationLoader.loadOrganisationByIdent('foo_organisation', function (_error, _result) {
                error = _error;
                result = _result;
                done();
            });
        });

        it('should not return an error', function () {
            expect(error).to.be.null;
        });

        it('should load the correct organisation', function () {
            expect(result.name).to.equal('Foo Organisation');
        });

        it('should load the members', function () {
            expect(result.members[0].name).to.equal('fooName');
        });
    });

    describe('loadOrganisationByIdent (not found)', function () {
        var result, error;

        before(function (done) {
            var organisationLoader = new OrganisationLoader();

            organisationLoader.loadOrganisationByIdent('i_dont_exist', function (_error, _result) {
                error = _error;
                result = _result;
                done();
            });
        });

        it('should not return an error', function () {
            expect(error).to.be.null;
        });

        it('should load the correct organisation', function () {
            expect(result).to.be.null;
        });
    });
});