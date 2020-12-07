import { injectable } from 'tsyringe';
import { AuthenticatorAppApi } from './Api/AuthenticatorAppApi';

@injectable()
export class LogoutUrl implements ILogoutUrl {
    constructor(
        private readonly authenticator: AuthenticatorAppApi
    ) {
    }

    value() {
        return this.authenticator.Auth.Logout.getUrl({}).getUrl();
    }
}