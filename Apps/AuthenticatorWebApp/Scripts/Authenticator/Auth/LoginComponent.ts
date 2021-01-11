import { Awaitable } from "XtiShared/Awaitable";
import { AsyncCommand } from "XtiShared/Command";
import { ColumnCss } from "XtiShared/ColumnCss";
import { LoginComponentViewModel } from './LoginComponentViewModel';
import { UrlBuilder } from 'XtiShared/UrlBuilder';
import { AuthenticatorAppApi } from '../Api/AuthenticatorAppApi';
import { Alert } from "XtiShared/Alert";
import { VerifyLoginForm } from "../Api/VerifyLoginForm";
import * as _ from 'lodash';
import { FaIconPrefix } from "XtiShared/FaIcon";

export class LoginResult {
    constructor(public readonly token: string) {
    }
}

export class LoginComponent {
    constructor(
        private readonly vm: LoginComponentViewModel,
        private readonly authApi: AuthenticatorAppApi
    ) {
        this.verifyLoginForm.UserName.setColumns(new ColumnCss(3), new ColumnCss());
        this.verifyLoginForm.Password.setColumns(new ColumnCss(3), new ColumnCss());
        _.delay(() => {
            this.verifyLoginForm.UserName.setFocus();
        }, 100);
        this.loginCommand.makePrimary();
        this.loginCommand.setText('Login');
        let loginIcon = this.loginCommand.icon();
        loginIcon.setPrefix(FaIconPrefix.solid);
        loginIcon.setName('fa-sign-in-alt');
    }

    private readonly awaitable = new Awaitable<LoginResult>();
    private readonly alert = new Alert(this.vm.alert);
    private readonly verifyLoginForm = new VerifyLoginForm(this.vm.verifyLoginForm);
    private readonly loginCommand = new AsyncCommand(this.vm.loginCommand, this.login.bind(this));

    start() {
        return this.awaitable.start();
    }

    private async login() {
        this.alert.info('Verifying login...');
        try {
            let result = await this.verifyLoginForm.save(this.authApi.Auth.VerifyLoginAction);
            if (result.succeeded()) {
                let cred = this.getCredentials();
                this.alert.info('Opening page...');
                this.postLogin(cred);
            }
        }
        finally {
            this.alert.clear();
        }
    }

    private getCredentials() {
        return <ILoginCredentials>{
            UserName: this.verifyLoginForm.UserName.getValue(),
            Password: this.verifyLoginForm.Password.getValue()
        };
    }

    private postLogin(cred: ILoginCredentials) {
        let form = <HTMLFormElement>document.createElement('form');
        form.action = this.authApi.Auth.Login.getUrl(null).getUrl();
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