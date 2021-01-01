import { IEnumerable } from './Enumerable';
export declare class JoinedStrings {
    private readonly separator;
    constructor(separator: string, arr: any[] | IEnumerable<string>, format?: (any: any) => string);
    private readonly arr;
    private readonly format;
    private joined;
    value(): string;
    toString(): string;
}
