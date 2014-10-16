var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('Wishloader', function () {
    var WishLoader, wishLoader, WishModel;

    before(function (done) {
        WishModel = require('../../lib/persistence/model/Wish');
        WishLoader = require('../../lib/persistence/loader/WishLoader');
        wishLoader = new WishLoader();

        require('../util/dbPrepare.oneOrganisation.oneUser.threeWishes')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('createWish', function () {
        var wish;

        describe('success', function () {
            before(function (done) {
                wishLoader.createWish('newOrganisation', '50341373e894ad16347efe01', 'newTitle', 'newContent', function (error, _wish) {
                    wish = _wish;
                    done(error);
                });
            });

            it('should create the wish and return it', function () {
                expect(wish.title).to.equal('newTitle');
                expect(wish.content).to.equal('newContent');
                expect(wish.author.toString()).to.equal('50341373e894ad16347efe01');
                expect(wish.organisation).to.equal('newOrganisation');
            });
        });
    });

    describe('saveWish', function () {
        var wish, error;

        describe('success', function () {
            before(function (done) {
                wish = new WishModel({
                    title: 'saveWishTitle', content: 'saveWishContent', organisation: 'saveWishOrganisation', author: '50341373e894ad16347efe01'
                });

                wishLoader.saveWish(wish, function (_error, _wish) {
                    error = _error;
                    wish = _wish;
                    done(error);
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.null;
            });

            it('should create the wish and return it', function () {

                expect(wish.title).to.equal('saveWishTitle');
                expect(wish.content).to.equal('saveWishContent');
                expect(wish.author.toString()).to.equal('50341373e894ad16347efe01');
                expect(wish.organisation).to.equal('saveWishOrganisation');
            });
        });
    });

    describe('deleteWish', function () {
        var error, count;

        describe('success', function () {
            before(function (done) {
                (new WishModel({title: 'deleteWishTitle', content: 'deleteWishContent', organisation: 'deleteWishOrganisation', author: '50341373e894ad16347efe01'})).save(function(error, _wish) {
                    wishLoader.deleteWish(_wish, function(_error) {
                        error = _error;

                        WishModel.count({title: 'deleteWishTitle'}, function (error, _count) {
                            if (error) throw error;

                            count = _count;
                        });

                        done();
                    });
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.undefined;
            });

            it('should delete', function() {
                expect(count).to.equal(0);
            });
        });
    });

    describe('loadWishesByOrganisationIdent', function () {
        describe('loadWishesByOrganisationIdent (not found)', function () {
            var result, error;

            before(function (done) {
                wishLoader.loadWishesByOrganisationIdent('imnotfound', function (_error, _result) {
                    error = _error;
                    result = _result;
                    done();
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.null;
            });

            it('should return an empty array', function () {
                expect(result).to.deep.equal([]);
            });
        });

        describe('loadWishesByOrganisationIdent (found)', function () {
            var result, error;

            before(function (done) {
                wishLoader.loadWishesByOrganisationIdent('foo_organisation', function (_error, _result) {
                    error = _error;
                    result = _result;
                    done();
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.null;
            });

            it('should return all wishes with their corresponding authors and bought (if set)', function () {
                expect(result[0].title).to.equal('fooTitle1');
                expect(result[0].author.name).to.equal('fooName');
                expect(JSON.stringify(result[0].bought)).to.equal('{}');

                expect(result[1].title).to.equal('fooTitle2');
                expect(result[1].author.name).to.equal('fooName');
                expect(JSON.stringify(result[1].bought)).to.equal('{}');

                expect(result[2].title).to.equal('fooTitle3');
                expect(result[2].author.name).to.equal('fooName');
                expect(result[2].bought.author.name).to.equal('fooName');
                expect(result[2].bought.author._id.toString()).to.equal('50341373e894ad16347efe02');
            });
        });
    });

    describe('loadWishByIdent', function () {
        describe('loadWishByIdent (not found)', function () {
            var result, error;

            before(function (done) {
                wishLoader.loadWishByIdent('50341373e894ad16347aaa01', function (_error, _result) {
                    error = _error;
                    result = _result;
                    done();
                });
            });

            it('should return not an error', function () {
                expect(error).to.be.null;
            });

            it('should return null', function () {
                expect(result).to.be.null;
            });
        });

        describe('loadWishByIdent (found)', function () {
            var result, error;

            before(function (done) {
                wishLoader.loadWishByIdent('50341373e894ad16347efe05', function (_error, _result) {
                    error = _error;
                    result = _result;
                    done();
                });
            });

            it('should return not an error', function () {
                expect(error).to.be.null;
            });

            it('should return the wish', function () {
                expect(result.title).to.equal('fooTitle3');
            });

            it('should return the wish author', function () {
                expect(result.author.name).to.equal('fooName');
            });

            it('should return the wish bought', function () {
                expect(result.bought.author.name).to.equal('fooName');
            });
        });
    });

    describe('setBought', function () {
        var wish, error;

        describe('success', function () {
            before(function (done) {
                wishLoader.setBought('50341373e894ad16347efe05', '50341373e894ad16347efe02', function(_error, _wish) {
                    wish = _wish;
                    error = _error;
                    done();
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.null;
            });

            it('should set the correct user id @ bought', function () {
                expect(wish.bought.author.toString()).to.equal('50341373e894ad16347efe02');
                expect(wish.bought.createDate).not.to.be.null;
            });
        });
    });

    describe('addComment', function () {
        var wish, error;

        describe('success', function () {
            before(function (done) {
                wishLoader.addComment('50341373e894ad16347efe04', '50341373e894ad16347efe02', 'fooName', 'fooText', function(_error, _wish) {
                    wish = _wish;
                    error = _error;
                    done();
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.null;
            });

            it('should have added an comment', function () {
                expect(wish.comments[0].author._id.toString()).to.equal('50341373e894ad16347efe02');
                expect(wish.comments[0].author.name).to.equal('fooName');
                expect(wish.comments[0].createDate).not.to.be.null;
                expect(wish.comments[0].text).to.equal('fooText');
            });
        });
    });

    describe('deleteComment', function () {
        var wish, error;

        describe('success', function () {
            before(function (done) {
                wishLoader.deleteComment('50341373e894ad16347efe05', '50313373e894ad16347efe05', function(_error, _wish) {
                    wish = _wish;
                    error = _error;
                    done();
                });
            });

            it('should not return an error', function () {
                expect(error).to.be.null;
            });

            it('should set the correct user id @ bought', function () {
                expect(wish.comments.length).to.equal(0);
            });
        });
    });
});