"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tsyringe_1 = require("tsyringe");
var AuthenticatorAppApi_1 = require("./Api/AuthenticatorAppApi");
var LogoutUrl = /** @class */ (function () {
    function LogoutUrl(authenticator) {
        this.authenticator = authenticator;
    }
    LogoutUrl.prototype.value = function () {
        return this.authenticator.Auth.Logout.getUrl({}).getUrl();
    };
    LogoutUrl = tslib_1.__decorate([
        tsyringe_1.injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthenticatorAppApi_1.AuthenticatorAppApi])
    ], LogoutUrl);
    return LogoutUrl;
}());
exports.LogoutUrl = LogoutUrl;
//# sourceMappingURL=LogoutUrl.js.map