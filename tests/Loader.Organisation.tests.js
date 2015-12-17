var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

describe('OrganisationLoader', function () {
    var organisation, OrganisationLoader;

    before(function (done) {
        OrganisationLoader = require('../index').loader.OrganisationLoader;

        require('./util/dbPrepare.oneOrganisation.oneUser.threeWishes.js')(done);
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
            expect(result.members[0]._id.toString()).to.equal('50341373e894ad16347efe02');
            expect(result.members[0].mail).to.equal('foo@mail.com');
        });

        it('should load the administrators', function() {
            expect(result.administrators[0]._id.toString()).to.equal('50341373e894ad16347efe02');
            expect(result.administrators[0].name).to.equal('fooName');
            expect(result.administrators[0].mail).to.equal('foo@mail.com');
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