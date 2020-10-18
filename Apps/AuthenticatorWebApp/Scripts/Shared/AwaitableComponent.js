"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = exports.AwaitableComponent = exports.ComponentDeactivatedResult = exports.BaseComponentViewModel = exports.AwaitableComponentViewModel = void 0;
var Alert_1 = require("./Alert");
var Events_1 = require("./Events");
var ko = require("knockout");
var AwaitableComponentViewModel = /** @class */ (function () {
    function AwaitableComponentViewModel() {
        var _this = this;
        this.alert = new Alert_1.AlertViewModel();
        this.title = ko.observable('');
        this.isActive = ko.observable(false);
        this.isInactive = ko.pureComputed(function () { return !_this.isActive(); });
        this.template = ko.observable('');
    }
    return AwaitableComponentViewModel;
}());
exports.AwaitableComponentViewModel = AwaitableComponentViewModel;
var BaseComponentViewModel = /** @class */ (function () {
    function BaseComponentViewModel() {
        this.component = new AwaitableComponentViewModel();
        this.alert = this.component.alert;
        this.title = this.component.title;
        this.isActive = this.component.isActive;
        this.isInactive = this.component.isInactive;
        this.template = this.component.template;
    }
    return BaseComponentViewModel;
}());
exports.BaseComponentViewModel = BaseComponentViewModel;
var ComponentDeactivatedResult = /** @class */ (function () {
    function ComponentDeactivatedResult() {
        this.name = 'ComponentDeactivatedResult';
    }
    return ComponentDeactivatedResult;
}());
exports.ComponentDeactivatedResult = ComponentDeactivatedResult;
var AwaitableComponent = /** @class */ (function () {
    function AwaitableComponent(vm) {
        this.vm = vm;
        this.alert = new Alert_1.Alert(this.vm.alert);
        this._resizeRequired = new Events_1.SimpleEvent(this);
        this.resizeRequired = new Events_1.DefaultEventHandler(this._resizeRequired);
        this._isActive = false;
        this._resolve = null;
        this._activated = new Events_1.SimpleEvent(this);
        this.activated = new Events_1.DefaultEventHandler(this._activated);
        this._deactivated = new Events_1.SimpleEvent(this);
        this.deactivated = new Events_1.DefaultEventHandler(this._deactivated);
    }
    AwaitableComponent.prototype.setTitle = function (title) {
        this.vm.title(title);
    };
    Object.defineProperty(AwaitableComponent.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        enumerable: false,
        configurable: true
    });
    AwaitableComponent.prototype.isInProgress = function () {
        return this._resolve !== null;
    };
    AwaitableComponent.prototype.resolveComponent = function (result) {
        var resolve = this._resolve;
        this._resolve = null;
        if (resolve) {
            resolve(result);
        }
    };
    AwaitableComponent.prototype.activate = function () {
        var _this = this;
        if (!this._isActive) {
            this.setIsActivated(true);
            this._activated.invoke();
        }
        return new Promise(function (resolve) {
            _this._resolve = resolve;
        });
    };
    AwaitableComponent.prototype.deactivate = function () {
        var isActive = this._isActive;
        if (isActive) {
            this.setIsActivated(false);
            this._deactivated.invoke();
        }
    };
    AwaitableComponent.prototype.setIsActivated = function (isActivated) {
        this._isActive = isActivated;
        this.vm.isActive(this._isActive);
    };
    AwaitableComponent.prototype.afterRender = function () {
        this._resizeRequired.invoke();
    };
    AwaitableComponent.prototype.disposeComponent = function () {
        this._resizeRequired.dispose();
        this.deactivate();
        this._activated.dispose();
        this._deactivated.dispose();
        if (this.isInProgress()) {
            this.resolveComponent(new ComponentDeactivatedResult());
        }
    };
    return AwaitableComponent;
}());
exports.AwaitableComponent = AwaitableComponent;
var BaseComponent = /** @class */ (function () {
    function BaseComponent(componentVM) {
        this.componentVM = componentVM;
        this.component = new AwaitableComponent(this.componentVM);
        this.isActive = this.component.isActive;
        this.alert = this.component.alert;
        this.resizeRequired = this.component.resizeRequired;
        this.activated = this.component.activated;
        this.deactivated = this.component.deactivated;
    }
    BaseComponent.prototype.activate = function () {
        return this.component.activate();
    };
    BaseComponent.prototype.deactivate = function () {
        this.component.deactivate();
    };
    BaseComponent.prototype.setTitle = function (title) {
        this.componentVM.title(title);
    };
    BaseComponent.prototype.resolveComponent = function (result) {
        this.component.resolveComponent(result);
    };
    BaseComponent.prototype.disposeComponent = function () {
        this.component.disposeComponent();
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=AwaitableComponent.js.map