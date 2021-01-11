import { ConstraintResult } from "./ConstraintResult";
export declare class NotWhitespaceConstraint implements IConstraint {
    private readonly failureMessage;
    constructor(failureMessage: any);
    test(value: string): ConstraintResult;
}
