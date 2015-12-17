var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('./util/mocks');

describe('MiscLoader', function () {
    var miscLoader, MiscLoader;

    before(function (done) {
        MiscLoader = require('../index').loader.MiscLoader;
        miscLoader = new MiscLoader();

        require('./util/dbPrepare.twoInvites.js')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('loadInviteById', function() {
        var invite, error;

        before(function() {
            miscLoader.loadInviteById('54454b2973fca3141c272d0c', function(_error, _invite) {
                error = _error;
                invite = _invite;
            });
        });

        it('should not return an error', function() {
            expect(error).to.be.null;
        });

        it('should ', function() {
            expect(invite.organisationId).to.equal('fooOrgIdent');
            expect(invite.ack).to.be.false;
            expect(invite.mail).to.equal('fooMail');
            expect(invite.name).to.equal('fooName');
        });
    });

    describe('acknowledgeInvite', function() {
        var invite, error;

        before(function() {
            miscLoader.acknowledgeInvite('54454b2973fca3141c272d0b', function(_error, _invite) {
                error = _error;
                invite = _invite;
            });
        });

        it('should not return an error', function() {
            expect(error).to.be.null;
        });

        it('should ', function() {
            expect(invite.organisationId).to.equal('fooOrgIdent');
            expect(invite.ack).to.be.true;
            expect(invite.mail).to.equal('barMail');
            expect(invite.name).to.equal('barName');
        });
    });

    describe('createInvite', function() {
        var invite, error;

        before(function() {
            miscLoader.createInvite('drugsOrgId', 'drugsMail', 'drugsName', function(_error, _invite) {
                error = _error;
                invite = _invite;
            });
        });

        it('should not return an error', function() {
            expect(error).to.be.null;
        });

        it('should ', function() {
            expect(invite.organisationId).to.equal('drugsOrgId');
            expect(invite.ack).to.be.false;
            expect(invite.mail).to.equal('drugsMail');
            expect(invite.name).to.equal('drugsName');
        });
    });
});