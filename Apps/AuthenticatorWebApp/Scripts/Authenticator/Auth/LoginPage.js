"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/// <reference path="../api/authenticatorentities.d.ts" />
require("reflect-metadata");
var LoginPageViewModel_1 = require("./LoginPageViewModel");
var LoginComponent_1 = require("./LoginComponent");
var xtistart_1 = require("xtistart");
var tsyringe_1 = require("tsyringe");
var AuthenticatorAppApi_1 = require("../Api/AuthenticatorAppApi");
var LoginPage = /** @class */ (function () {
    function LoginPage(vm, authenticator) {
        this.vm = vm;
        this.authenticator = authenticator;
        this.loginComponent = new LoginComponent_1.LoginComponent(this.vm.loginComponent, this.authenticator);
    }
    LoginPage = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [LoginPageViewModel_1.LoginPageViewModel,
            AuthenticatorAppApi_1.AuthenticatorAppApi])
    ], LoginPage);
    return LoginPage;
}());
xtistart_1.startup(LoginPageViewModel_1.LoginPageViewModel, LoginPage);
//# sourceMappingURL=LoginPage.js.map