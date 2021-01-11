import { AppResourceUrl } from "./AppResourceUrl";
import { UrlBuilder } from "./UrlBuilder";
export declare class AppApiView<TArgs> {
    constructor(resourceUrl: AppResourceUrl, actionName: string);
    private readonly url;
    getUrl(data: TArgs): UrlBuilder;
    open(data: TArgs): void;
    openWindow(data: TArgs): void;
    private createWebPage;
}
