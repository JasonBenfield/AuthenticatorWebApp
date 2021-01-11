"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var bootstrap_1 = require("bootstrap");
var $ = require("jquery");
var DropdownBindingHandler = /** @class */ (function () {
    function DropdownBindingHandler() {
    }
    DropdownBindingHandler.prototype.init = function (element, valueAccessor) {
        var dropdown = new bootstrap_1.Dropdown(element);
        $(element).data('bs.dropdown', dropdown);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var d = dropdown;
            if (d) {
                d.dispose();
            }
            dropdown = null;
        });
    };
    return DropdownBindingHandler;
}());
exports.DropdownBindingHandler = DropdownBindingHandler;
//# sourceMappingURL=DropdownBindingHandler.js.map