var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('WishModel', function () {
    var clock, WishModel;

    before(function () {
        WishModel = require('../../lib/persistence/model/Wish');
        clock = sinon.useFakeTimers(0, 'Date');
    });

    after(function () {
        clock.restore();
        mockgoose.reset();
    });

    describe('missing parameters', function () {
        var o, errorFields;

        before(function (done) {
            o = new WishModel({});
            o.save(function (_error) {
                errorFields = Object.keys(_error.errors);

                done();
            });
        });

        it('should return errors', function () {
            expect(errorFields).to.deep.equal([
                'author', 'organisation', 'content', 'title'
            ]);
        });
    });

    describe('minimal parameters', function () {
        var u;

        before(function (done) {
            u = new WishModel({
                title: 'fooTitle',
                content: 'fooContent',
                organisation: 'fooIdent',
                author: '50341373e894ad16347efe01',
                _id: '50341373e894ad16347efe01'
            });
            u.save(done);
        });

        it('should create the wish', function () {
            expect(u.createDate.toISOString()).to.equal('1970-01-01T00:00:00.000Z');
            expect(u.changeDate.toISOString()).to.equal('1970-01-01T00:00:00.000Z');
            expect(u.title).to.equal('fooTitle');
            expect(u.content).to.equal('fooContent');
            expect(u.organisation).to.equal('fooIdent');
            expect(u.author.toString()).to.equal('50341373e894ad16347efe01');
            expect(JSON.stringify(u.likes)).to.deep.equal('[]');
            expect(JSON.stringify(u.comments)).to.deep.equal('[]');
        });
    });

    describe('with change', function () {
        var u;

        before(function (done) {
            u = new WishModel({
                title: 'fooTitle',
                content: 'fooContent',
                organisation: 'fooIdent',
                author: '50341373e894ad16347efe01',
                _id: '50341373e894ad16347efe01'
            });
            u.save(function (error) {
                if (error) throw error;

                //1337ms later we're changing the user
                clock.tick(1337);
                u.title = 'barTitle';

                u.save(done);
            });
        });

        it('should create the user', function () {
            expect(u.createDate.toISOString()).to.equal('1970-01-01T00:00:00.000Z');
            expect(u.changeDate.toISOString()).to.equal('1970-01-01T00:00:01.337Z');
            expect(u.title).to.equal('barTitle');
        });
    });

    describe('add comment', function () {
        before(function (done) {
            u = new WishModel({
                title: 'fooTitle',
                content: 'fooContent',
                organisation: 'fooIdent',
                author: '50341373e894ad16347efe01',
                _id: '50341373e894ad16347efe01'
            });
            u.save(function (error, wish) {
                if (error) throw error;

                wish.comments.push({author: {_id: '50341373e894ad16347efe01', name: 'fooCommentAuthorName'}, text: 'fooCOmmentTest'});
                wish.save(done);
            });
        });

        it('should save the comment', function () {
            expect(u.comments[0].author._id.toString()).to.equal('50341373e894ad16347efe01');
            expect(u.comments[0].author.name).to.equal('fooCommentAuthorName');
            expect(u.comments[0].createDate.toISOString()).to.equal('1970-01-01T00:00:01.337Z');
            expect(u.comments[0].text).to.equal('fooCOmmentTest');
        });
    });
});