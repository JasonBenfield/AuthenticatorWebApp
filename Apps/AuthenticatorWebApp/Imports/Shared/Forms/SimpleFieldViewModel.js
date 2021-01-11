"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var FieldValueViewModel_1 = require("../../Shared/Forms/FieldValueViewModel");
var FieldCaptionViewModel_1 = require("./FieldCaptionViewModel");
var RowFieldTemplate_1 = require("./RowFieldTemplate");
var SimpleFieldViewModel = /** @class */ (function () {
    function SimpleFieldViewModel() {
        this.componentName = ko.observable('');
        this.caption = new FieldCaptionViewModel_1.FieldCaptionViewModel();
        this.value = new FieldValueViewModel_1.FieldValueViewModel();
        this.isVisible = ko.observable(true);
        var template = new RowFieldTemplate_1.RowFieldTemplate();
        this.componentName(template.componentName);
        template.register();
    }
    return SimpleFieldViewModel;
}());
exports.SimpleFieldViewModel = SimpleFieldViewModel;
//# sourceMappingURL=SimpleFieldViewModel.js.map