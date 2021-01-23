export declare class NumericValue {
    readonly Value: number;
    readonly DisplayText: string;
    constructor(Value: number, DisplayText: string);
    equalsAny(...other: NumericValue[] | number[] | string[]): boolean;
    equals(other: NumericValue | number | string): boolean;
    private normalizeDisplayText;
    toString(): string;
}
