"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = exports.LoginResult = void 0;
var tslib_1 = require("tslib");
var Awaitable_1 = require("../../Shared/Awaitable");
var TextInput_1 = require("../../Shared/TextInput");
var Command_1 = require("../../Shared/Command");
var ColumnCss_1 = require("../../Shared/ColumnCss");
var UrlBuilder_1 = require("../../Shared/UrlBuilder");
var tsyringe_1 = require("tsyringe");
var AuthenticatorAppApi_1 = require("../Api/AuthenticatorAppApi");
var Alert_1 = require("../../Shared/Alert");
var LoginResult = /** @class */ (function () {
    function LoginResult(token) {
        this.token = token;
    }
    return LoginResult;
}());
exports.LoginResult = LoginResult;
var LoginComponent = /** @class */ (function () {
    function LoginComponent(vm, authenticator) {
        this.vm = vm;
        this.authenticator = authenticator;
        this.awaitable = new Awaitable_1.Awaitable();
        this.alert = new Alert_1.Alert(this.vm.alert);
        this.userName = new TextInput_1.TextInput(this.vm.userName);
        this.password = new TextInput_1.PasswordInput(this.vm.password);
        this.loginCommand = new Command_1.AsyncCommand(this.vm.loginCommand, this.login.bind(this));
        this.userName.setColumns(new ColumnCss_1.ColumnCss(3), new ColumnCss_1.ColumnCss(0));
        this.password.setColumns(new ColumnCss_1.ColumnCss(3), new ColumnCss_1.ColumnCss(0));
        this.loginCommand.setText('Login');
    }
    LoginComponent.prototype.start = function () {
        return this.awaitable.start();
    };
    LoginComponent.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cred;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.alert.info('Verifying login...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        cred = this.getCredentials();
                        return [4 /*yield*/, this.verifyLogin(cred)];
                    case 2:
                        _a.sent();
                        this.alert.info('Opening page...');
                        this.postLogin(cred);
                        return [3 /*break*/, 4];
                    case 3:
                        this.alert.clear();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.getCredentials = function () {
        return {
            UserName: this.userName.getValue(),
            Password: this.password.getValue()
        };
    };
    LoginComponent.prototype.verifyLogin = function (cred) {
        var authenticator = tsyringe_1.container.resolve(AuthenticatorAppApi_1.AuthenticatorAppApi);
        return authenticator.Auth.Verify(cred);
    };
    LoginComponent.prototype.postLogin = function (cred) {
        var form = document.createElement('form');
        form.action = this.authenticator.Auth.Login.getUrl(null).getUrl();
        form.style.position = 'absolute';
        form.style.top = '-100px';
        form.style.left = '-100px';
        form.method = 'POST';
        var userNameInput = this.createInput('Credentials.UserName', cred.UserName, 'text');
        var passwordInput = this.createInput('Credentials.Password', cred.Password, 'password');
        var urlBuilder = UrlBuilder_1.UrlBuilder.current();
        var startUrlInput = this.createInput('StartUrl', urlBuilder.getQueryValue('startUrl'));
        var returnUrlInput = this.createInput('ReturnUrl', urlBuilder.getQueryValue('returnUrl'));
        form.append(userNameInput, passwordInput, startUrlInput, returnUrlInput);
        document.body.append(form);
        form.submit();
    };
    LoginComponent.prototype.createInput = function (name, value, type) {
        if (type === void 0) { type = 'hidden'; }
        var input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.value = value;
        return input;
    };
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map