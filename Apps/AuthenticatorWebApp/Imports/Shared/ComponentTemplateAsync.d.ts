import { UrlBuilder } from './UrlBuilder';
export declare class ComponentTemplateAsync {
    private readonly name;
    constructor(name: string, url: UrlBuilder | string);
    private readonly url;
    register(): void;
}
