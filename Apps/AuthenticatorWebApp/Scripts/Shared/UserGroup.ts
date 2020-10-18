import { AppApiGroup } from './AppApiGroup';
import { AppApiView } from './AppApiView';
import { AppApiEvents } from './AppApiEvents';
import { AppResourceUrl } from './AppResourceUrl';

export class UserGroup extends AppApiGroup {
    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
        super(events, resourceUrl, 'User');
        this.Index = this.createView<IEmptyRequest>('Index');
    }

    readonly Index: AppApiView<IEmptyRequest>;
}