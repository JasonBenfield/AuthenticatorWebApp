"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ko = require("knockout");
var template = require("./DropDownField.html");
var ComponentTemplate_1 = require("../ComponentTemplate");
var SimpleFieldViewModel_1 = require("./SimpleFieldViewModel");
var FieldValueViewModel_1 = require("./FieldValueViewModel");
var DropDownFieldViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownFieldViewModel, _super);
    function DropDownFieldViewModel() {
        var _this = _super.call(this) || this;
        _this.value = new DropDownFieldValueViewModel();
        return _this;
    }
    return DropDownFieldViewModel;
}(SimpleFieldViewModel_1.SimpleFieldViewModel));
exports.DropDownFieldViewModel = DropDownFieldViewModel;
var DropDownFieldValueViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownFieldValueViewModel, _super);
    function DropDownFieldValueViewModel() {
        var _this = _super.call(this) || this;
        _this.items = ko.observableArray([]);
        _this.itemsText = ko.observable('displayText');
        _this.itemsValue = ko.observable('value');
        _this.itemsCaption = ko.observable('');
        _this.hasFocus = ko.observable(false);
        _this.inputComponentName('drop-down-field');
        new ComponentTemplate_1.ComponentTemplate(_this.inputComponentName(), template).register();
        _this.value.subscribe(_this.onValueChanged.bind(_this));
        return _this;
    }
    DropDownFieldValueViewModel.prototype.onValueChanged = function (value) {
        this.change(value);
    };
    return DropDownFieldValueViewModel;
}(FieldValueViewModel_1.FieldValueViewModel));
exports.DropDownFieldValueViewModel = DropDownFieldValueViewModel;
//# sourceMappingURL=DropDownFieldViewModel.js.map