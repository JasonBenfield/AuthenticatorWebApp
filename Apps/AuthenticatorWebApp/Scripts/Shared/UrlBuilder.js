"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlBuilder = void 0;
var UrlQuery_1 = require("./UrlQuery");
var JoinedStrings_1 = require("./JoinedStrings");
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(baseUrl) {
        this.parts = [];
        if (baseUrl) {
            if (baseUrl.substr(baseUrl.length - 1) === '/') {
                baseUrl = baseUrl.substr(0, baseUrl.length - 1);
            }
            this.parts.push(baseUrl);
        }
        this.url = baseUrl;
        var queryIndex = this.url.indexOf('?');
        this.query = new UrlQuery_1.UrlQuery(queryIndex > -1 ? this.url.substr(queryIndex + 1) : '');
        if (queryIndex > -1) {
            this.url = this.url.substr(0, queryIndex);
        }
    }
    UrlBuilder.current = function () { return new UrlBuilder(location.href); };
    UrlBuilder.prototype.refreshUrl = function () {
        this.url = new JoinedStrings_1.JoinedStrings('/', this.parts).value();
    };
    UrlBuilder.prototype.addPart = function (part) {
        if (part) {
            var queryIndex = part.indexOf('?');
            if (queryIndex > -1) {
                var query = part.substr(queryIndex + 1);
                this.addQueryString(query);
                part = part.substr(0, queryIndex);
            }
            var fragments = part.split('/');
            for (var _i = 0, fragments_1 = fragments; _i < fragments_1.length; _i++) {
                var fragment = fragments_1[_i];
                if (fragment) {
                    this.parts.push(fragment);
                }
            }
            this.refreshUrl();
        }
        return this;
    };
    UrlBuilder.prototype.hasQuery = function (name) {
        return this.query.hasQuery(name);
    };
    UrlBuilder.prototype.clearQuery = function () {
        this.query.clear();
    };
    UrlBuilder.prototype.removeQuery = function (name) {
        this.query.removeQuery(name);
    };
    UrlBuilder.prototype.replaceQuery = function (name, value) {
        return this.query.replaceQuery(name, value);
    };
    UrlBuilder.prototype.addQuery = function (name, value) {
        return this.query.addQuery(name, value);
    };
    UrlBuilder.prototype.addQueryString = function (query) {
        return this.query.addQueryString(query);
    };
    UrlBuilder.prototype.addQueryFromObject = function (obj) {
        return this.query.addQueryFromObject(obj);
    };
    UrlBuilder.prototype.getQuery = function () {
        return this.query;
    };
    UrlBuilder.prototype.getQueryValue = function (name) {
        return this.query.getValue(name);
    };
    UrlBuilder.prototype.getUrl = function () {
        var url = this.url;
        var queryString = this.query.toString();
        if (queryString) {
            url += "?" + queryString;
        }
        return url;
    };
    UrlBuilder.prototype.getUrlWithoutQuery = function () {
        return this.url;
    };
    UrlBuilder.prototype.toString = function () {
        return this.getUrl();
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
//# sourceMappingURL=UrlBuilder.js.map