import { ErrorModel } from "./ErrorModel";
export declare class AppApiError {
    private readonly _status;
    private readonly _location;
    private readonly _caption;
    constructor(errors: IErrorModel[], _status: number, _location: string, _caption: string);
    private readonly _errors;
    getErrors(): ErrorModel[];
    isValidationError(): boolean;
    isAuthenticationError(): boolean;
    isCanceled(): boolean;
    getCaption(): string;
    toString(): string;
}
