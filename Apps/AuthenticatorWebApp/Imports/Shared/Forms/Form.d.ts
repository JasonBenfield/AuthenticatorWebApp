import { AppApiAction } from "../AppApiAction";
import { DateInputField } from "./DateInputField";
import { DropDownField } from "./DropDownField";
import { DropDownFieldViewModel } from "./DropDownFieldViewModel";
import { FormSaveResult } from "./FormSaveResult";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { NumberInputField } from "./NumberInputField";
import { TextInputField } from "./TextInputField";
export declare class Form {
    private readonly name;
    constructor(name: string);
    private onErrorSelected;
    private readonly fields;
    private readonly modalError;
    getName(): string;
    getField(name: string): IField | this;
    protected addHiddenTextField(name: string, vm: InputFieldViewModel): TextInputField;
    protected addHiddenNumberField(name: string, vm: InputFieldViewModel): NumberInputField;
    protected addHiddenDateField(name: string, vm: InputFieldViewModel): DateInputField;
    protected addTextInputField(name: string, vm: InputFieldViewModel): TextInputField;
    protected addNumberInputField(name: string, vm: InputFieldViewModel): NumberInputField;
    protected addDateInputField(name: string, vm: InputFieldViewModel): DateInputField;
    protected addDropDownField<T>(name: string, vm: DropDownFieldViewModel): DropDownField<T>;
    protected addField<TField extends IField>(field: TField): TField;
    save<TResult>(action: AppApiAction<any, TResult>): Promise<FormSaveResult<any>>;
    private validate;
    import(values: Record<string, any>): void;
    private export;
}
