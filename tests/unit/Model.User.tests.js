var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;

var mocks = require('../util/mocks');

describe('UserModel', function () {
    var UserModel;

    before(function () {
        UserModel = require('../../lib/persistence/model/User');
    });

    after(function () {
        mockgoose.reset();
    });

    describe('no salt', function () {
        var u;

        before(function (done) {
            u = new UserModel({name: 'fooName', mail: 'foo@mail.com', password: 'fooPass'});
            u.save(done);
        });

        it('should hash the password', function () {
            expect(u.password.length).to.equal(64);
        });

        it('should have created a salt', function () {
            expect(u.salt.length).to.equal(15);
        });

        it('should save the mail', function () {
            expect(u.mail).to.equal('foo@mail.com');
        });

        it('should save the name', function () {
            expect(u.name).to.equal('fooName');
        });

        it('should check the password (fail)', function () {
            expect(u.checkPassword('thisiswrong')).to.be.false;
        });

        it('should check the password (success)', function () {
            expect(u.checkPassword('fooPass')).to.be.true;
        });
    });

    describe('with salt', function () {
        var u;

        before(function (done) {
            u = new UserModel({name: 'fooName', mail: 'foo@mail.com', password: 'fooPass', salt: 'specialSalt'});
            u.save(done);
        });

        //TODO: check for remaining properties of user
        it('should hash the password', function () {
            expect(u.password).to.equal('44040c6feed889589476fa8f21d13685001f41d0f1bb6c85d5fe66607eda9e1b');
        });
    });

    describe('missing parameters', function () {
        var u, errorFields;

        before(function (done) {
            u = new UserModel({});
            u.save(function (_error) {
                errorFields = Object.keys(_error.errors);

                done();
            });
        });

        it('should hash the password', function () {
            expect(errorFields).to.deep.equal(['password', 'mail', 'name']);
        });
    });
});