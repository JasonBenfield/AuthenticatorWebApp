"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var Events_1 = require("../Events");
var ModalErrorViewModel = /** @class */ (function () {
    function ModalErrorViewModel() {
        this.errors = ko.observableArray([]);
        this.caption = ko.observable('');
        this._errorSelected = new Events_1.DefaultEvent(this);
        this.errorSelected = new Events_1.DefaultEventHandler(this._errorSelected);
    }
    ModalErrorViewModel.prototype.onErrorSelected = function (errorItemVM) {
        this._errorSelected.invoke(errorItemVM.error);
    };
    return ModalErrorViewModel;
}());
exports.ModalErrorViewModel = ModalErrorViewModel;
//# sourceMappingURL=ModalErrorViewModel.js.map