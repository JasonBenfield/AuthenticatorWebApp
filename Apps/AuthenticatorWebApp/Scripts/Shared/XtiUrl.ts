import { XtiPath } from './XtiPath';

export class XtiUrl {
    static current = new XtiUrl(location.href);

    constructor(url: string = location.href) {
        let protocolIndex = url.indexOf('//');
        let slashIndex = url.indexOf('/', protocolIndex + 2);
        this.baseUrl = url.substring(0, slashIndex);
        let endIndex = url.indexOf('?');
        if (endIndex < 0) {
            endIndex = url.indexOf('#');
            if (endIndex < 0) {
                endIndex = url.length;
            }
        }
        else {
            endIndex = url.length;
        }
        let path = url.substring(slashIndex + 1, endIndex);
        let split = path.split('/');
        this.path = new XtiPath(split[0], split[1], split[2], split[3], split[4]);
    }

    readonly baseUrl: string;
    readonly path: XtiPath;
}