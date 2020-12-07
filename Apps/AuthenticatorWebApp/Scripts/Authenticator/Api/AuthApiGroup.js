"use strict";
// Generated code
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthApiGroup = void 0;
var tslib_1 = require("tslib");
var AppApiGroup_1 = require("../../Shared/AppApiGroup");
var AuthApiGroup = /** @class */ (function (_super) {
    tslib_1.__extends(AuthApiGroup, _super);
    function AuthApiGroup(events, resourceUrl) {
        var _this = _super.call(this, events, resourceUrl, 'AuthApi') || this;
        _this.AuthenticateAction = _this.createAction('Authenticate', 'Authenticate');
        return _this;
    }
    AuthApiGroup.prototype.Authenticate = function (model, errorOptions) {
        return this.AuthenticateAction.execute(model, errorOptions || {});
    };
    return AuthApiGroup;
}(AppApiGroup_1.AppApiGroup));
exports.AuthApiGroup = AuthApiGroup;
//# sourceMappingURL=AuthApiGroup.js.map