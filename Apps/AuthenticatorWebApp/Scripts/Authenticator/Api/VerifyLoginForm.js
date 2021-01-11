"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Form_1 = require("XtiShared/Forms/Form");
var VerifyLoginForm = /** @class */ (function (_super) {
    tslib_1.__extends(VerifyLoginForm, _super);
    function VerifyLoginForm(vm) {
        var _this = _super.call(this, 'VerifyLoginForm') || this;
        _this.vm = vm;
        _this.UserName = _this.addTextInputField('UserName', _this.vm.UserName);
        _this.Password = _this.addTextInputField('Password', _this.vm.Password);
        _this.UserName.caption.setCaption('User Name');
        _this.UserName.constraints.mustNotBeNull();
        _this.UserName.constraints.mustNotBeWhitespace('Must not be blank');
        _this.UserName.setMaxLength(100);
        _this.Password.caption.setCaption('Password');
        _this.Password.constraints.mustNotBeNull();
        _this.Password.constraints.mustNotBeWhitespace('Must not be blank');
        _this.Password.setMaxLength(100);
        _this.Password.protect();
        return _this;
    }
    return VerifyLoginForm;
}(Form_1.Form));
exports.VerifyLoginForm = VerifyLoginForm;
//# sourceMappingURL=VerifyLoginForm.js.map