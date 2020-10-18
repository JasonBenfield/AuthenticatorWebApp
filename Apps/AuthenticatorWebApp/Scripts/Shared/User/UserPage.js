"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var UserPageViewModel_1 = require("./UserPageViewModel");
var Alert_1 = require("../Alert");
var UrlBuilder_1 = require("../UrlBuilder");
var xtistart_1 = require("xtistart");
var WebPage_1 = require("../WebPage");
var tsyringe_1 = require("tsyringe");
var AppApi_1 = require("../AppApi");
var UserPage = /** @class */ (function () {
    function UserPage(vm) {
        this.vm = vm;
        this.alert = new Alert_1.Alert(this.vm.alert);
        this.goToReturnUrl();
    }
    UserPage.prototype.goToReturnUrl = function () {
        this.alert.info('Opening Page...');
        var urlBuilder = UrlBuilder_1.UrlBuilder.current();
        var returnUrl = urlBuilder.getQueryValue('returnUrl');
        if (returnUrl) {
            returnUrl = decodeURIComponent(returnUrl);
        }
        returnUrl = tsyringe_1.container.resolve(AppApi_1.AppApi).url.addPart(returnUrl).getUrl();
        new WebPage_1.WebPage(returnUrl).open();
    };
    UserPage = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [UserPageViewModel_1.UserPageViewModel])
    ], UserPage);
    return UserPage;
}());
xtistart_1.startup(UserPageViewModel_1.UserPageViewModel, UserPage);
//# sourceMappingURL=UserPage.js.map