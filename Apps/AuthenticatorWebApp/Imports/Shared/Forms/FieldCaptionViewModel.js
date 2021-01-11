"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var FieldCaptionViewModel = /** @class */ (function () {
    function FieldCaptionViewModel() {
        this.caption = ko.observable('');
        this.css = ko.observable('');
        this.isVisible = ko.observable(true);
    }
    return FieldCaptionViewModel;
}());
exports.FieldCaptionViewModel = FieldCaptionViewModel;
//# sourceMappingURL=FieldCaptionViewModel.js.map