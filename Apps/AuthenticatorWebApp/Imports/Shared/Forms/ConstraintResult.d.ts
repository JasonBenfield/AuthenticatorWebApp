export declare class ConstraintResult implements IConstraintResult {
    static passed(): ConstraintResult;
    static failed(errorMessage: string): ConstraintResult;
    private constructor();
    readonly isValid: boolean;
    readonly errorMessage: string;
}
