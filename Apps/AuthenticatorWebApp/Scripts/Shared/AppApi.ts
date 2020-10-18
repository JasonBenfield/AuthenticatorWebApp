import { AppApiGroup } from "./AppApiGroup";
import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { XtiUrl } from './XtiUrl';

export class AppApi {
    constructor(
        private readonly events: AppApiEvents,
        baseUrl: string,
        app: string,
        version: string
    ) {
        this.resourceUrl = AppResourceUrl.app(baseUrl, app, version, XtiUrl.current.path.modifier, pageContext.CacheBust);
    }

    private readonly resourceUrl: AppResourceUrl;

    get name() { return this.resourceUrl.path.app; }

    get url() { return this.resourceUrl.relativeUrl; }

    readonly groups: {
        [name: string]: AppApiGroup
    } = {};

    readonly User: IUserGroup;

    protected addGroup<T extends AppApiGroup>(
        createGroup: (evts: AppApiEvents, resourceUrl: AppResourceUrl) => T
    ) {
        let group = createGroup(this.events, this.resourceUrl);
        this.groups[group.name] = group;
        return group;
    }

    toString() {
        return `AppApi ${this.resourceUrl}`;
    }
}