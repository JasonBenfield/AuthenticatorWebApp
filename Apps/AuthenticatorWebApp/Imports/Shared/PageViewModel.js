"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ComponentTemplate_1 = require("./ComponentTemplate");
var ComponentViewModel_1 = require("./ComponentViewModel");
var PageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(PageViewModel, _super);
    function PageViewModel(template) {
        return _super.call(this, new ComponentTemplate_1.ComponentTemplate('page-body', template)) || this;
    }
    return PageViewModel;
}(ComponentViewModel_1.ComponentViewModel));
exports.PageViewModel = PageViewModel;
//# sourceMappingURL=PageViewModel.js.map