import { PageLoader } from 'XtiShared/PageLoader';
import { AppApiEvents } from 'XtiShared/AppApiEvents';
import { ConsoleLog } from 'XtiShared/ConsoleLog';
import { ModalErrorComponent } from 'XtiShared/Error/ModalErrorComponent';
import { container } from 'tsyringe';
import { AuthenticatorAppApi } from '../Authenticator/Api/AuthenticatorAppApi';
import { AppApi } from 'XtiShared/AppApi';
import { LogoutUrl } from '../Authenticator/LogoutUrl';

export function startup(pageVM: any, page: any) {
    container.register('PageVM', { useFactory: c => c.resolve(pageVM) });
    container.register('Page', { useFactory: c => c.resolve(page) });
    container.register(
        AppApiEvents,
        {
            useFactory: c => new AppApiEvents((err) => {
                new ConsoleLog().error(err.toString());
                c.resolve(ModalErrorComponent).show(err.getErrors(), err.getCaption());
            })
        }
    );
    container.register(
        AuthenticatorAppApi,
        {
            useFactory: c => new AuthenticatorAppApi(
                c.resolve(AppApiEvents),
                `${location.protocol}//${location.host}`,
                'Current'
            )
        }
    );
    container.register(AppApi, { useFactory: c => c.resolve(AuthenticatorAppApi) });
    container.register(
        'LogoutUrl',
        {
            useToken: LogoutUrl
        }
    );
    new PageLoader().load();
}