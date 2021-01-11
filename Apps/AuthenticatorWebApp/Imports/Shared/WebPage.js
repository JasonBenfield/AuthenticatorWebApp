"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlBuilder_1 = require("./UrlBuilder");
var WebPage = /** @class */ (function () {
    function WebPage(url) {
        if (url instanceof UrlBuilder_1.UrlBuilder) {
            this.url = url.getUrl();
        }
        else {
            this.url = url;
        }
    }
    WebPage.prototype.open = function () {
        window.location.href = this.url;
    };
    WebPage.prototype.transfer = function () {
        window.location.replace(this.url);
    };
    WebPage.prototype.openWindow = function () {
        window.open(this.url);
    };
    WebPage.prototype.openForPrint = function () {
        window.open(this.url, 'new_window', 'location=0,status=0,toolbar=0,menubar=0,height=5,width=5,' +
            'resizable=0,scrollbars=0,titlebar=0');
    };
    return WebPage;
}());
exports.WebPage = WebPage;
//# sourceMappingURL=WebPage.js.map