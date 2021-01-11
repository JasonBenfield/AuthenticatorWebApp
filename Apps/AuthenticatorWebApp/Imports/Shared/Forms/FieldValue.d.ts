import { ColumnCss } from "../ColumnCss";
import { FieldViewValue } from "./FieldViewValue";
export declare class FieldValue {
    private readonly vm;
    private readonly fieldValue;
    constructor(prefix: string, name: string, vm: IFieldValueViewModel, fieldValue: FieldViewValue);
    readonly changed: IEventHandler<any>;
    private onValueChanged;
    private name;
    getName(): string;
    getValue(): any;
    setValue(value: any): void;
    setColumns(columns: ColumnCss): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
}
