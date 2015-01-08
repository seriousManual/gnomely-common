var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var randomString = require('../../lib/util/randomString');
var LinkGenerator = require('../../lib/util/LinkGenerator');

describe('Util', function () {
    describe('RandomString', function () {
        it('should create a random string of std length', function () {
            expect(randomString().length).to.equal(10);
        });

        it('should create a random string of specified length', function () {
            expect(randomString(11).length).to.equal(11);
        })
    });

    describe('LinkGenerator', function () {
        var a = new LinkGenerator('http://foo.com');

        it('should generate an organisation url', function() {
            expect(a.generateOrganisationUrl('bar_orga')).to.equal('http://foo.com/#/org/bar_orga');
        });

        it('should generate an invite link', function() {
            expect(a.generateInviteUrl('bar_orga', 'fooToken')).to.equal('http://foo.com/#/org/bar_orga/invite/fooToken');
        });
    });
});