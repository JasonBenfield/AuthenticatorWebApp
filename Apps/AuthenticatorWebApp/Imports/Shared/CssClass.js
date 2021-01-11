"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinedStrings_1 = require("./JoinedStrings");
var CssClass = /** @class */ (function () {
    function CssClass() {
        var initialNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            initialNames[_i] = arguments[_i];
        }
        this.value = null;
        this.names = [];
        if (initialNames) {
            this.addNames.apply(this, initialNames);
        }
    }
    CssClass.prototype.addName = function (name) {
        return this.addNames(name);
    };
    CssClass.prototype.addNames = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var added = false;
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var name_1 = names_1[_a];
            if (this._addName(name_1)) {
                added = true;
            }
        }
        if (added) {
            this.updateValue();
        }
        return this;
    };
    CssClass.prototype._addName = function (name) {
        var added = false;
        if (name) {
            var nameParts = name.split(/\s+/);
            if (nameParts.length > 1) {
                for (var _i = 0, nameParts_1 = nameParts; _i < nameParts_1.length; _i++) {
                    var namePart = nameParts_1[_i];
                    if (this._addName(namePart)) {
                        added = true;
                    }
                }
            }
            else {
                var index = this.names.indexOf(nameParts[0]);
                if (index < 0) {
                    this.names.push(nameParts[0]);
                    added = true;
                }
            }
        }
        return added;
    };
    CssClass.prototype.removeName = function (name) {
        return this.removeNames(name);
    };
    CssClass.prototype.removeNames = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var removed = false;
        for (var _a = 0, names_2 = names; _a < names_2.length; _a++) {
            var name_2 = names_2[_a];
            if (this._removeName(name_2)) {
                removed = true;
            }
        }
        if (removed) {
            this.updateValue();
        }
        return this;
    };
    CssClass.prototype._removeName = function (name) {
        var removed = false;
        if (name) {
            var nameParts = name.split(/\s+/);
            if (nameParts.length > 1) {
                for (var _i = 0, nameParts_2 = nameParts; _i < nameParts_2.length; _i++) {
                    var namePart = nameParts_2[_i];
                    if (this._removeName(namePart)) {
                        removed = true;
                    }
                }
            }
            else {
                var index = this.names.indexOf(nameParts[0]);
                if (index < 0) {
                    this.names.splice(index, 1);
                    removed = true;
                }
            }
        }
        return removed;
    };
    CssClass.prototype.updateValue = function () {
        this.value = this.names.length > 0 ? new JoinedStrings_1.JoinedStrings(' ', this.names).value() : null;
    };
    CssClass.prototype.toString = function () {
        return this.value;
    };
    return CssClass;
}());
exports.CssClass = CssClass;
//# sourceMappingURL=CssClass.js.map