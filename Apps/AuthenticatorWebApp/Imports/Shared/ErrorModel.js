"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorModel = /** @class */ (function () {
    function ErrorModel(Message, Caption, Source, context) {
        if (Caption === void 0) { Caption = ''; }
        if (Source === void 0) { Source = ''; }
        this.Message = Message;
        this.Caption = Caption;
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