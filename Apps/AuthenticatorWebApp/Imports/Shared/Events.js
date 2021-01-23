"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ = require("lodash");
var EventCollection = /** @class */ (function () {
    function EventCollection() {
        this._events = [];
        this._identifier = this;
    }
    EventCollection.prototype.register = function (evt, callback, isEnabled) {
        this._events.push(evt.register(callback, this._identifier, isEnabled));
        return this;
    };
    EventCollection.prototype.dispose = function () {
        this.unregisterAll();
    };
    EventCollection.prototype.unregisterAll = function () {
        var _this = this;
        this._events.forEach(function (s) { return s.unregister(_this._identifier); });
        this._events.splice(0, this._events.length);
    };
    return EventCollection;
}());
exports.EventCollection = EventCollection;
var ArrayItemEventCollection = /** @class */ (function () {
    function ArrayItemEventCollection(items) {
        this.items = items;
        this._events = new EventCollection();
        this._arrayEvents = [];
        this._arraySub = this.items.subscribe(this.onArrChanged.bind(this));
    }
    ArrayItemEventCollection.prototype.onArrChanged = function (arr) {
        this.unregisterEvents();
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            for (var _a = 0, _b = this._arrayEvents; _a < _b.length; _a++) {
                var evt = _b[_a];
                var handler = evt.handlerAccessor(item);
                this._events.register(handler, evt.callback, evt.isEnabled);
            }
        }
    };
    ArrayItemEventCollection.prototype.register = function (handlerAccessor, callback, isEnabled) {
        this._arrayEvents.push({
            handlerAccessor: handlerAccessor,
            callback: callback,
            isEnabled: isEnabled
        });
        var items = this.items();
        if (items) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var handler = handlerAccessor(item);
                this._events.register(handler, callback, isEnabled);
            }
        }
        return this;
    };
    ArrayItemEventCollection.prototype.dispose = function () {
        this._arraySub.dispose();
        this.unregisterEvents();
    };
    ArrayItemEventCollection.prototype.unregisterEvents = function () {
        this._events.unregisterAll();
    };
    return ArrayItemEventCollection;
}());
exports.ArrayItemEventCollection = ArrayItemEventCollection;
var DefaultEvent = /** @class */ (function () {
    function DefaultEvent(source) {
        this.source = source;
        this._callbacks = [];
    }
    DefaultEvent.defaultIsEnabled = function () {
        return true;
    };
    DefaultEvent.prototype.register = function (callback, identifier, isEnabled) {
        this._callbacks.push({
            callback: callback,
            identifier: identifier,
            isEnabled: isEnabled || DefaultEvent.defaultIsEnabled
        });
        return this;
    };
    DefaultEvent.prototype.invoke = function (args) {
        var _this = this;
        _(this._callbacks).forEach(function (c) {
            if (c.isEnabled()) {
                c.callback(args, _this.source);
            }
        });
    };
    DefaultEvent.prototype.unregister = function (identifier) {
        if (identifier) {
            var index = _(this._callbacks).findIndex(function (c) { return c.identifier === identifier; });
            while (index > -1) {
                this._callbacks.splice(index, 1);
                index = _(this._callbacks).findIndex(function (c) { return c.identifier === identifier; });
            }
        }
    };
    DefaultEvent.prototype.dispose = function () {
        this._callbacks.splice(0, this._callbacks.length);
    };
    DefaultEvent.prototype.handler = function () {
        return new DefaultEventHandler(this);
    };
    return DefaultEvent;
}());
exports.DefaultEvent = DefaultEvent;
var DefaultEventHandler = /** @class */ (function () {
    function DefaultEventHandler(source) {
        this.source = source;
    }
    DefaultEventHandler.prototype.register = function (callback, identifier, isEnabled) {
        this.source.register(callback, identifier, isEnabled);
        return this.source;
    };
    DefaultEventHandler.prototype.unregister = function (identifier) {
        this.source.unregister(identifier);
    };
    return DefaultEventHandler;
}());
exports.DefaultEventHandler = DefaultEventHandler;
var SimpleEvent = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleEvent, _super);
    function SimpleEvent(source) {
        return _super.call(this, source) || this;
    }
    SimpleEvent.prototype.invoke = function () {
        _super.prototype.invoke.call(this, null);
    };
    return SimpleEvent;
}(DefaultEvent));
exports.SimpleEvent = SimpleEvent;
//# sourceMappingURL=Events.js.map