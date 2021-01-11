"use strict";
// Generated code
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AppApiGroup_1 = require("XtiShared/AppApiGroup");
var AuthGroup = /** @class */ (function (_super) {
    tslib_1.__extends(AuthGroup, _super);
    function AuthGroup(events, resourceUrl) {
        var _this = _super.call(this, events, resourceUrl, 'Auth') || this;
        _this.Index = _this.createView('Index');
        _this.VerifyLoginAction = _this.createAction('VerifyLogin', 'Verify Login');
        _this.VerifyLoginForm = _this.createView('VerifyLoginForm');
        _this.Login = _this.createView('Login');
        _this.Logout = _this.createView('Logout');
        return _this;
    }
    AuthGroup.prototype.VerifyLogin = function (model, errorOptions) {
        return this.VerifyLoginAction.execute(model, errorOptions || {});
    };
    return AuthGroup;
}(AppApiGroup_1.AppApiGroup));
exports.AuthGroup = AuthGroup;
//# sourceMappingURL=AuthGroup.js.map