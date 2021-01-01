import { NamedValue } from "./NamedValue";
export declare class UrlQuery {
    constructor(query: string);
    private readonly queryValues;
    getValues(): NamedValue[];
    getValue(name: string): string;
    private pushQueryValues;
    clear(): this;
    hasQuery(name: string): boolean;
    removeQuery(name: string): this;
    replaceQuery(name: string, value: string[]): any;
    replaceQuery(name: string, value: string): any;
    replaceQuery(name: string, value: Date): any;
    replaceQuery(name: string, value: number): any;
    addQuery(name: string, value: string[]): any;
    addQuery(name: string, value: string): any;
    addQuery(name: string, value: Date): any;
    addQuery(name: string, value: number): any;
    addQueryFromObject(obj: any): void;
    private _addQueryFromObject;
    addQueryString(query: string): this;
    toString(): string;
}
