"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CssClass_1 = require("../CssClass");
var FieldCaption = /** @class */ (function () {
    function FieldCaption(vm) {
        this.vm = vm;
    }
    FieldCaption.prototype.setCaption = function (caption) {
        this.caption = caption;
        this.vm.caption(caption);
    };
    FieldCaption.prototype.getCaption = function () {
        return this.caption;
    };
    FieldCaption.prototype.setColumns = function (columns) {
        var css = new CssClass_1.CssClass('col-form-label');
        if (columns) {
            css.addName(columns.toString());
        }
        this.vm.css(css.toString());
    };
    return FieldCaption;
}());
exports.FieldCaption = FieldCaption;
//# sourceMappingURL=FieldCaption.js.map