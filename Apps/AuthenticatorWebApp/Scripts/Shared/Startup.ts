import { PageLoader } from './PageLoader';
import { AppApiEvents } from './AppApiEvents';
import { ConsoleLog } from './ConsoleLog';
import { ModalErrorComponent } from './Error/ModalErrorComponent';
import { container } from 'tsyringe';
import { HubAppApi } from './Api/HubAppApi';
import { AppApi } from './AppApi';

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
        HubAppApi,
        {
            useFactory: c => new HubAppApi(
                c.resolve(AppApiEvents),
                `${location.protocol}//${location.host}`,
                'Current'
            )
        }
    )
    container.register(AppApi, { useFactory: c => c.resolve(HubAppApi) });
    new PageLoader().load();
}