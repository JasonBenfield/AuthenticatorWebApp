export declare class ErrorModel implements IErrorModel {
    readonly Message: string;
    readonly Caption: string;
    readonly Source: string;
    readonly context?: any;
    constructor(Message: string, Caption?: string, Source?: string, context?: any);
    toString(): string;
}
