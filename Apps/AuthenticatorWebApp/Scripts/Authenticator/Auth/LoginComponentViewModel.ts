import { ComponentTemplate } from "XtiShared/ComponentTemplate";
import { ComponentTemplateAsync } from 'XtiShared/ComponentTemplateAsync';
import { createCommandOutlineButtonViewModel } from "XtiShared/Templates/CommandOutlineButtonTemplate";
import * as template from './LoginComponent.html';
import { OffscreenSubmitViewModel } from 'XtiShared/OffscreenSubmitViewModel';
import * as ko from 'knockout';
import { AlertViewModel } from 'XtiShared/Alert';
import { VerifyLoginFormViewModel } from "../Api/VerifyLoginFormViewModel";
import { AuthenticatorAppApi } from "../Api/AuthenticatorAppApi";

export class LoginComponentViewModel {
    constructor(authApi: AuthenticatorAppApi) {
        new ComponentTemplate(this.componentName(), template).register();
        new ComponentTemplateAsync(this.verifyLoginForm.componentName(), authApi.Auth.VerifyLoginForm.getUrl({}).getUrl()).register();
    }

    readonly componentName = ko.observable('login-component');
    readonly alert = new AlertViewModel();
    readonly verifyLoginForm = new VerifyLoginFormViewModel();
    readonly loginCommand = createCommandOutlineButtonViewModel();
    readonly offscreenSubmit = new OffscreenSubmitViewModel();
}