"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateInputField_1 = require("./DateInputField");
var DropDownField_1 = require("./DropDownField");
var FieldCaption_1 = require("./FieldCaption");
var FieldCollection_1 = require("./FieldCollection");
var FieldValue_1 = require("./FieldValue");
var FieldViewValue_1 = require("./FieldViewValue");
var NumberInputField_1 = require("./NumberInputField");
var TextInputField_1 = require("./TextInputField");
var ComplexField = /** @class */ (function () {
    function ComplexField(prefix, name, captionVM, valueVM) {
        this.fields = new FieldCollection_1.FieldCollection();
        this.caption = new FieldCaption_1.FieldCaption(captionVM);
        this.value = new FieldValue_1.FieldValue(prefix, name, valueVM, new FieldViewValue_1.FieldViewValue());
    }
    ComplexField.prototype.getName = function () {
        return this.value.getName();
    };
    ComplexField.prototype.getCaption = function () {
        return this.caption.getCaption();
    };
    ComplexField.prototype.getField = function (name) {
        if (this.getName() === name) {
            return this;
        }
        return this.fields.getField(name);
    };
    ComplexField.prototype.setValue = function (value) { this.value.setValue(value); };
    ComplexField.prototype.getValue = function () {
        return this.value.getValue();
    };
    ComplexField.prototype.setColumns = function (captionColumns, valueColumns) {
        this.caption.setColumns(captionColumns);
        this.value.setColumns(valueColumns);
    };
    ComplexField.prototype.addHiddenTextField = function (name, vm) {
        return this.addField(TextInputField_1.TextInputField.hidden(this.getName(), name, vm));
    };
    ComplexField.prototype.addHiddenNumberField = function (name, vm) {
        return this.addField(NumberInputField_1.NumberInputField.hidden(this.getName(), name, vm));
    };
    ComplexField.prototype.addHiddenDateField = function (name, vm) {
        return this.addField(DateInputField_1.DateInputField.hidden(this.getName(), name, vm));
    };
    ComplexField.prototype.addTextInputField = function (name, vm) {
        return this.addField(new TextInputField_1.TextInputField(this.getName(), name, vm));
    };
    ComplexField.prototype.addNumberInputField = function (name, vm) {
        return this.addField(new NumberInputField_1.NumberInputField(this.getName(), name, vm));
    };
    ComplexField.prototype.addDateInputField = function (name, vm) {
        return this.addField(new DateInputField_1.DateInputField(this.getName(), name, vm));
    };
    ComplexField.prototype.addDropDownField = function (name, vm) {
        return this.addField(new DropDownField_1.DropDownField(this.getName(), name, vm));
    };
    ComplexField.prototype.addField = function (field) {
        return this.fields.addField(field);
    };
    ComplexField.prototype.clearErrors = function () {
        this.fields.clearErrors();
    };
    ComplexField.prototype.validate = function (errors) {
        this.fields.validate(errors);
    };
    ComplexField.prototype.import = function (values) {
        this.fields.import(values);
    };
    ComplexField.prototype.export = function (values) {
        this.fields.export(values);
    };
    return ComplexField;
}());
exports.ComplexField = ComplexField;
//# sourceMappingURL=ComplexField.js.map