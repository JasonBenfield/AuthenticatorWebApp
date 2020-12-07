"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/// <reference path="../api/authenticatorentities.d.ts" />
require("reflect-metadata");
var MainPageViewModel_1 = require("./MainPageViewModel");
var xtistart_1 = require("xtistart");
var tsyringe_1 = require("tsyringe");
var MainPage = /** @class */ (function () {
    function MainPage(vm) {
        this.vm = vm;
    }
    MainPage = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [MainPageViewModel_1.MainPageViewModel])
    ], MainPage);
    return MainPage;
}());
xtistart_1.startup(MainPageViewModel_1.MainPageViewModel, MainPage);
//# sourceMappingURL=MainPage.js.map