var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var randomString = require('../../lib/util/randomString');

describe('Util', function () {
    describe('RandomString', function () {
        it('should create a random string of std length', function () {
            expect(randomString().length).to.equal(10);
        });

        it('should create a random string of specified length', function () {
            expect(randomString(11).length).to.equal(11);
        })
    });
});