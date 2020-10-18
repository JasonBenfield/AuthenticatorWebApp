import { AppApiAction } from "./AppApiAction";
import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { AppApiView } from "./AppApiView";

export class AppApiGroup {
    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        public readonly name: string
    ) {
        this.resourceUrl = resourceUrl.withGroup(name);
    }

    private readonly resourceUrl: AppResourceUrl;

    protected createView<TModel>(name: string) {
        return new AppApiView<TModel>(this.resourceUrl, name);
    }

    protected createAction<TModel, TResult>(name: string, friendlyName: string) {
        return new AppApiAction<TModel, TResult>(this.events, this.resourceUrl, name, friendlyName);
    }

    toString() {
        return `AppApiGroup ${this.resourceUrl}`;
    }
}