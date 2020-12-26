import { TextInputViewModel } from "../../Shared/TextInput";
import { ComponentTemplate } from "../../Shared/ComponentTemplate";
import { createCommandPillViewModel } from "../../Shared/Templates/CommandPillTemplate";
import * as template from './LoginComponent.html';
import { OffscreenSubmitViewModel } from '../../Shared/OffscreenSubmitViewModel';
import * as ko from 'knockout';
import { AlertViewModel } from '../../Shared/Alert';

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