"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApi = void 0;
var AppResourceUrl_1 = require("./AppResourceUrl");
var XtiUrl_1 = require("./XtiUrl");
var AppApi = /** @class */ (function () {
    function AppApi(events, baseUrl, app, version) {
        this.events = events;
        this.groups = {};
        this.resourceUrl = AppResourceUrl_1.AppResourceUrl.app(baseUrl, app, version, XtiUrl_1.XtiUrl.current.path.modifier, pageContext.CacheBust);
    }
    Object.defineProperty(AppApi.prototype, "name", {
        get: function () { return this.resourceUrl.path.app; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppApi.prototype, "url", {
        get: function () { return this.resourceUrl.relativeUrl; },
        enumerable: false,
        configurable: true
    });
    AppApi.prototype.addGroup = function (createGroup) {
        var group = createGroup(this.events, this.resourceUrl);
        this.groups[group.name] = group;
        return group;
    };
    AppApi.prototype.toString = function () {
        return "AppApi " + this.resourceUrl;
    };
    return AppApi;
}());
exports.AppApi = AppApi;
//# sourceMappingURL=AppApi.js.map