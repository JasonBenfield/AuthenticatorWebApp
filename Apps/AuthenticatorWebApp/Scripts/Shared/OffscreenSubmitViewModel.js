"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffscreenSubmitViewModel = void 0;
var ComponentTemplate_1 = require("./ComponentTemplate");
var ko = require("knockout");
var template = require("./Templates/OffscreenSubmit.html");
var OffscreenSubmitViewModel = /** @class */ (function () {
    function OffscreenSubmitViewModel() {
        this.template = ko.observable('offscreen-submit');
        new ComponentTemplate_1.ComponentTemplate(this.template(), template).register();
    }
    return OffscreenSubmitViewModel;
}());
exports.OffscreenSubmitViewModel = OffscreenSubmitViewModel;
//# sourceMappingURL=OffscreenSubmitViewModel.js.map