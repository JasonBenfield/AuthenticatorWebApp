"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLog = void 0;
var ConsoleLog = /** @class */ (function () {
    function ConsoleLog() {
    }
    ConsoleLog.prototype.info = function (message) {
        console.info(message);
    };
    ConsoleLog.prototype.warn = function (message) {
        console.warn(message);
    };
    ConsoleLog.prototype.error = function (message) {
        console.error(message);
    };
    return ConsoleLog;
}());
exports.ConsoleLog = ConsoleLog;
//# sourceMappingURL=ConsoleLog.js.map