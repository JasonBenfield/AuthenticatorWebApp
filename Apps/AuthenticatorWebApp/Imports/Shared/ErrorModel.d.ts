export declare class ErrorModel implements IErrorModel {
    readonly Message: string;
    readonly Source: string;
    readonly context?: any;
    constructor(Message: string, Source?: string, context?: any);
    toString(): string;
}
