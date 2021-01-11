import { ConstraintResult } from "./ConstraintResult";
export declare class ConstraintCollection {
    private readonly constraints;
    private isNullAllowed;
    mustNotBeNull(): void;
    private skipped;
    skipValidation(): void;
    unskipValidation(): void;
    add(constraint: IConstraint): void;
    validate(errors: IErrorList, field: IField): void;
}
export declare class TextConstraintCollection extends ConstraintCollection {
    mustNotBeWhitespace(failureMessage: string): void;
}
export declare class DateConstraintCollection extends ConstraintCollection {
    mustBeOnOrAbove(lowerValue: Date, failureMessage: string): void;
    mustBeAbove(lowerValue: Date, failureMessage: string): void;
    mustBeOnOrBelow(upperValue: Date, failureMessage: string): void;
    mustBeBelow(upperValue: Date, failureMessage: string): void;
}
export declare class NumberConstraintCollection extends ConstraintCollection {
    mustBeOnOrAbove(lowerValue: number, failureMessage: string): void;
    mustBeAbove(lowerValue: number, failureMessage: string): void;
    mustBeOnOrBelow(upperValue: number, failureMessage: string): void;
    mustBeBelow(upperValue: number, failureMessage: string): void;
}
export declare class LowerRangeConstraint<T> implements IConstraint {
    private readonly boundValue;
    private readonly isIncluded;
    private readonly failureMessage;
    constructor(boundValue: T, isIncluded: boolean, failureMessage: string);
    test(value: T): ConstraintResult;
    private isInRange;
}
export declare class UpperRangeConstraint<T> implements IConstraint {
    private readonly boundValue;
    private readonly isIncluded;
    private readonly failureMessage;
    constructor(boundValue: T, isIncluded: boolean, failureMessage: string);
    test(value: T): ConstraintResult;
    private isInRange;
}
