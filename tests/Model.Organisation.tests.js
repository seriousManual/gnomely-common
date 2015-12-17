var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

describe('OrganisationModel', function () {
    var OrganisationModel;

    before(function (done) {
        OrganisationModel = require('../lib/persistence/model/Organisation');

        require('./util/dbPrepare.oneOrganisation.oneUser.threeWishes.js')(done);
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

    describe('population', function() {
        var org;

        before(function(done) {
            OrganisationModel
                .findOne({ident: 'foo_organisation'})
                .populate('members', '_id name mail')
                .populate('administrators', '_id name mail')
                .exec(function(error, _org) {
                    org = _org;

                    done(error);
                });
        });

        it('should populate members and administrators', function() {
            expect(org.members[0].name).to.equal('fooName');
            expect(org.administrators[0].name).to.equal('fooName');
        });
    })
});