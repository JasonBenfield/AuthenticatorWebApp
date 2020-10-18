"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalBindingHandler = void 0;
var ko = require("knockout");
var $ = require("jquery");
require("bootstrap");
var ModalBindingHandler = /** @class */ (function () {
    function ModalBindingHandler() {
    }
    ModalBindingHandler.prototype.init = function (element, valueAccessor) {
        $(element).on('hidden.bs.modal', function (e) {
            var options = ko.unwrap(valueAccessor());
            options.handleClose();
        });
    };
    ModalBindingHandler.prototype.update = function (element, valueAccessor) {
        var modal = $(element);
        var options = ko.unwrap(valueAccessor());
        var command = options.command();
        if (command) {
            modal.modal(command);
            options.command('');
        }
    };
    return ModalBindingHandler;
}());
exports.ModalBindingHandler = ModalBindingHandler;
//# sourceMappingURL=ModalBindingHandler.js.map