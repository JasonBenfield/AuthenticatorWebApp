import { XtiPath } from "./XtiPath";
import { UrlBuilder } from "./UrlBuilder";

export class AppResourceUrl {
    static app(baseUrl: string, appKey: string, version: string, modifier: string, cacheBust: string) {
        return new AppResourceUrl(baseUrl, XtiPath.app(appKey, version, modifier), cacheBust);
    }

    private constructor(
        private readonly baseUrl: string,
        readonly path: XtiPath,
        private readonly cacheBust: string
    ) {
        this.url = new UrlBuilder(baseUrl)
            .addPart(path.format());
        this.url.addQuery('cacheBust', cacheBust);
    }

    readonly url: UrlBuilder;

    get relativeUrl() {
        return new UrlBuilder(`/${this.path.format()}`);
    }

    withGroup(group: string) {
        return new AppResourceUrl(this.baseUrl, this.path.withGroup(group), this.cacheBust);
    }

    withAction(action: string) {
        return new AppResourceUrl(this.baseUrl, this.path.withAction(action), this.cacheBust);
    }

    toString() {
        return this.url.getUrl();
    }
}