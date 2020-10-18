import { UrlQuery } from "./UrlQuery";
import { JoinedStrings } from "./JoinedStrings";

export class UrlBuilder {
    static current() { return new UrlBuilder(location.href); }

    constructor(baseUrl: string) {
        if (baseUrl) {
            if (baseUrl.substr(baseUrl.length - 1) === '/') {
                baseUrl = baseUrl.substr(0, baseUrl.length - 1);
            }
            this.parts.push(baseUrl);
        }
        this.url = baseUrl;
        let queryIndex = this.url.indexOf('?');
        this.query = new UrlQuery(queryIndex > -1 ? this.url.substr(queryIndex + 1) : '');
        if (queryIndex > -1) {
            this.url = this.url.substr(0, queryIndex);
        }
    }

    private refreshUrl() {
        this.url = new JoinedStrings('/', this.parts).value();
    }

    private readonly parts: string[] = [];
    private url: string;
    private readonly query: UrlQuery;

    addPart(part: string) {
        if (part) {
            let queryIndex = part.indexOf('?');
            if (queryIndex > -1) {
                let query = part.substr(queryIndex + 1);
                this.addQueryString(query);
                part = part.substr(0, queryIndex);
            }
            let fragments = part.split('/');
            for (let fragment of fragments) {
                if (fragment) {
                    this.parts.push(fragment);
                }
            }
            this.refreshUrl();
        }
        return this;
    }

    hasQuery(name: string) {
        return this.query.hasQuery(name);
    }

    clearQuery() {
        this.query.clear();
    }

    removeQuery(name: string) {
        this.query.removeQuery(name);
    }

    replaceQuery(name: string, value: string[]);
    replaceQuery(name: string, value: string);
    replaceQuery(name: string, value: Date);
    replaceQuery(name: string, value: number);
    replaceQuery(name: string, value: any) {
        return this.query.replaceQuery(name, value);
    }

    addQuery(name: string, value: string[]);
    addQuery(name: string, value: string);
    addQuery(name: string, value: Date);
    addQuery(name: string, value: number);
    addQuery(name: string, value: any) {
        return this.query.addQuery(name, value);
    }

    addQueryString(query: string) {
        return this.query.addQueryString(query);
    }

    addQueryFromObject(obj: any) {
        return this.query.addQueryFromObject(obj);
    }

    getQuery() {
        return this.query;
    }

    getQueryValue(name: string) {
        return this.query.getValue(name);
    }

    getUrl() {
        let url = this.url;
        let queryString = this.query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
        return url;
    }

    getUrlWithoutQuery() {
        return this.url;
    }

    toString() {
        return this.getUrl();
    }
}