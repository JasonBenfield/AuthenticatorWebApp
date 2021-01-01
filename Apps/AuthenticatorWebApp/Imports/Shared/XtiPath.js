"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinedStrings_1 = require("./JoinedStrings");
var XtiPath = /** @class */ (function () {
    function XtiPath(app, version, group, action, modifier) {
        this.app = app ? app : '';
        this.version = version ? version : '';
        this.group = group ? group : '';
        this.action = action ? action : '';
        this.modifier = modifier ? modifier : '';
        var parts = [this.app, this.version];
        if (this.group) {
            parts.push(this.group);
            if (this.action) {
                parts.push(this.action);
                if (this.modifier) {
                    parts.push(this.modifier);
                }
            }
        }
        this.value = new JoinedStrings_1.JoinedStrings('/', parts).value();
    }
    XtiPath.app = function (appKey, version, modifier) {
        return new XtiPath(appKey, version, '', '', modifier);
    };
    XtiPath.prototype.withGroup = function (group) {
        return new XtiPath(this.app, this.version, group, '', this.modifier);
    };
    XtiPath.prototype.withAction = function (action) {
        return new XtiPath(this.app, this.version, this.group, action, this.modifier);
    };
    XtiPath.prototype.format = function () {
        return this.value;
    };
    XtiPath.prototype.equals = function (other) {
        if (other) {
            return this.value === other.value;
        }
        return false;
    };
    XtiPath.prototype.toString = function () {
        return this.value;
    };
    return XtiPath;
}());
exports.XtiPath = XtiPath;
//# sourceMappingURL=XtiPath.js.map