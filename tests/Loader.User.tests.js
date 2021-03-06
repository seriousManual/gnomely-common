var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

describe('UserLoader', function () {
    var user, UserLoader;

    before(function (done) {
        UserLoader = require('../index').loader.UserLoader;

        require('./util/dbPrepare.oneOrganisation.oneUser.threeWishes.js')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('loadUserByMail (found)', function () {
        var result, error;

        before(function (done) {
            var userLoader = new UserLoader();

            userLoader.loadUserByMail('foo@mail.com', function (_error, _result) {
                error = _error;
                result = _result;
                done();
            });
        });

        it('should not return an error', function () {
            expect(error).to.be.null;
        });

        it('should load the correct user', function () {
            expect(result.name).to.equal('fooName');
            expect(result.organisations[0].ident).to.equal('foo_organisation');
            expect(result.organisations[0].name).to.equal('Foo Organisation');
        });
    });

    describe('loadUserByMail (not found)', function () {
        var result, error;

        before(function (done) {
            var userLoader = new UserLoader();

            userLoader.loadUserByMail('not@found.com', function (_error, _result) {
                error = _error;
                result = _result;
                done();
            });
        });

        it('should not return an error', function () {
            expect(error).to.be.null;
        });

        it('should load the correct user', function () {
            expect(result).to.be.null
        });
    });

    describe('loadUserById (not found)', function () {
        var result, error;

        before(function (done) {
            var userLoader = new UserLoader();

            userLoader.loadUserById('50341373e894ad16347fff02', function (_error, _result) {
                error = _error;
                result = _result;
                done();
            });
        });

        it('should not return an error', function () {
            expect(error).to.be.null;
        });

        it('should load the correct user', function () {
            expect(result).to.be.null
        });
    });

    describe('loadUserById (found)', function () {
        var result, error;

        before(function (done) {
            var userLoader = new UserLoader();

            userLoader.loadUserById('50341373e894ad16347efe02', function (_error, _result) {
                error = _error;
                result = _result;
                done();
            });
        });

        it('should not return an error', function () {
            expect(error).to.be.null;
        });

        it('should load the correct user', function () {
            expect(result.name).to.equal('fooName');
            expect(result.organisations[0].ident).to.equal('foo_organisation');
            expect(result.organisations[0].name).to.equal('Foo Organisation');
        });
    });
});