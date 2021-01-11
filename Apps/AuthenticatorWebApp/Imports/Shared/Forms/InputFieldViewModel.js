"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ko = require("knockout");
var ComponentTemplate_1 = require("../ComponentTemplate");
var SimpleFieldViewModel_1 = require("./SimpleFieldViewModel");
var template = require("./InputField.html");
var FieldValueViewModel_1 = require("./FieldValueViewModel");
var InputFieldViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(InputFieldViewModel, _super);
    function InputFieldViewModel() {
        var _this = _super.call(this) || this;
        _this.value = new InputFieldValueViewModel();
        return _this;
    }
    return InputFieldViewModel;
}(SimpleFieldViewModel_1.SimpleFieldViewModel));
exports.InputFieldViewModel = InputFieldViewModel;
var InputFieldValueViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(InputFieldValueViewModel, _super);
    function InputFieldValueViewModel() {
        var _this = _super.call(this) || this;
        _this.type = ko.observable('');
        _this.hasFocus = ko.observable(false);
        _this.maxLength = ko.observable(null);
        _this.inputComponentName('input-field');
        new ComponentTemplate_1.ComponentTemplate(_this.inputComponentName(), template).register();
        _this.value.subscribe(_this.onValueChanged.bind(_this));
        return _this;
    }
    InputFieldValueViewModel.prototype.onValueChanged = function (value) {
        this.change(value);
    };
    return InputFieldValueViewModel;
}(FieldValueViewModel_1.FieldValueViewModel));
exports.InputFieldValueViewModel = InputFieldValueViewModel;
//# sourceMappingURL=InputFieldViewModel.js.map