import { AppApiGroup } from './AppApiGroup';
import { AppApiView } from './AppApiView';
import { AppApiEvents } from './AppApiEvents';
import { AppResourceUrl } from './AppResourceUrl';
export declare class UserGroup extends AppApiGroup {
    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl);
    readonly Index: AppApiView<IEmptyRequest>;
}
