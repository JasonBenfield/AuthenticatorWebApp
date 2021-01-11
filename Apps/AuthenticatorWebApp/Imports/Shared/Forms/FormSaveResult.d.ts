export declare class FormSaveResult<T> {
    readonly value: T;
    readonly errors: IErrorModel[];
    constructor(value: T, errors: IErrorModel[]);
    succeeded(): boolean;
}
