import { ColumnCss } from "../ColumnCss";
import { ConstraintCollection } from "./ConstraintCollection";
import { FieldCaption } from "./FieldCaption";
import { FieldValue } from "./FieldValue";
import { FieldViewValue } from "./FieldViewValue";
export declare class SimpleField implements IField {
    private readonly vm;
    constructor(prefix: string, name: string, vm: IFieldViewModel, fieldValue: FieldViewValue);
    readonly caption: FieldCaption;
    readonly value: FieldValue;
    getName(): string;
    getCaption(): string;
    getField(name: string): this;
    setValue(value: any): void;
    getValue(): any;
    setColumns(captionColumns: ColumnCss, valueColumns: ColumnCss): void;
    readonly constraints: ConstraintCollection;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    clearErrors(): void;
    validate(errors: IErrorList): void;
    import(values: Record<string, any>): void;
    export(values: Record<string, any>): void;
}
