"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CssClass_1 = require("../CssClass");
var FieldValue = /** @class */ (function () {
    function FieldValue(prefix, name, vm, fieldValue) {
        this.vm = vm;
        this.fieldValue = fieldValue;
        this.changed = this.vm.changed;
        this.name = prefix ? prefix + "_" + name : name;
        this.vm.name(this.name);
        this.changed.register(this.onValueChanged.bind(this));
    }
    FieldValue.prototype.onValueChanged = function (updatedValue) {
        this.fieldValue.setValueFromView(updatedValue);
    };
    FieldValue.prototype.getName = function () { return this.name; };
    FieldValue.prototype.getValue = function () {
        return this.fieldValue.getValue();
    };
    FieldValue.prototype.setValue = function (value) {
        this.fieldValue.setValue(value);
        var currentViewValue = this.vm.value();
        var updatedViewValue = this.fieldValue.toView();
        if (currentViewValue !== updatedViewValue) {
            this.vm.value(updatedViewValue);
        }
    };
    FieldValue.prototype.setColumns = function (columns) {
        var css = new CssClass_1.CssClass('');
        if (columns) {
            css.addName(columns.toString());
        }
        this.vm.css(css.toString());
    };
    FieldValue.prototype.show = function () {
        this.vm.isVisible(true);
    };
    FieldValue.prototype.hide = function () {
        this.vm.isVisible(false);
    };
    FieldValue.prototype.enable = function () {
        this.vm.isEnabled(true);
    };
    FieldValue.prototype.disable = function () {
        this.vm.isEnabled(false);
    };
    return FieldValue;
}());
exports.FieldValue = FieldValue;
//# sourceMappingURL=FieldValue.js.map