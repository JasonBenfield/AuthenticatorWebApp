import * as template from './LoginPage.html';
import { LoginComponentViewModel } from './LoginComponentViewModel';
import { PageViewModel } from 'XtiShared/PageViewModel';
import { singleton } from 'tsyringe';
import { AuthenticatorAppApi } from '../Api/AuthenticatorAppApi';

@singleton()
export class LoginPageViewModel extends PageViewModel {
    constructor(private readonly authenticatorApi: AuthenticatorAppApi) {
        super(template);
    }

    readonly loginComponent = new LoginComponentViewModel(this.authenticatorApi);
}