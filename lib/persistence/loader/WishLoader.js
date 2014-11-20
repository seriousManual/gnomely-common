var WishModel = require('../model/Wish');

function WishLoader () {

}

WishLoader.prototype.loadWishByIdent = function (wishIdent, callback) {
    this._executeLoadQuery(WishModel.findOne({_id: wishIdent}), callback);
};

WishLoader.prototype.loadWishesByOrganisationIdent = function (organisationIdent, callback) {
    this._executeLoadQuery(WishModel.find({organisation: organisationIdent}), callback);
};

WishLoader.prototype.loadWishesByCreateDate = function (sinceDate, callback) {
    var query = WishModel
        .find({
            createDate: {
                '$gt': sinceDate
            }
        });

    this._executeLoadQuery(query, callback);
};

WishLoader.prototype.loadWishesByCommentsDate = function (sinceDate, callback) {
    var query = WishModel
        .find({'comments': {
            '$elemMatch': {
                createDate: { '$gt': sinceDate }
            }
        }});

    this._executeLoadQuery(query, callback);
};

//WishLoader.prototype.loadWishesByBoughtDate = function (sinceDate, callback) {
//    var query = WishModel
//        .find({'bought.createDate': { '$gt': sinceDate}});
//
//    this._executeLoadQuery(query, callback);
//};

WishLoader.prototype._executeLoadQuery = function (query, callback) {
    query
        .populate('author', '_id name mail')
        .populate('bought.author', 'name _id')
        .populate('comments.author', '_id name mail')
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
            author: authorIdent,
            text: commentText
        }}})
        .exec(callback);
};

WishLoader.prototype.deleteComment = function (wishIdent, commentIdent, callback) {
    WishModel
        .findOneAndUpdate({_id: wishIdent}, {$pull: {comments: {_id: commentIdent}}})
        .exec(callback);
};


WishLoader.prototype.addLike = function (wishIdent, authorIdent, callback) {
    WishModel
        .findOneAndUpdate({_id: wishIdent}, {$push: {likes: {author: authorIdent}}})
        .exec(callback);
};

WishLoader.prototype.deleteLike = function (wishIdent, likeIdent, callback) {
    WishModel
        .findOneAndUpdate({_id: wishIdent}, {$pull: {likes: {_id: likeIdent}}})
        .exec(callback);
};

module.exports = WishLoader;