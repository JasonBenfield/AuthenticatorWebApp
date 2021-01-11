"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ko = require("knockout");
var Events_1 = require("../Events");
var RowFieldValueTemplate_1 = require("./RowFieldValueTemplate");
var FieldValueViewModel = /** @class */ (function () {
    function FieldValueViewModel() {
        this.componentName = ko.observable('');
        this.inputComponentName = ko.observable('');
        this.name = ko.observable('');
        this.css = ko.observable('');
        this.value = ko.observable(null);
        this.isEnabled = ko.observable(true);
        this.isVisible = ko.observable(true);
        this.errors = ko.observableArray([]);
        this.hasError = ko.observable(false);
        this._changed = new Events_1.DefaultEvent(this);
        this.changed = new Events_1.DefaultEventHandler(this._changed);
        var template = new RowFieldValueTemplate_1.RowFieldValueTemplate();
        this.componentName(template.componentName);
        template.register();
    }
    FieldValueViewModel.prototype.change = function (value) {
        this._changed.invoke(value);
    };
    return FieldValueViewModel;
}());
exports.FieldValueViewModel = FieldValueViewModel;
var ComplexFieldValueViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(ComplexFieldValueViewModel, _super);
    function ComplexFieldValueViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.values = [];
        return _this;
    }
    ComplexFieldValueViewModel.prototype.addValue = function (field) {
        this.values.push(field.value);
        field.value.changed.register(this.change.bind(this));
        return field;
    };
    return ComplexFieldValueViewModel;
}(FieldValueViewModel));
exports.ComplexFieldValueViewModel = ComplexFieldValueViewModel;
//# sourceMappingURL=FieldValueViewModel.js.map