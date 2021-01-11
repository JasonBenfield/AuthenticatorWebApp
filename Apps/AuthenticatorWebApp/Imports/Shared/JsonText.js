"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonText = /** @class */ (function () {
    function JsonText(data) {
        this.formatDates(data);
        this.value = JSON.stringify(data);
    }
    JsonText.prototype.formatDates = function (obj) {
        if (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (var i = 0; i < obj.length; i++) {
                    var el = obj[i];
                    if (el instanceof Date) {
                        obj[i] = el.toISOString();
                    }
                    else {
                        this.formatDates(el);
                    }
                }
            }
            else if (typeof (obj) !== 'string' && typeof (obj) !== 'boolean' && typeof (obj) !== 'number') {
                for (var prop in obj) {
                    if (prop) {
                        var value = obj[prop];
                        if (value instanceof Date) {
                            obj[prop] = value.toISOString();
                        }
                        else {
                            this.formatDates(value);
                        }
                    }
                }
            }
        }
    };
    JsonText.prototype.toString = function () {
        return this.value;
    };
    return JsonText;
}());
exports.JsonText = JsonText;
//# sourceMappingURL=JsonText.js.map