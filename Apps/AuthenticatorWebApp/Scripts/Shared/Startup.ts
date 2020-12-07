import { PageLoader } from './PageLoader';
import { AppApiEvents } from './AppApiEvents';
import { ConsoleLog } from './ConsoleLog';
import { ModalErrorComponent } from './Error/ModalErrorComponent';
import { container } from 'tsyringe';

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
    new PageLoader().load();
}