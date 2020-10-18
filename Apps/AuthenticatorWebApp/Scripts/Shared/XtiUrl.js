"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XtiUrl = void 0;
var XtiPath_1 = require("./XtiPath");
var XtiUrl = /** @class */ (function () {
    function XtiUrl(url) {
        if (url === void 0) { url = location.href; }
        var protocolIndex = url.indexOf('//');
        var slashIndex = url.indexOf('/', protocolIndex + 2);
        this.baseUrl = url.substring(0, slashIndex);
        var endIndex = url.indexOf('?');
        if (endIndex < 0) {
            endIndex = url.indexOf('#');
            if (endIndex < 0) {
                endIndex = url.length;
            }
        }
        else {
            endIndex = url.length;
        }
        var path = url.substring(slashIndex + 1, endIndex);
        var split = path.split('/');
        this.path = new XtiPath_1.XtiPath(split[0], split[1], split[2], split[3], split[4]);
    }
    XtiUrl.current = new XtiUrl(location.href);
    return XtiUrl;
}());
exports.XtiUrl = XtiUrl;
//# sourceMappingURL=XtiUrl.js.map