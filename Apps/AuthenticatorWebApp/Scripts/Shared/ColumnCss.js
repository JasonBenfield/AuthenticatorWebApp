"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnCss = void 0;
var CssClass_1 = require("./CssClass");
var ColumnCss = /** @class */ (function () {
    function ColumnCss(options) {
        this.cssClass = new CssClass_1.CssClass();
        if (typeof options === 'number') {
            if (options >= 0) {
                this.cssClass.addName(this.getCssClass('xs', options));
            }
        }
        else if (options) {
            if (options.xs >= 0) {
                this.cssClass.addName(this.getCssClass('xs', options.xs));
            }
            if (options.sm >= 0) {
                this.cssClass.addName(this.getCssClass('sm', options.xs));
            }
            if (options.md >= 0) {
                this.cssClass.addName(this.getCssClass('md', options.xs));
            }
            if (options.lg >= 0) {
                this.cssClass.addName(this.getCssClass('lg', options.xs));
            }
            if (options.xl >= 0) {
                this.cssClass.addName(this.getCssClass('xl', options.xs));
            }
        }
    }
    ColumnCss.prototype.getCssClass = function (size, columns) {
        var css = 'col';
        if (size && size !== 'xs') {
            css += "-" + size;
        }
        if (columns > 0) {
            css += "-" + columns;
        }
        return css;
    };
    ColumnCss.prototype.toString = function () {
        return this.cssClass.toString();
    };
    return ColumnCss;
}());
exports.ColumnCss = ColumnCss;
//# sourceMappingURL=ColumnCss.js.map