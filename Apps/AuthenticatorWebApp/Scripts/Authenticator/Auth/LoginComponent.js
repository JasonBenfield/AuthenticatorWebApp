"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Command_1 = require("XtiShared/Command");
var ColumnCss_1 = require("XtiShared/ColumnCss");
var UrlBuilder_1 = require("XtiShared/UrlBuilder");
var Alert_1 = require("XtiShared/Alert");
var VerifyLoginForm_1 = require("../Api/VerifyLoginForm");
var _ = require("lodash");
var FaIcon_1 = require("XtiShared/FaIcon");
var LoginResult = /** @class */ (function () {
    function LoginResult(token) {
        this.token = token;
    }
    return LoginResult;
}());
exports.LoginResult = LoginResult;
var LoginComponent = /** @class */ (function () {
    function LoginComponent(vm, authApi) {
        var _this = this;
        this.vm = vm;
        this.authApi = authApi;
        this.alert = new Alert_1.Alert(this.vm.alert);
        this.verifyLoginForm = new VerifyLoginForm_1.VerifyLoginForm(this.vm.verifyLoginForm);
        this.loginCommand = new Command_1.AsyncCommand(this.vm.loginCommand, this.login.bind(this));
        this.verifyLoginForm.UserName.setColumns(new ColumnCss_1.ColumnCss(3), new ColumnCss_1.ColumnCss());
        this.verifyLoginForm.Password.setColumns(new ColumnCss_1.ColumnCss(3), new ColumnCss_1.ColumnCss());
        _.delay(function () {
            _this.verifyLoginForm.UserName.setFocus();
        }, 100);
        this.loginCommand.makePrimary();
        this.loginCommand.setText('Login');
        var loginIcon = this.loginCommand.icon();
        loginIcon.setPrefix(FaIcon_1.FaIconPrefix.solid);
        loginIcon.setName('fa-sign-in-alt');
    }
    LoginComponent.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, cred;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.alert.info('Verifying login...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this.verifyLoginForm.save(this.authApi.Auth.VerifyLoginAction)];
                    case 2:
                        result = _a.sent();
                        if (result.succeeded()) {
                            cred = this.getCredentials();
                            this.alert.info('Opening page...');
                            this.postLogin(cred);
                        }
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
            UserName: this.verifyLoginForm.UserName.getValue(),
            Password: this.verifyLoginForm.Password.getValue()
        };
    };
    LoginComponent.prototype.postLogin = function (cred) {
        var form = document.createElement('form');
        form.action = this.authApi.Auth.Login.getUrl(null).getUrl();
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
    LoginComponent.ResultKeys = {
        loginComplete: 'login-complete'
    };
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map