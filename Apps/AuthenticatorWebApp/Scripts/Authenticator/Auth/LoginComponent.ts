import { Awaitable } from "../../Shared/Awaitable";
import { TextInput, PasswordInput } from "../../Shared/TextInput";
import { AsyncCommand } from "../../Shared/Command";
import { ColumnCss } from "../../Shared/ColumnCss";
import { LoginComponentViewModel } from './LoginComponentViewModel';
import { UrlBuilder } from '../../Shared/UrlBuilder';
import { container } from 'tsyringe';
import { AuthenticatorAppApi } from '../Api/AuthenticatorAppApi';
import { Alert } from "../../Shared/Alert";

export class LoginResult {
    constructor(public readonly token: string) {
    }
}

export class LoginComponent {
    constructor(
        private readonly vm: LoginComponentViewModel,
        private readonly authenticator: AuthenticatorAppApi
    ) {
        this.userName.setColumns(new ColumnCss(3), new ColumnCss(0));
        this.password.setColumns(new ColumnCss(3), new ColumnCss(0));
        this.loginCommand.setText('Login');
    }

    private readonly awaitable = new Awaitable<LoginResult>();
    private readonly alert = new Alert(this.vm.alert);
    private readonly userName = new TextInput(this.vm.userName);
    private readonly password = new PasswordInput(this.vm.password);
    private readonly loginCommand = new AsyncCommand(this.vm.loginCommand, this.login.bind(this));

    start() {
        return this.awaitable.start();
    }

    private async login() {
        this.alert.info('Verifying login...');
        try {
            let cred = this.getCredentials();
            await this.verifyLogin(cred);
            this.alert.info('Opening page...');
            this.postLogin(cred);
        }
        finally {
            this.alert.clear();
        }
    }

    private getCredentials() {
        return <ILoginCredentials>{
            UserName: this.userName.getValue(),
            Password: this.password.getValue()
        };
    }

    private verifyLogin(cred: ILoginCredentials) {
        let authenticator = container.resolve(AuthenticatorAppApi);
        return authenticator.Auth.Verify(cred);
    }

    private postLogin(cred: ILoginCredentials) {
        let form = <HTMLFormElement>document.createElement('form');
        form.action = this.authenticator.Auth.Login.getUrl(null).getUrl();
        form.style.position = 'absolute';
        form.style.top = '-100px';
        form.style.left = '-100px';
        form.method = 'POST';
        let userNameInput = this.createInput('Credentials.UserName', cred.UserName, 'text');
        let passwordInput = this.createInput('Credentials.Password', cred.Password, 'password');
        let urlBuilder = UrlBuilder.current();
        let startUrlInput = this.createInput('StartUrl', urlBuilder.getQueryValue('startUrl'));
        let returnUrlInput = this.createInput('ReturnUrl', urlBuilder.getQueryValue('returnUrl'));
        form.append(
            userNameInput,
            passwordInput,
            startUrlInput,
            returnUrlInput
        );
        document.body.append(form);
        form.submit();
    }

    private createInput(name: string, value: string, type: string = 'hidden') {
        let input = <HTMLInputElement>document.createElement('input');
        input.type = type;
        input.name = name;
        input.value = value;
        return input;
    }
}