import * as ko from "knockout";
import { SimpleFieldViewModel } from "./SimpleFieldViewModel";
import { FieldValueViewModel } from "./FieldValueViewModel";
export declare class InputFieldViewModel extends SimpleFieldViewModel {
    constructor();
    readonly value: InputFieldValueViewModel;
}
export declare class InputFieldValueViewModel extends FieldValueViewModel {
    constructor();
    private onValueChanged;
    readonly type: ko.Observable<string>;
    readonly hasFocus: ko.Observable<boolean>;
    readonly maxLength: ko.Observable<number>;
}
