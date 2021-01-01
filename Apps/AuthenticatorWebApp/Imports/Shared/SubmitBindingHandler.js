"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var Command_1 = require("./Command");
var _ = require("lodash");
var SubmitBindingHandler = /** @class */ (function () {
    function SubmitBindingHandler() {
        this.init = this.init.bind(this);
    }
    SubmitBindingHandler.prototype.init = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        ko.utils.registerEventHandler(element, "submit", function (event) {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            _.delay(function () {
                var unwrapped = ko.utils.unwrapObservable(valueAccessor());
                if (unwrapped instanceof Command_1.CommandViewModel) {
                    unwrapped.requestExecute.call(unwrapped, element);
                }
                else if (_.isFunction(unwrapped)) {
                    unwrapped.call(unwrapped, element);
                }
            }, 300);
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
        });
    };
    return SubmitBindingHandler;
}());
exports.SubmitBindingHandler = SubmitBindingHandler;
//# sourceMappingURL=SubmitBindingHandler.js.map