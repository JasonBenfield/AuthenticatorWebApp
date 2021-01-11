import { XtiPath } from "./XtiPath";
import { UrlBuilder } from "./UrlBuilder";
export declare class AppResourceUrl {
    private readonly baseUrl;
    readonly path: XtiPath;
    private readonly cacheBust;
    static app(baseUrl: string, appKey: string, version: string, modifier: string, cacheBust: string): AppResourceUrl;
    private constructor();
    readonly url: UrlBuilder;
    readonly relativeUrl: UrlBuilder;
    withGroup(group: string): AppResourceUrl;
    withAction(action: string): AppResourceUrl;
    toString(): string;
}
