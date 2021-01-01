import { XtiPath } from './XtiPath';
export declare class XtiUrl {
    static current: XtiUrl;
    constructor(url?: string);
    readonly baseUrl: string;
    readonly path: XtiPath;
}
