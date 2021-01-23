import { UrlBuilder } from './UrlBuilder';
export declare class ComponentTemplateAsync implements IComponentTemplate {
    readonly name: string;
    constructor(name: string, url: UrlBuilder | string);
    private readonly url;
    register(): void;
}
