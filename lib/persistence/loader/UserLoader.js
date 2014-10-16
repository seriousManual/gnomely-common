var UserModel = require('../model/User');

function UserLoader () {

}

UserLoader.prototype.loadUserByMail = function (mail, callback) {
    UserModel
        .findOne({mail: mail})
        .populate('organisations', '_id ident name')
        .exec(callback);
};

UserLoader.prototype.loadUserById = function (id, callback) {
    UserModel
        .findOne({_id: id})
        .populate('organisations', '_id ident name')
        .exec(callback);
};

module.exports = UserLoader;