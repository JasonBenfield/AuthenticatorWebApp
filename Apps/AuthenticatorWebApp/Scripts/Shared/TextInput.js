"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInput = exports.TextInput = exports.TextInputViewModel = void 0;
var tslib_1 = require("tslib");
var ko = require("knockout");
var Events_1 = require("./Events");
var template = require("./Templates/TextInput.html");
var ComponentTemplate_1 = require("./ComponentTemplate");
var CssClass_1 = require("./CssClass");
var TextInputViewModel = /** @class */ (function () {
    function TextInputViewModel(caption) {
        this.template = ko.observable('text-input');
        this.type = ko.observable('');
        this.caption = ko.observable('');
        this.captionCss = ko.observable('');
        this.isCaptionVisible = ko.observable(true);
        this.value = ko.observable('');
        this.valueCss = ko.observable('');
        this.isValueVisible = ko.observable(true);
        this.isVisible = ko.observable(true);
        this.isEnabled = ko.observable(true);
        this.name = ko.observable(null);
        this._valueChanged = new Events_1.DefaultEvent(this);
        this.valueChanged = new Events_1.DefaultEventHandler(this._valueChanged);
        new ComponentTemplate_1.ComponentTemplate(this.template(), template).register();
        if (caption) {
            this.caption(caption);
        }
    }
    TextInputViewModel.prototype.change = function (value) {
        this._valueChanged.invoke(value);
    };
    return TextInputViewModel;
}());
exports.TextInputViewModel = TextInputViewModel;
var TextInput = /** @class */ (function () {
    function TextInput(vm) {
        this.vm = vm;
        this.valueChanged = this.vm.valueChanged;
        this.vm.type('text');
        this.setCaptionColumns(null);
    }
    TextInput.prototype.setColumns = function (captionColumns, valueColumns) {
        this.setCaptionColumns(captionColumns);
        this.setValueColumns(valueColumns);
    };
    TextInput.prototype.setCaptionColumns = function (columns) {
        var captionCss = new CssClass_1.CssClass('col-form-label');
        if (columns) {
            captionCss.addName(columns.toString());
        }
        this.vm.captionCss(captionCss.toString());
    };
    TextInput.prototype.setValueColumns = function (columns) {
        var valueCss = new CssClass_1.CssClass('');
        if (columns) {
            valueCss.addName(columns.toString());
        }
        this.vm.valueCss(valueCss.toString());
    };
    TextInput.prototype.named = function (name) {
        this.vm.name(name);
    };
    TextInput.prototype.setCaption = function (caption) {
        this.vm.caption(caption);
    };
    TextInput.prototype.setValue = function (text) {
        this.vm.value(text);
    };
    TextInput.prototype.getValue = function () { return this.vm.value(); };
    TextInput.prototype.show = function () {
        this.vm.isVisible(true);
    };
    TextInput.prototype.hide = function () {
        this.vm.isVisible(false);
    };
    TextInput.prototype.showCaption = function () {
        this.vm.isCaptionVisible(true);
    };
    TextInput.prototype.hideCaption = function () {
        this.vm.isCaptionVisible(false);
    };
    TextInput.prototype.showValue = function () {
        this.vm.isValueVisible(true);
    };
    TextInput.prototype.hideValue = function () {
        this.vm.isValueVisible(false);
    };
    TextInput.prototype.enable = function () {
        this.vm.isEnabled(true);
    };
    TextInput.prototype.disable = function () {
        this.vm.isEnabled(false);
    };
    return TextInput;
}());
exports.TextInput = TextInput;
var PasswordInput = /** @class */ (function (_super) {
    tslib_1.__extends(PasswordInput, _super);
    function PasswordInput(vm) {
        var _this = _super.call(this, vm) || this;
        vm.type('password');
        return _this;
    }
    return PasswordInput;
}(TextInput));
exports.PasswordInput = PasswordInput;
//# sourceMappingURL=TextInput.js.map