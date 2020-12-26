"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorComponentViewModel = void 0;
var tslib_1 = require("tslib");
var ko = require("knockout");
var template = require("./ModalErrorComponent.html");
var ComponentTemplate_1 = require("../ComponentTemplate");
var ModalOptionsViewModel_1 = require("../ModalOptionsViewModel");
var CommandButtonTemplate_1 = require("../Templates/CommandButtonTemplate");
var tsyringe_1 = require("tsyringe");
var ModalErrorComponentViewModel = /** @class */ (function () {
    function ModalErrorComponentViewModel() {
        this.componentName = ko.observable('modal-error-component');
        this.title = ko.observable('');
        this.isVisible = ko.observable(false);
        this.modalOptions = new ModalOptionsViewModel_1.ModalOptionsViewModel();
        this.errors = ko.observableArray([]);
        this.okCommand = CommandButtonTemplate_1.createCommandButtonViewModel();
        new ComponentTemplate_1.ComponentTemplate(this.componentName(), template).register();
    }
    ModalErrorComponentViewModel = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ModalErrorComponentViewModel);
    return ModalErrorComponentViewModel;
}());
exports.ModalErrorComponentViewModel = ModalErrorComponentViewModel;
//# sourceMappingURL=ModalErrorComponentViewModel.js.map