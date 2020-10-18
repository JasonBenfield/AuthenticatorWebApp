"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var MainPageViewModel_1 = require("./MainPageViewModel");
var TelephoneNumber_1 = require("../TelephoneNumber");
var xtistart_1 = require("xtistart");
var tsyringe_1 = require("tsyringe");
var MainPage = /** @class */ (function () {
    function MainPage(viewModel) {
        this.viewModel = viewModel;
        this.viewModel.telephoneNumber(new TelephoneNumber_1.TelephoneNumber(864, 555, 1234).toString());
    }
    MainPage = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [MainPageViewModel_1.MainPageViewModel])
    ], MainPage);
    return MainPage;
}());
xtistart_1.startup(MainPageViewModel_1.MainPageViewModel, MainPage);
//# sourceMappingURL=MainPage.js.map