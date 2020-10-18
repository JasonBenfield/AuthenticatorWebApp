"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = void 0;
var ErrorModel = /** @class */ (function () {
    function ErrorModel(Message, Source, context) {
        if (Source === void 0) { Source = ''; }
        this.Message = Message;
        this.Source = Source;
        this.context = context;
    }
    ErrorModel.prototype.toString = function () {
        var str = '';
        if (this.Source) {
            str += this.Source + ", ";
        }
        str += this.Message;
        return str;
    };
    return ErrorModel;
}());
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=ErrorModel.js.map