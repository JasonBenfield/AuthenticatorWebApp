"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FieldViewValue_1 = require("./FieldViewValue");
var SimpleField_1 = require("./SimpleField");
var DropDownField = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownField, _super);
    function DropDownField(prefix, name, vm) {
        var _this = _super.call(this, prefix, name, vm, new FieldViewValue_1.FieldViewValue()) || this;
        _this.dropDownVM = vm;
        return _this;
    }
    DropDownField.prototype.setItems = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.dropDownVM.value.items(items);
    };
    DropDownField.prototype.setItemCaption = function (itemCaption) {
        this.dropDownVM.value.itemsCaption(itemCaption);
    };
    DropDownField.prototype.setValue = function (value) { _super.prototype.setValue.call(this, value); };
    DropDownField.prototype.getValue = function () { return _super.prototype.getValue.call(this); };
    DropDownField.prototype.setFocus = function () { this.dropDownVM.value.hasFocus(true); };
    DropDownField.prototype.blur = function () { this.dropDownVM.value.hasFocus(false); };
    return DropDownField;
}(SimpleField_1.SimpleField));
exports.DropDownField = DropDownField;
//# sourceMappingURL=DropDownField.js.map