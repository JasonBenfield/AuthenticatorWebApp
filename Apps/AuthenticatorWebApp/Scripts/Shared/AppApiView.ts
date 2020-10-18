import { AppResourceUrl } from "./AppResourceUrl";
import { UrlBuilder } from "./UrlBuilder";
import { WebPage } from "./WebPage";

export class AppApiView<TArgs> {
    constructor(
        resourceUrl: AppResourceUrl,
        actionName: string
    ) {
        this.url = resourceUrl.withAction(actionName).url.getUrl();
    }

    private readonly url: string;

    getUrl(data: TArgs) {
        let urlBuilder = new UrlBuilder(this.url);
        urlBuilder.addQueryFromObject(data);
        return urlBuilder;
    }

    open(data: TArgs) {
        let webPage = this.createWebPage(data);
        webPage.open();
    }

    openWindow(data: TArgs) {
        let webPage = this.createWebPage(data);
        webPage.openWindow();
    }

    private createWebPage(data: TArgs) {
        let urlBuilder = this.getUrl(data);
        return new WebPage(urlBuilder);
    }
}