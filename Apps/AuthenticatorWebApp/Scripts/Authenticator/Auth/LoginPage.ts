/// <reference path="../api/authenticatorentities.d.ts" />
import 'reflect-metadata';
import { LoginPageViewModel } from "./LoginPageViewModel";
import { LoginComponent, LoginResult } from "./LoginComponent";
import { startup } from 'xtistart';
import { singleton } from 'tsyringe';
import { AuthenticatorAppApi } from '../Api/AuthenticatorAppApi';

@singleton()
class LoginPage
{
    constructor(
        private readonly vm: LoginPageViewModel,
        private readonly authenticator: AuthenticatorAppApi
    ) {
        this.activateLoginComponent();
    }

    private readonly loginComponent = new LoginComponent(this.vm.loginComponent, this.authenticator);

    private activateLoginComponent() {
        return this.loginComponent.start();
    }
}
startup(LoginPageViewModel, LoginPage);