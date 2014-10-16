var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

before(function () {
    mockgoose(mongoose);
});

after(function () {
    mockgoose.reset();
});