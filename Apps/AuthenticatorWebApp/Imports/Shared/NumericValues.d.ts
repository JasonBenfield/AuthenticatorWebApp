import { NumericValue } from "./NumericValue";
export declare class NumericValues<T extends NumericValue> {
    readonly all: T[];
    constructor(all: T[]);
    value(testValue: T | string | number): T;
}
