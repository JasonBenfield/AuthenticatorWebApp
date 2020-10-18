"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonText = void 0;
var JsonText = /** @class */ (function () {
    function JsonText(data) {
        this.value = JSON.stringify(data);
    }
    JsonText.prototype.toString = function () {
        return this.value;
    };
    return JsonText;
}());
exports.JsonText = JsonText;
//# sourceMappingURL=JsonText.js.map