import * as ko from 'knockout';
import { FieldValueViewModel } from "../../Shared/Forms/FieldValueViewModel";
import { FieldCaptionViewModel } from "./FieldCaptionViewModel";
export declare class SimpleFieldViewModel implements IFieldViewModel {
    constructor();
    readonly componentName: ko.Observable<string>;
    readonly caption: FieldCaptionViewModel;
    readonly value: FieldValueViewModel;
    readonly isVisible: ko.Observable<boolean>;
}
