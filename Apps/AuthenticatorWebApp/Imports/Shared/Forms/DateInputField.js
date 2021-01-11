"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var SimpleField_1 = require("./SimpleField");
var TextToDateViewValue_1 = require("./TextToDateViewValue");
var DateInputField = /** @class */ (function (_super) {
    tslib_1.__extends(DateInputField, _super);
    function DateInputField(prefix, name, vm, viewValue) {
        if (viewValue === void 0) { viewValue = null; }
        var _this = _super.call(this, prefix, name, vm, viewValue || new TextToDateViewValue_1.TextToDateViewValue()) || this;
        _this.constraints = new ConstraintCollection_1.DateConstraintCollection();
        _this.inputVM = vm;
        _this.inputVM.value.type('date');
        return _this;
    }
    DateInputField.hidden = function (prefix, name, vm, viewValue) {
        if (viewValue === void 0) { viewValue = new TextToDateViewValue_1.TextToDateViewValue(); }
        var field = new DateInputField(prefix, name, vm, viewValue);
        vm.value.type('hidden');
        return field;
    };
    ;
    DateInputField.prototype.setFocus = function () { this.inputVM.value.hasFocus(true); };
    DateInputField.prototype.blur = function () { this.inputVM.value.hasFocus(false); };
    DateInputField.prototype.setValue = function (value) { _super.prototype.setValue.call(this, value); };
    DateInputField.prototype.getValue = function () { return _super.prototype.getValue.call(this); };
    return DateInputField;
}(SimpleField_1.SimpleField));
exports.DateInputField = DateInputField;
//# sourceMappingURL=DateInputField.js.map