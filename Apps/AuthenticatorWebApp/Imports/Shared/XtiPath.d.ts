export declare class XtiPath {
    static app(appKey: string, version: string, modifier: string): XtiPath;
    constructor(app: string, version: string, group: string, action: string, modifier: string);
    readonly app: string;
    readonly version: string;
    readonly group: string;
    readonly action: string;
    readonly modifier: string;
    private readonly value;
    withGroup(group: string): XtiPath;
    withAction(action: string): XtiPath;
    format(): string;
    equals(other: XtiPath): boolean;
    toString(): string;
}
