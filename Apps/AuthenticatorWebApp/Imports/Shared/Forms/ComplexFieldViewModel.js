"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var FieldValueViewModel_1 = require("./FieldValueViewModel");
var FieldCaptionViewModel_1 = require("./FieldCaptionViewModel");
var RowFieldTemplate_1 = require("./RowFieldTemplate");
var ComplexFieldViewModel = /** @class */ (function () {
    function ComplexFieldViewModel(value) {
        this.componentName = ko.observable('');
        this.isVisible = ko.observable(true);
        this.caption = new FieldCaptionViewModel_1.FieldCaptionViewModel();
        this.value = value || new FieldValueViewModel_1.FieldValueViewModel();
        var template = new RowFieldTemplate_1.RowFieldTemplate();
        template.register();
        this.componentName(template.componentName);
    }
    return ComplexFieldViewModel;
}());
exports.ComplexFieldViewModel = ComplexFieldViewModel;
//# sourceMappingURL=ComplexFieldViewModel.js.map