"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tsyringe_1 = require("tsyringe");
var AppApiError_1 = require("../AppApiError");
var ConsoleLog_1 = require("../ConsoleLog");
var ModalErrorComponent_1 = require("../Error/ModalErrorComponent");
var ErrorModel_1 = require("../ErrorModel");
var DateInputField_1 = require("./DateInputField");
var DropDownField_1 = require("./DropDownField");
var ErrorList_1 = require("./ErrorList");
var FieldCollection_1 = require("./FieldCollection");
var FormSaveResult_1 = require("./FormSaveResult");
var NumberInputField_1 = require("./NumberInputField");
var TextInputField_1 = require("./TextInputField");
var Form = /** @class */ (function () {
    function Form(name) {
        this.name = name;
        this.fields = new FieldCollection_1.FieldCollection();
        this.modalError = tsyringe_1.container.resolve(ModalErrorComponent_1.ModalErrorComponent);
        this.modalError.errorSelected.register(this.onErrorSelected.bind(this));
    }
    Form.prototype.onErrorSelected = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var field;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalError.okCommand.execute()];
                    case 1:
                        _a.sent();
                        field = this.getField(error.Source);
                        if (field) {
                            if (field.setFocus) {
                                field.setFocus();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Form.prototype.getName = function () { return this.name; };
    Form.prototype.getField = function (name) {
        if (name) {
            if (this.getName() === name) {
                return this;
            }
            return this.fields.getField(name);
        }
        return null;
    };
    Form.prototype.addHiddenTextField = function (name, vm) {
        return this.addField(TextInputField_1.TextInputField.hidden(this.name, name, vm));
    };
    Form.prototype.addHiddenNumberField = function (name, vm) {
        return this.addField(NumberInputField_1.NumberInputField.hidden(this.name, name, vm));
    };
    Form.prototype.addHiddenDateField = function (name, vm) {
        return this.addField(DateInputField_1.DateInputField.hidden(this.name, name, vm));
    };
    Form.prototype.addTextInputField = function (name, vm) {
        return this.addField(new TextInputField_1.TextInputField(this.name, name, vm));
    };
    Form.prototype.addNumberInputField = function (name, vm) {
        return this.addField(new NumberInputField_1.NumberInputField(this.name, name, vm));
    };
    Form.prototype.addDateInputField = function (name, vm) {
        return this.addField(new DateInputField_1.DateInputField(this.name, name, vm));
    };
    Form.prototype.addDropDownField = function (name, vm) {
        return this.addField(new DropDownField_1.DropDownField(this.name, name, vm));
    };
    Form.prototype.addField = function (field) {
        return this.fields.addField(field);
    };
    Form.prototype.save = function (action) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var validationResult, errors_1, result, errors, model, ex_1, caption, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationResult = this.validate();
                        if (validationResult.hasErrors()) {
                            errors_1 = validationResult.values();
                            tsyringe_1.container.resolve(ModalErrorComponent_1.ModalErrorComponent).show(errors_1, "Unable to " + action.friendlyName);
                            return [2 /*return*/, new FormSaveResult_1.FormSaveResult(null, errors_1)];
                        }
                        errors = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        model = this.export();
                        return [4 /*yield*/, action.execute(model, { preventDefault: true })];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        caption = '';
                        if (ex_1 instanceof AppApiError_1.AppApiError) {
                            errors.push.apply(errors, ex_1.getErrors());
                            caption = ex_1.getCaption();
                        }
                        else {
                            error = new ErrorModel_1.ErrorModel(ex_1.message, '', '');
                            errors.push(error);
                            new ConsoleLog_1.ConsoleLog().error(ex_1.message);
                        }
                        this.modalError.show(errors, caption);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, new FormSaveResult_1.FormSaveResult(result, errors)];
                }
            });
        });
    };
    Form.prototype.validate = function () {
        var errors = new ErrorList_1.ErrorList();
        this.fields.validate(errors);
        return errors;
    };
    Form.prototype.import = function (values) {
        this.fields.import(values);
    };
    Form.prototype.export = function () {
        var values = {};
        this.fields.export(values);
        return values;
    };
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=Form.js.map