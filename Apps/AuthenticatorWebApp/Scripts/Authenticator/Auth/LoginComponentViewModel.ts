import { BaseComponentViewModel } from "../AwaitableComponent";
import { TextInputViewModel } from "../TextInput";
import { ComponentTemplate } from "../ComponentTemplate";
import { createCommandPillViewModel } from "../Templates/CommandPillTemplate";
import * as template from './LoginComponent.html';
import { OffscreenSubmitViewModel } from '../OffscreenSubmitViewModel';

export class LoginComponentViewModel extends BaseComponentViewModel {
    constructor() {
        super();
        this.template('login-component');
        new ComponentTemplate(this.template(), template).register();
    }

    readonly userName = new TextInputViewModel('User Name');
    readonly password = new TextInputViewModel('Password');
    readonly loginCommand = createCommandPillViewModel();
    readonly offscreenSubmit = new OffscreenSubmitViewModel();
}