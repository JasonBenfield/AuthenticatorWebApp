"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalOptionsViewModel = void 0;
var ko = require("knockout");
var Events_1 = require("./Events");
var ModalOptionsViewModel = /** @class */ (function () {
    function ModalOptionsViewModel() {
        this.command = ko.observable('');
        this._closed = new Events_1.SimpleEvent(this);
        this.closed = new Events_1.DefaultEventHandler(this._closed);
    }
    ModalOptionsViewModel.prototype.handleClose = function () {
        this._closed.invoke();
    };
    return ModalOptionsViewModel;
}());
exports.ModalOptionsViewModel = ModalOptionsViewModel;
//# sourceMappingURL=ModalOptionsViewModel.js.map