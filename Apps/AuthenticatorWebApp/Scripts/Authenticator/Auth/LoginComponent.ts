import { BaseComponent } from "../../Shared/AwaitableComponent";
import { TextInput, PasswordInput } from "../../Shared/TextInput";
import { AsyncCommand } from "../../Shared/Command";
import { ColumnCss } from "../../Shared/ColumnCss";
import { LoginComponentViewModel } from './LoginComponentViewModel';
import { UrlBuilder } from '../../Shared/UrlBuilder';
import { container } from 'tsyringe';
import { AuthenticatorAppApi } from '../Api/AuthenticatorAppApi';

export class LoginResult {
    constructor(public readonly token: string) {
    }
}

export class LoginComponent extends BaseComponent<LoginResult> {
    constructor(
        private readonly vm: LoginComponentViewModel
    ) {
        super(vm.component);
        this.userName.setColumns(new ColumnCss(3), new ColumnCss(0));
        this.password.setColumns(new ColumnCss(3), new ColumnCss(0));
        this.loginCommand.setText('Login');
    }

    private readonly userName = new TextInput(this.vm.userName);
    private readonly password = new PasswordInput(this.vm.password);
    private readonly loginCommand = new AsyncCommand(this.vm.loginCommand, this.login.bind(this));

    private async login() {
        this.alert.info('Verifying login...');
        try {
            let cred: ILoginCredentials = {
                UserName: this.userName.getValue(),
                Password: this.password.getValue()
            };
            let authenticator = container.resolve(AuthenticatorAppApi);
            await authenticator.Auth.Verify(cred);
            this.alert.info('Opening page...');
            var form = <HTMLFormElement>document.createElement('form');
            form.action = authenticator.Auth.Login.getUrl(null).getUrl();
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
        finally {
            this.alert.clear();
        }
    }

    private createInput(name: string, value: string, type: string = 'hidden') {
        let input = <HTMLInputElement>document.createElement('input');
        input.type = type;
        input.name = name;
        input.value = value;
        return input;
    }
}