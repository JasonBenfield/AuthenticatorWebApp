import * as ko from 'knockout';
import { DropDownFieldItem } from "./DropDownFieldItem";
import { SimpleFieldViewModel } from "./SimpleFieldViewModel";
import { FieldValueViewModel } from './FieldValueViewModel';
export declare class DropDownFieldViewModel extends SimpleFieldViewModel {
    constructor();
    readonly value: DropDownFieldValueViewModel;
}
export declare class DropDownFieldValueViewModel extends FieldValueViewModel {
    constructor();
    private onValueChanged;
    readonly items: ko.ObservableArray<DropDownFieldItem<any>>;
    readonly itemsText: ko.Observable<string>;
    readonly itemsValue: ko.Observable<string>;
    readonly itemsCaption: ko.Observable<string>;
    readonly hasFocus: ko.Observable<boolean>;
}
