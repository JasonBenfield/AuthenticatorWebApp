"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tsyringe_1 = require("tsyringe");
var Alert_1 = require("../Alert");
var PageViewModel_1 = require("../PageViewModel");
var template = require("./UserPage.html");
var UserPageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(UserPageViewModel, _super);
    function UserPageViewModel() {
        var _this = _super.call(this, template) || this;
        _this.alert = new Alert_1.AlertViewModel();
        return _this;
    }
    UserPageViewModel = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [])
    ], UserPageViewModel);
    return UserPageViewModel;
}(PageViewModel_1.PageViewModel));
exports.UserPageViewModel = UserPageViewModel;
//# sourceMappingURL=UserPageViewModel.js.map