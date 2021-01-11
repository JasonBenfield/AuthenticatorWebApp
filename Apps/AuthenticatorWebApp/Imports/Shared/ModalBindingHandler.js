"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var $ = require("jquery");
var bootstrap_1 = require("bootstrap");
var ModalBindingHandler = /** @class */ (function () {
    function ModalBindingHandler() {
    }
    ModalBindingHandler.prototype.init = function (element, valueAccessor) {
        var modal = new bootstrap_1.Modal(element);
        $(element).data('bs.modal', modal);
        element.addEventListener('hidden.bs.modal', function () {
            var options = ko.unwrap(valueAccessor());
            if (options) {
                options.handleClose();
            }
        });
        var computed = ko.computed(function () {
            var options = ko.unwrap(valueAccessor());
            if (options) {
                var command = options.command();
                if (command) {
                    if (command === 'show') {
                        modal.show();
                    }
                    else if (command === 'hide') {
                        modal.hide();
                    }
                    options.command('');
                }
            }
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var m = modal;
            if (m) {
                m.dispose();
            }
            modal = null;
            var c = computed;
            if (c) {
                c.dispose();
            }
            computed = null;
        });
    };
    return ModalBindingHandler;
}());
exports.ModalBindingHandler = ModalBindingHandler;
//# sourceMappingURL=ModalBindingHandler.js.map