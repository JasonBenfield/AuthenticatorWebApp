import { NumberConstraintCollection } from "./ConstraintCollection";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { SimpleField } from "./SimpleField";
import { TextToNumberViewValue } from "./TextToNumberViewValue";
export declare class NumberInputField extends SimpleField {
    static hidden(prefix: string, name: string, vm: InputFieldViewModel, viewValue?: TextToNumberViewValue): NumberInputField;
    constructor(prefix: string, name: string, vm: InputFieldViewModel, viewValue?: any);
    private readonly inputVM;
    readonly constraints: NumberConstraintCollection;
    setFocus(): void;
    blur(): void;
    setValue(value: number): void;
    getValue(): number;
    protect(): void;
}
