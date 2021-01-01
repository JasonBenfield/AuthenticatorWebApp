"use strict";
// Generated code
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatorAppApi = void 0;
var tslib_1 = require("tslib");
var AppApi_1 = require("../../Shared/AppApi");
var UserGroup_1 = require("./UserGroup");
var AuthGroup_1 = require("./AuthGroup");
var AuthApiGroup_1 = require("./AuthApiGroup");
var AuthenticatorAppApi = /** @class */ (function (_super) {
    tslib_1.__extends(AuthenticatorAppApi, _super);
    function AuthenticatorAppApi(events, baseUrl, version) {
        if (version === void 0) { version = ''; }
        var _this = _super.call(this, events, baseUrl, 'Authenticator', version || AuthenticatorAppApi.DefaultVersion) || this;
        _this.User = _this.addGroup(function (evts, resourceUrl) { return new UserGroup_1.UserGroup(evts, resourceUrl); });
        _this.Auth = _this.addGroup(function (evts, resourceUrl) { return new AuthGroup_1.AuthGroup(evts, resourceUrl); });
        _this.AuthApi = _this.addGroup(function (evts, resourceUrl) { return new AuthApiGroup_1.AuthApiGroup(evts, resourceUrl); });
        return _this;
    }
    AuthenticatorAppApi.DefaultVersion = 'V3';
    return AuthenticatorAppApi;
}(AppApi_1.AppApi));
exports.AuthenticatorAppApi = AuthenticatorAppApi;
//# sourceMappingURL=AuthenticatorAppApi.js.map