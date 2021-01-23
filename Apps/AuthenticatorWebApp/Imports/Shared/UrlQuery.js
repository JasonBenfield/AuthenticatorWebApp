"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamedValue_1 = require("./NamedValue");
var _ = require("lodash");
var JoinedStrings_1 = require("./JoinedStrings");
var UrlQuery = /** @class */ (function () {
    function UrlQuery(query) {
        this.queryValues = [];
        if (query) {
            this.pushQueryValues(query);
        }
    }
    UrlQuery.prototype.getValues = function () {
        return this.queryValues;
    };
    UrlQuery.prototype.getValue = function (name) {
        var queryValue = _(this.queryValues).find(function (qv) { return qv.name === name; });
        return queryValue ? queryValue.value : null;
    };
    UrlQuery.prototype.pushQueryValues = function (query) {
        var _this = this;
        var parts = query.split('&');
        _(parts).forEach(function (part) {
            var nameValue = part.split('=');
            var name = nameValue[0];
            var value = '';
            if (nameValue[1]) {
                value = nameValue[1];
            }
            _this.queryValues.push(new NamedValue_1.NamedValue(name, value));
        });
    };
    UrlQuery.prototype.clear = function () {
        this.queryValues.splice(0, this.queryValues.length);
        return this;
    };
    UrlQuery.prototype.hasQuery = function (name) {
        var queryValue = _(this.queryValues).find(function (qv) { return qv.name === name; });
        return Boolean(queryValue);
    };
    UrlQuery.prototype.removeQuery = function (name) {
        for (var i = this.queryValues.length - 1; i >= 0; i--) {
            var queryPart = this.queryValues[i];
            if (queryPart.name === name) {
                this.queryValues.splice(i, 1);
            }
        }
        return this;
    };
    UrlQuery.prototype.replaceQuery = function (name, value) {
        this.removeQuery(name);
        return this.addQuery(name, value);
    };
    UrlQuery.prototype.addQuery = function (name, value) {
        var _this = this;
        if (name) {
            if (value instanceof Date) {
                var queryValue = value === undefined || value === null
                    ? null
                    : value.toISOString();
                this.queryValues.push(new NamedValue_1.NamedValue(name, queryValue));
            }
            else if (typeof value === 'string') {
                var queryValue = void 0;
                if (value !== undefined && value !== null) {
                    queryValue = value;
                }
                this.queryValues.push(new NamedValue_1.NamedValue(name, queryValue));
            }
            else if (typeof value === 'number') {
                var queryValue = void 0;
                if (value !== undefined && value !== null) {
                    queryValue = value.toString();
                }
                this.queryValues.push(new NamedValue_1.NamedValue(name, queryValue));
            }
            else if (_.isArray(value)) {
                _(value).forEach(function (arrValue) {
                    _this.addQuery(name, arrValue);
                });
            }
            else {
                this.queryValues.push(new NamedValue_1.NamedValue(name, value && value.toString()));
            }
        }
        return this;
    };
    UrlQuery.prototype.addQueryFromObject = function (obj) {
        return this._addQueryFromObject(obj, '');
    };
    UrlQuery.prototype._addQueryFromObject = function (obj, prefix) {
        if (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var k = prefix ? prefix + "[" + prop + "]" : prop;
                    var propValue = obj[prop];
                    if (propValue !== null && typeof propValue === "object") {
                        this._addQueryFromObject(propValue, k);
                    }
                    else {
                        this.addQuery(k, propValue);
                    }
                }
            }
        }
    };
    UrlQuery.prototype.addQueryString = function (query) {
        if (query) {
            this.pushQueryValues(query);
        }
        return this;
    };
    UrlQuery.prototype.toString = function () {
        var str = '';
        if (this.queryValues.length > 0) {
            str = new JoinedStrings_1.JoinedStrings('&', this.queryValues).value();
        }
        return str;
    };
    return UrlQuery;
}());
exports.UrlQuery = UrlQuery;
//# sourceMappingURL=UrlQuery.js.map