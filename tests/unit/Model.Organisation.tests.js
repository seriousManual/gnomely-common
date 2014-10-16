var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('OrganisationModel', function () {
    var OrganisationModel;

    before(function (done) {
        OrganisationModel = require('../../lib/persistence/model/Organisation');

        require('../util/dbPrepare.oneOrganisation.oneUser.threeWishes')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('create organisation', function () {
        var o;

        before(function (done) {
            o = new OrganisationModel({name: '!Bräten mit Sößü!'});
            o.save(done);
        });

        it('should create the correct organisation ident', function () {
            expect(o.ident).to.equal('braeten_mit_soessue');
        });

        it('should save the name', function () {
            expect(o.name).to.equal('!Bräten mit Sößü!');
        });
    });

    describe('create existing organisation', function () {
        it('should return an error', function () {
            (new OrganisationModel({name: 'Foo Organisation'})).save(function (error, result) {
                expect(error.message).to.equal('E11000 duplicate key error index: ident');
            });
        });
    });
});