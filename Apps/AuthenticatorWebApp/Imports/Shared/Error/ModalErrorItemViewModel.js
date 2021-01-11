"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var ModalErrorItemViewModel = /** @class */ (function () {
    function ModalErrorItemViewModel(error) {
        this.error = error;
        this.captionCss = ko.observable('');
        this.caption = ko.observable('');
        this.messageCss = ko.observable('');
        this.message = ko.observable('');
        this.caption(error.Caption);
        this.message(error.Message);
    }
    return ModalErrorItemViewModel;
}());
exports.ModalErrorItemViewModel = ModalErrorItemViewModel;
//# sourceMappingURL=ModalErrorItemViewModel.js.map