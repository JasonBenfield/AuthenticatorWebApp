"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XtiPath_1 = require("./XtiPath");
var UrlBuilder_1 = require("./UrlBuilder");
var AppResourceUrl = /** @class */ (function () {
    function AppResourceUrl(baseUrl, path, cacheBust) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.cacheBust = cacheBust;
        this.url = new UrlBuilder_1.UrlBuilder(baseUrl)
            .addPart(path.format());
        this.url.addQuery('cacheBust', cacheBust);
    }
    AppResourceUrl.app = function (baseUrl, appKey, version, modifier, cacheBust) {
        return new AppResourceUrl(baseUrl, XtiPath_1.XtiPath.app(appKey, version, modifier), cacheBust);
    };
    Object.defineProperty(AppResourceUrl.prototype, "relativeUrl", {
        get: function () {
            return new UrlBuilder_1.UrlBuilder("/" + this.path.format());
        },
        enumerable: true,
        configurable: true
    });
    AppResourceUrl.prototype.withGroup = function (group) {
        return new AppResourceUrl(this.baseUrl, this.path.withGroup(group), this.cacheBust);
    };
    AppResourceUrl.prototype.withAction = function (action) {
        return new AppResourceUrl(this.baseUrl, this.path.withAction(action), this.cacheBust);
    };
    AppResourceUrl.prototype.toString = function () {
        return this.url.getUrl();
    };
    return AppResourceUrl;
}());
exports.AppResourceUrl = AppResourceUrl;
//# sourceMappingURL=AppResourceUrl.js.map