"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageViewModel = void 0;
var tslib_1 = require("tslib");
var template = require("./MainPage.html");
var ko = require("knockout");
var PageViewModel_1 = require("../PageViewModel");
var tsyringe_1 = require("tsyringe");
var MainPageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(MainPageViewModel, _super);
    function MainPageViewModel() {
        var _this = _super.call(this, template) || this;
        _this.telephoneNumber = ko.observable('');
        return _this;
    }
    MainPageViewModel = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [])
    ], MainPageViewModel);
    return MainPageViewModel;
}(PageViewModel_1.PageViewModel));
exports.MainPageViewModel = MainPageViewModel;
//# sourceMappingURL=MainPageViewModel.js.map