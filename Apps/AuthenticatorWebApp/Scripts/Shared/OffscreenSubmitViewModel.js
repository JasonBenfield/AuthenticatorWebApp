"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffscreenSubmitViewModel = void 0;
var ComponentTemplate_1 = require("./ComponentTemplate");
var ko = require("knockout");
var template = require("./Templates/OffscreenSubmit.html");
var OffscreenSubmitViewModel = /** @class */ (function () {
    function OffscreenSubmitViewModel() {
        this.componentName = ko.observable('offscreen-submit');
        new ComponentTemplate_1.ComponentTemplate(this.componentName(), template).register();
    }
    return OffscreenSubmitViewModel;
}());
exports.OffscreenSubmitViewModel = OffscreenSubmitViewModel;
//# sourceMappingURL=OffscreenSubmitViewModel.js.map