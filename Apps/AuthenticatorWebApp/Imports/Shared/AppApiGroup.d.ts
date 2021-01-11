import { AppApiAction } from "./AppApiAction";
import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { AppApiView } from "./AppApiView";
export declare class AppApiGroup {
    private readonly events;
    readonly name: string;
    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl, name: string);
    private readonly resourceUrl;
    protected createView<TModel>(name: string): AppApiView<TModel>;
    protected createAction<TModel, TResult>(name: string, friendlyName: string): AppApiAction<TModel, TResult>;
    toString(): string;
}
