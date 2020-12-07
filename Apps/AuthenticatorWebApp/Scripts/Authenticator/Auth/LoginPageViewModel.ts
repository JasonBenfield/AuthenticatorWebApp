import * as template from './LoginPage.html';
import { LoginComponentViewModel } from './LoginComponentViewModel';
import { PageViewModel } from '../../Shared/PageViewModel';
import { singleton } from 'tsyringe';

@singleton()
export class LoginPageViewModel extends PageViewModel {
    constructor() {
        super(template);
    }

    readonly loginComponent = new LoginComponentViewModel();
}