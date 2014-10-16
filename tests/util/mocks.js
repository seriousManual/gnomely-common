var sinon = require('sinon');

function createLoaderMock (options) {
    var result = {};

    Object.keys(options).forEach(function (method) {
        result[method] = createMethod(options[method]);
    });

    return result;
}

function createMethod (options) {
    return sinon.spy(function () {
        var callback = arguments[arguments.length - 1];

        callback(options.error, options.result);
    });
}

function createResultMock (content) {
    return {
        content: function () {
            return content;
        }
    }
}

function createRequestMock (options) {
    options = options || {};

    return {
        params: options.params || {},
        body: options.body || {},
        query: options.query || null,
        gnomely: options.gnomely || {},
        headers: options.headers || {}
    }
}

function createResponseMock () {
    return {
        _end: null,
        _status: null,

        end: function (data) {
            this._end = data;
            return this;
        },
        status: function (status) {
            this._status = status;
            return this;
        }
    }
}

function createTokenHandlerMock (generateTokenResult, validateResult) {
    return {
        generateToken: sinon.spy(function () {
            return generateTokenResult;
        }),
        validate: sinon.spy(function () {
            return validateResult;
        })
    };
}

function createUserMock (options) {
    options = options || {};

    return {
        _id: options.id || null,
        name: options.name || '',
        organisations: options.organisations || [],
        checkPassword: sinon.spy(function () {
            return options.checkPassword
        })
    };
}

module.exports = {
    createResultMock: createResultMock,
    createRequestMock: createRequestMock,
    createResponseMock: createResponseMock,
    createTokenHandlerMock: createTokenHandlerMock,
    createUserMock: createUserMock,
    createLoaderMock: createLoaderMock
};