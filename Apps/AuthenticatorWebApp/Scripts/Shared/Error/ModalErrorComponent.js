"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorComponent = void 0;
var tslib_1 = require("tslib");
var ModalErrorComponentViewModel_1 = require("./ModalErrorComponentViewModel");
var Command_1 = require("../Command");
var ModalErrorViewModel_1 = require("./ModalErrorViewModel");
var tsyringe_1 = require("tsyringe");
var ModalErrorComponent = /** @class */ (function () {
    function ModalErrorComponent(vm) {
        this.vm = vm;
        this.okCommand = new Command_1.Command(this.vm.okCommand, this.ok.bind(this));
        this.okCommand.setText('OK');
        this.okCommand.makeDanger();
        this.vm.modalOptions.closed.register(this.onClosed.bind(this));
    }
    ModalErrorComponent.prototype.onClosed = function () {
        this.vm.errors([]);
    };
    ModalErrorComponent.prototype.show = function (errors, caption) {
        if (caption === void 0) { caption = ''; }
        this.vm.errors.splice(0, 0, new ModalErrorViewModel_1.ModalErrorViewModel(errors, caption));
        if (this.vm.errors().length === 1) {
            this.vm.title('An error occurred');
        }
        else {
            this.vm.title('Errors occurred');
        }
        this.vm.modalOptions.command('show');
    };
    ModalErrorComponent.prototype.ok = function () {
        this.vm.errors([]);
        this.vm.modalOptions.command('hide');
    };
    ModalErrorComponent = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [ModalErrorComponentViewModel_1.ModalErrorComponentViewModel])
    ], ModalErrorComponent);
    return ModalErrorComponent;
}());
exports.ModalErrorComponent = ModalErrorComponent;
//export let modalError: ModalErrorComponent; 
//export function setModalError(_modalError: ModalErrorComponent) {
//    modalError = _modalError;
//}
//# sourceMappingURL=ModalErrorComponent.js.map