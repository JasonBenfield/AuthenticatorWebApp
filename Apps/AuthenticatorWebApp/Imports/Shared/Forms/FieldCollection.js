"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldCollection = /** @class */ (function () {
    function FieldCollection() {
        this.fields = [];
    }
    FieldCollection.prototype.values = function () { return this.fields; };
    FieldCollection.prototype.getField = function (name) {
        var match = null;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            var testField = field.getField(name);
            if (testField) {
                match = testField;
                break;
            }
        }
        return match;
    };
    FieldCollection.prototype.addField = function (field) {
        this.fields.push(field);
        return field;
    };
    FieldCollection.prototype.clearErrors = function () {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.clearErrors();
        }
    };
    FieldCollection.prototype.validate = function (errors) {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.validate(errors);
        }
    };
    FieldCollection.prototype.import = function (values) {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.import(values);
        }
    };
    FieldCollection.prototype.export = function (values) {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.export(values);
        }
    };
    return FieldCollection;
}());
exports.FieldCollection = FieldCollection;
//# sourceMappingURL=FieldCollection.js.map