"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var SimpleField_1 = require("./SimpleField");
var TextToNumberViewValue_1 = require("./TextToNumberViewValue");
var NumberInputField = /** @class */ (function (_super) {
    tslib_1.__extends(NumberInputField, _super);
    function NumberInputField(prefix, name, vm, viewValue) {
        if (viewValue === void 0) { viewValue = null; }
        var _this = _super.call(this, prefix, name, vm, viewValue || new TextToNumberViewValue_1.TextToNumberViewValue()) || this;
        _this.constraints = new ConstraintCollection_1.NumberConstraintCollection();
        _this.inputVM = vm;
        _this.inputVM.value.type('text');
        return _this;
    }
    NumberInputField.hidden = function (prefix, name, vm, viewValue) {
        if (viewValue === void 0) { viewValue = new TextToNumberViewValue_1.TextToNumberViewValue(); }
        var field = new NumberInputField(prefix, name, vm, viewValue);
        vm.value.type('hidden');
        return field;
    };
    ;
    NumberInputField.prototype.setFocus = function () { this.inputVM.value.hasFocus(true); };
    NumberInputField.prototype.blur = function () { this.inputVM.value.hasFocus(false); };
    NumberInputField.prototype.setValue = function (value) { _super.prototype.setValue.call(this, value); };
    NumberInputField.prototype.getValue = function () { return _super.prototype.getValue.call(this); };
    NumberInputField.prototype.protect = function () {
        this.inputVM.value.type('password');
    };
    return NumberInputField;
}(SimpleField_1.SimpleField));
exports.NumberInputField = NumberInputField;
//# sourceMappingURL=NumberInputField.js.map