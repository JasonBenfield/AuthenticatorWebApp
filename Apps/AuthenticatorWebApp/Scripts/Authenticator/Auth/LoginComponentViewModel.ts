import { BaseComponentViewModel } from "../../Shared/AwaitableComponent";
import { TextInputViewModel } from "../../Shared/TextInput";
import { ComponentTemplate } from "../../Shared/ComponentTemplate";
import { createCommandPillViewModel } from "../../Shared/Templates/CommandPillTemplate";
import * as template from './LoginComponent.html';
import { OffscreenSubmitViewModel } from '../../Shared/OffscreenSubmitViewModel';

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