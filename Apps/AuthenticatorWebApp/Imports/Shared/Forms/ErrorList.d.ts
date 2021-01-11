import { ErrorModel } from "../../Shared/ErrorModel";
export declare class ErrorList implements IErrorList {
    private readonly errors;
    add(error: ErrorModel): void;
    merge(errors: IErrorList): void;
    hasErrors(): boolean;
    values(): ErrorModel[];
}
