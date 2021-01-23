/// <reference path="../api/authenticatorentities.d.ts" />
import 'reflect-metadata';
import { LoginPageViewModel } from "./LoginPageViewModel";
import { LoginComponent } from "./LoginComponent";
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
    }

    private readonly loginComponent = new LoginComponent(this.vm.loginComponent, this.authenticator);
}
startup(LoginPageViewModel, LoginPage);