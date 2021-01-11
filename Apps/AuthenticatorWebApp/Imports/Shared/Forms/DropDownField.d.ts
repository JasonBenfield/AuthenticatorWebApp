import { DropDownFieldItem } from "./DropDownFieldItem";
import { DropDownFieldViewModel } from "./DropDownFieldViewModel";
import { SimpleField } from "./SimpleField";
export declare class DropDownField<T> extends SimpleField {
    private readonly dropDownVM;
    constructor(prefix: string, name: string, vm: DropDownFieldViewModel);
    setItems(...items: DropDownFieldItem<T>[]): void;
    setItemCaption(itemCaption: string): void;
    setValue(value: T): void;
    getValue(): T;
    setFocus(): void;
    blur(): void;
}
