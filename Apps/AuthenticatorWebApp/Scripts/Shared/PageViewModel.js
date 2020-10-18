"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageViewModel = void 0;
var ComponentTemplate_1 = require("./ComponentTemplate");
var ko = require("knockout");
var PageViewModel = /** @class */ (function () {
    function PageViewModel(template) {
        this.template = ko.observable('page-body');
        new ComponentTemplate_1.ComponentTemplate(this.template(), template).register();
    }
    return PageViewModel;
}());
exports.PageViewModel = PageViewModel;
//# sourceMappingURL=PageViewModel.js.map