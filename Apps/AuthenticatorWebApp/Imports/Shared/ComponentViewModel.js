"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var ComponentViewModel = /** @class */ (function () {
    function ComponentViewModel(componentTemplate) {
        this.componentName = ko.observable('');
        this.componentName(componentTemplate.name);
        componentTemplate.register();
    }
    return ComponentViewModel;
}());
exports.ComponentViewModel = ComponentViewModel;
//# sourceMappingURL=ComponentViewModel.js.map