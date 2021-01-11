import { AppApiGroup } from "./AppApiGroup";
import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
export declare class AppApi {
    private readonly events;
    constructor(events: AppApiEvents, baseUrl: string, app: string, version: string);
    private readonly resourceUrl;
    readonly name: string;
    readonly url: import("./UrlBuilder").UrlBuilder;
    readonly groups: {
        [name: string]: AppApiGroup;
    };
    readonly User: IUserGroup;
    protected addGroup<T extends AppApiGroup>(createGroup: (evts: AppApiEvents, resourceUrl: AppResourceUrl) => T): T;
    toString(): string;
}
