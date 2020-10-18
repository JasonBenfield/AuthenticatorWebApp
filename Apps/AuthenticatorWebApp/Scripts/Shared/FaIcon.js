"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaIcon = exports.FaIconNames = exports.FaIconPrefix = exports.FaIconViewModel = void 0;
var ko = require("knockout");
var CssClass_1 = require("./CssClass");
var ComponentTemplate_1 = require("./ComponentTemplate");
var template = require("./Templates/FaIcon.html");
var FaIconViewModel = /** @class */ (function () {
    function FaIconViewModel() {
        this.templateName = 'fa-icon';
        this.cssClass = ko.observable('');
        this.isVisible = ko.observable(true);
        new ComponentTemplate_1.ComponentTemplate(this.templateName, template).register();
    }
    return FaIconViewModel;
}());
exports.FaIconViewModel = FaIconViewModel;
var FaIconPrefix;
(function (FaIconPrefix) {
    FaIconPrefix[FaIconPrefix["solid"] = 0] = "solid";
    FaIconPrefix[FaIconPrefix["regular"] = 1] = "regular";
})(FaIconPrefix = exports.FaIconPrefix || (exports.FaIconPrefix = {}));
var FaIconNames = /** @class */ (function () {
    function FaIconNames() {
    }
    FaIconNames.login = 'sign-in-alt';
    FaIconNames.save = 'check';
    FaIconNames.cancel = 'times';
    return FaIconNames;
}());
exports.FaIconNames = FaIconNames;
var FaIcon = /** @class */ (function () {
    function FaIcon(vm, name, prefix) {
        if (prefix === void 0) { prefix = FaIconPrefix.solid; }
        this.vm = vm;
        this.name = name;
        this.prefix = prefix;
        this.cssClass = new CssClass_1.CssClass();
        this.cssClass.addNames(this.prefixCss(this.prefix), this.name);
        this.updateVmCssClass();
    }
    FaIcon.prototype.prefixCss = function (prefix) {
        var css;
        if (prefix === FaIconPrefix.regular) {
            css = 'far';
        }
        else if (prefix === FaIconPrefix.solid) {
            css = 'fas';
        }
        return css;
    };
    FaIcon.prototype.changeName = function (name) {
        this.cssClass.removeName(this.name);
        this.cssClass.addName(name);
        this.updateVmCssClass();
    };
    FaIcon.prototype.updateVmCssClass = function () {
        this.vm.cssClass(this.cssClass.toString());
        this.vm.isVisible(Boolean(this.name));
    };
    return FaIcon;
}());
exports.FaIcon = FaIcon;
//# sourceMappingURL=FaIcon.js.map