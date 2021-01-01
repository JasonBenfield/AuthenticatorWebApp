export declare class TelephoneNumber {
    private readonly areaCode;
    private readonly prefix;
    private readonly lineNumber;
    constructor(areaCode: number, prefix: number, lineNumber: number);
    toString(): string;
}
