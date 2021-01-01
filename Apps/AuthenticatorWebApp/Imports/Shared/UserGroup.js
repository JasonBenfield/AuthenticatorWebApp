"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AppApiGroup_1 = require("./AppApiGroup");
var UserGroup = /** @class */ (function (_super) {
    tslib_1.__extends(UserGroup, _super);
    function UserGroup(events, resourceUrl) {
        var _this = _super.call(this, events, resourceUrl, 'User') || this;
        _this.Index = _this.createView('Index');
        return _this;
    }
    return UserGroup;
}(AppApiGroup_1.AppApiGroup));
exports.UserGroup = UserGroup;
//# sourceMappingURL=UserGroup.js.map