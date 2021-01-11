"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstraintCollection_1 = require("./ConstraintCollection");
var ErrorList_1 = require("./ErrorList");
var FieldCaption_1 = require("./FieldCaption");
var FieldValue_1 = require("./FieldValue");
var SimpleField = /** @class */ (function () {
    function SimpleField(prefix, name, vm, fieldValue) {
        this.vm = vm;
        this.constraints = new ConstraintCollection_1.ConstraintCollection();
        this.caption = new FieldCaption_1.FieldCaption(vm.caption);
        this.value = new FieldValue_1.FieldValue(prefix, name, vm.value, fieldValue);
    }
    SimpleField.prototype.getName = function () {
        return this.value.getName();
    };
    SimpleField.prototype.getCaption = function () {
        return this.caption.getCaption();
    };
    SimpleField.prototype.getField = function (name) { return this.getName() === name ? this : null; };
    SimpleField.prototype.setValue = function (value) { this.value.setValue(value); };
    SimpleField.prototype.getValue = function () {
        return this.value.getValue();
    };
    SimpleField.prototype.setColumns = function (captionColumns, valueColumns) {
        this.caption.setColumns(captionColumns);
        this.value.setColumns(valueColumns);
    };
    SimpleField.prototype.show = function () {
        this.vm.isVisible(true);
    };
    SimpleField.prototype.hide = function () {
        this.vm.isVisible(false);
    };
    SimpleField.prototype.enable = function () {
        this.value.enable();
    };
    SimpleField.prototype.disable = function () {
        this.value.disable();
    };
    SimpleField.prototype.clearErrors = function () {
        this.vm.value.errors([]);
        this.vm.value.hasError(false);
    };
    SimpleField.prototype.validate = function (errors) {
        var fieldErrors = new ErrorList_1.ErrorList();
        this.constraints.validate(fieldErrors, this);
        this.vm.value.errors(fieldErrors.values());
        this.vm.value.hasError(fieldErrors.hasErrors());
        errors.merge(fieldErrors);
    };
    SimpleField.prototype.import = function (values) {
        var value = values[this.getName()];
        if (value !== undefined) {
            this.value.setValue(value);
        }
    };
    SimpleField.prototype.export = function (values) {
        values[this.getName()] = this.getValue();
    };
    return SimpleField;
}());
exports.SimpleField = SimpleField;
//# sourceMappingURL=SimpleField.js.map