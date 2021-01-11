"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var $ = require("jquery");
var DelegatedEventBindingHandler = /** @class */ (function () {
    function DelegatedEventBindingHandler() {
    }
    DelegatedEventBindingHandler.prototype.init = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $element = $(element);
        var value = valueAccessor() || [];
        if (!$.isArray(value)) {
            value = [value];
        }
        var eventsToHandle = value;
        var _loop_1 = function (eventOptions) {
            $element.on(eventOptions.event + ".delegatedEvent", eventOptions.selector, function (event) {
                var context = ko.dataFor(this);
                var result = eventOptions.callback.call(viewModel, context, event.originalEvent || event);
                if (result !== true) {
                    event.preventDefault();
                }
                return result === undefined ? false : result;
            });
        };
        for (var _i = 0, eventsToHandle_1 = eventsToHandle; _i < eventsToHandle_1.length; _i++) {
            var eventOptions = eventsToHandle_1[_i];
            _loop_1(eventOptions);
        }
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var $el = $element;
            if ($el) {
                $el.off('.delegatedEvent');
            }
            $element = null;
        });
    };
    return DelegatedEventBindingHandler;
}());
exports.DelegatedEventBindingHandler = DelegatedEventBindingHandler;
//# sourceMappingURL=DelegatedEventBindingHandler.js.map