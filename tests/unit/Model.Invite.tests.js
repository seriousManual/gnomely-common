var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('InviteModel', function () {
    var InviteModel, clock;

    before(function () {
        InviteModel = require('../../lib/persistence/model/Invite');
        clock = sinon.useFakeTimers();
    });

    after(function () {
        mockgoose.reset();
        clock.restore();
    });

    describe('foo', function() {
        var invite;

        before(function(done) {
            invite = new InviteModel({organisationId: 'fooOrgId', mail: 'fooMail', name: 'fooName'});
            invite.save(done);
        });

        it('should', function() {
            expect(invite.organisationId).to.equal('fooOrgId');
            expect(invite.ack).to.be.false;
            expect(invite.mail).to.equal('fooMail');
            expect(invite.name).to.equal('fooName');
            expect(invite.createDate.toISOString()).to.equal('1970-01-01T00:00:00.000Z');
        });
    });
});