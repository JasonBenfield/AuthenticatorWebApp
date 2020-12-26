"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Awaitable = void 0;
var Awaitable = /** @class */ (function () {
    function Awaitable() {
        this._resolve = null;
    }
    Awaitable.prototype.isInProgress = function () {
        return this._resolve !== null;
    };
    Awaitable.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._resolve = resolve;
        });
    };
    Awaitable.prototype.resolve = function (result) {
        var resolve = this._resolve;
        this._resolve = null;
        if (resolve) {
            resolve(result);
        }
    };
    return Awaitable;
}());
exports.Awaitable = Awaitable;
//# sourceMappingURL=Awaitable.js.map