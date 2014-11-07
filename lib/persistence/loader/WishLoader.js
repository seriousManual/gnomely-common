var WishModel = require('../model/Wish');

function WishLoader () {

}

WishLoader.prototype.loadWishByIdent = function (wishIdent, callback) {
    WishModel
        .findOne({_id: wishIdent})
        .populate('author', 'name _id')
        .populate('bought.author', 'name _id')
        .exec(callback);
};

WishLoader.prototype.loadWishesByOrganisationIdent = function (organisationIdent, callback) {
    WishModel
        .find({organisation: organisationIdent})
        .populate('author', 'name _id')
        .populate('bought.author', 'name _id')
        .exec(callback);
};

WishLoader.prototype.loadWishesByCreateDate = function (sinceDate, callback) {
    WishModel
        .find({createDate: {
            '$gt': sinceDate
        }})
        .populate('author', 'name _id')
        .exec(callback);
};

WishLoader.prototype.loadWishesByCommentsDate = function (sinceDate, callback) {
    WishModel
        .find({'comments': {
            '$elemMatch': {
                createDate: { '$gt': sinceDate }
            }
        }})
        .populate('author', 'name _id')
        .exec(callback);
};

WishLoader.prototype.createWish = function (organisationIdent, author, title, content, callback) {
    (new WishModel({
        title: title,
        content: content,
        author: author,
        organisation: organisationIdent
    })).save(callback);
};

WishLoader.prototype.saveWish = function (wish, callback) {
    wish.save(callback);
};

WishLoader.prototype.deleteWish = function (wish, callback) {
    wish.remove(callback);
};

WishLoader.prototype.setBought = function (wishIdent, authorIdent, callback) {
    WishModel
        .findOneAndUpdate({_id: wishIdent}, {bought: {author: authorIdent, createDate: new Date()}})
        .exec(callback);
};

WishLoader.prototype.addComment = function (wishIdent, authorIdent, authorName, commentText, callback) {
    WishModel
        .findOneAndUpdate({_id: wishIdent}, {$push: {comments: {
            author: {_id: authorIdent, name: authorName},
            text: commentText
        }}})
        .exec(callback);
};

WishLoader.prototype.deleteComment = function (wishIdent, commentIdent, callback) {
    WishModel
        .findOneAndUpdate({_id: wishIdent}, {$pull: {comments: {_id: commentIdent}}})
        .exec(callback);
};

module.exports = WishLoader;