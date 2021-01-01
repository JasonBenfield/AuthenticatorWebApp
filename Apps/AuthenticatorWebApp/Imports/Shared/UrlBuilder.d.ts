import { UrlQuery } from "./UrlQuery";
export declare class UrlBuilder {
    static current(): UrlBuilder;
    constructor(baseUrl: string);
    private refreshUrl;
    private readonly parts;
    private url;
    private readonly query;
    addPart(part: string): this;
    hasQuery(name: string): boolean;
    clearQuery(): void;
    removeQuery(name: string): void;
    replaceQuery(name: string, value: string[]): any;
    replaceQuery(name: string, value: string): any;
    replaceQuery(name: string, value: Date): any;
    replaceQuery(name: string, value: number): any;
    addQuery(name: string, value: string[]): any;
    addQuery(name: string, value: string): any;
    addQuery(name: string, value: Date): any;
    addQuery(name: string, value: number): any;
    addQueryString(query: string): UrlQuery;
    addQueryFromObject(obj: any): void;
    getQuery(): UrlQuery;
    getQueryValue(name: string): string;
    getUrl(): string;
    getUrlWithoutQuery(): string;
    toString(): string;
}
