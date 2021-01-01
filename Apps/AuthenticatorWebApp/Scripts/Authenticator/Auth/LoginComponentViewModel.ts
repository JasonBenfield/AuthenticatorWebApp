import { TextInputViewModel } from "XtiShared/TextInput";
import { ComponentTemplate } from "XtiShared/ComponentTemplate";
import { createCommandPillViewModel } from "XtiShared/Templates/CommandPillTemplate";
import * as template from './LoginComponent.html';
import { OffscreenSubmitViewModel } from 'XtiShared/OffscreenSubmitViewModel';
import * as ko from 'knockout';
import { AlertViewModel } from 'XtiShared/Alert';

export class LoginComponentViewModel {
    constructor() {
        new ComponentTemplate(this.componentName(), template).register();
    }

    readonly componentName = ko.observable('login-component');
    readonly alert = new AlertViewModel();
    readonly userName = new TextInputViewModel('User Name');
    readonly password = new TextInputViewModel('Password');
    readonly loginCommand = createCommandPillViewModel();
    readonly offscreenSubmit = new OffscreenSubmitViewModel();
}