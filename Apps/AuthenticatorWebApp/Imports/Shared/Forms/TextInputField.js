"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var FieldViewValue_1 = require("./FieldViewValue");
var SimpleField_1 = require("./SimpleField");
var TextInputField = /** @class */ (function (_super) {
    tslib_1.__extends(TextInputField, _super);
    function TextInputField(prefix, name, vm, viewValue) {
        if (viewValue === void 0) { viewValue = null; }
        var _this = _super.call(this, prefix, name, vm, viewValue || new FieldViewValue_1.FieldViewValue()) || this;
        _this.constraints = new ConstraintCollection_1.TextConstraintCollection();
        vm.value.type('text');
        _this.inputVM = vm;
        return _this;
    }
    TextInputField.hidden = function (prefix, name, vm, viewValue) {
        if (viewValue === void 0) { viewValue = new FieldViewValue_1.FieldViewValue(); }
        var field = new TextInputField(prefix, name, vm, viewValue);
        vm.value.type('hidden');
        return field;
    };
    ;
    TextInputField.prototype.protect = function () {
        this.inputVM.value.type('password');
    };
    TextInputField.prototype.setFocus = function () { this.inputVM.value.hasFocus(true); };
    TextInputField.prototype.blur = function () { this.inputVM.value.hasFocus(false); };
    TextInputField.prototype.setValue = function (value) { _super.prototype.setValue.call(this, value); };
    TextInputField.prototype.getValue = function () { return _super.prototype.getValue.call(this); };
    TextInputField.prototype.setMaxLength = function (maxLength) {
        this.inputVM.value.maxLength(maxLength);
    };
    return TextInputField;
}(SimpleField_1.SimpleField));
exports.TextInputField = TextInputField;
//# sourceMappingURL=TextInputField.js.map