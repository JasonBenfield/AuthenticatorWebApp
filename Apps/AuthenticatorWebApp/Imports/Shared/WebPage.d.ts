import { UrlBuilder } from "./UrlBuilder";
export declare class WebPage {
    constructor(url: string | UrlBuilder);
    private readonly url;
    open(): void;
    transfer(): void;
    openWindow(): void;
    openForPrint(): void;
}
