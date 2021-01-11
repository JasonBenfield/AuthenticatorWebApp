"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var ContextualClassViewModel = /** @class */ (function () {
    function ContextualClassViewModel() {
        this.isDefault = ko.observable(false);
        this.isSuccess = ko.observable(false);
        this.isInfo = ko.observable(false);
        this.isWarning = ko.observable(false);
        this.isDanger = ko.observable(false);
        this.isPrimary = ko.observable(false);
        this.isSecondary = ko.observable(false);
        this.isLight = ko.observable(false);
        this.isDark = ko.observable(false);
    }
    return ContextualClassViewModel;
}());
exports.ContextualClassViewModel = ContextualClassViewModel;
var ContextualClassNames = /** @class */ (function () {
    function ContextualClassNames() {
    }
    ContextualClassNames.default = 'default';
    ContextualClassNames.success = 'success';
    ContextualClassNames.info = 'info';
    ContextualClassNames.warning = 'warning';
    ContextualClassNames.danger = 'danger';
    ContextualClassNames.primary = 'primary';
    ContextualClassNames.secondary = 'secondary';
    ContextualClassNames.light = 'light';
    ContextualClassNames.dark = 'dark';
    return ContextualClassNames;
}());
exports.ContextualClassNames = ContextualClassNames;
var ContextualClass = /** @class */ (function () {
    function ContextualClass(vm, value) {
        this.vm = vm;
        this.value = value;
        this.vm.isDefault(this.equals(ContextualClassNames.default));
        this.vm.isSuccess(this.equals(ContextualClassNames.success));
        this.vm.isInfo(this.equals(ContextualClassNames.info));
        this.vm.isWarning(this.equals(ContextualClassNames.warning));
        this.vm.isDanger(this.equals(ContextualClassNames.danger));
        this.vm.isPrimary(this.equals(ContextualClassNames.primary));
        this.vm.isSecondary(this.equals(ContextualClassNames.secondary));
        this.vm.isLight(this.equals(ContextualClassNames.light));
        this.vm.isDark(this.equals(ContextualClassNames.dark));
    }
    ContextualClass.default = function (vm) { return new ContextualClass(vm, ContextualClassNames.default); };
    ContextualClass.success = function (vm) { return new ContextualClass(vm, ContextualClassNames.success); };
    ContextualClass.info = function (vm) { return new ContextualClass(vm, ContextualClassNames.info); };
    ContextualClass.warning = function (vm) { return new ContextualClass(vm, ContextualClassNames.warning); };
    ContextualClass.danger = function (vm) { return new ContextualClass(vm, ContextualClassNames.danger); };
    ContextualClass.primary = function (vm) { return new ContextualClass(vm, ContextualClassNames.primary); };
    ContextualClass.secondary = function (vm) { return new ContextualClass(vm, ContextualClassNames.secondary); };
    ContextualClass.light = function (vm) { return new ContextualClass(vm, ContextualClassNames.light); };
    ContextualClass.dark = function (vm) { return new ContextualClass(vm, ContextualClassNames.dark); };
    ContextualClass.prototype.equals = function (other) {
        if (other) {
            if (typeof other === 'string') {
                return this.value === other;
            }
            return this.value === other.value;
        }
        return false;
    };
    ContextualClass.prototype.toString = function () {
        return this.value;
    };
    return ContextualClass;
}());
exports.ContextualClass = ContextualClass;
//# sourceMappingURL=ContextualClass.js.map