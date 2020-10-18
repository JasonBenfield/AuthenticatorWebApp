import { UrlBuilder } from "./UrlBuilder";

export class WebPage {
    constructor(url: string | UrlBuilder) {
        if (url instanceof UrlBuilder) {
            this.url = url.getUrl();
        }
        else {
            this.url = url;
        }
    }

    private readonly url: string;

    open() {
        window.location.href = this.url;
    }

    transfer() {
        window.location.replace(this.url);
    }

    openWindow() {
        window.open(this.url);
    }

    openForPrint() {
        window.open(
            this.url,
            'new_window',
            'location=0,status=0,toolbar=0,menubar=0,height=5,width=5,' +
            'resizable=0,scrollbars=0,titlebar=0'
        );
    }
}