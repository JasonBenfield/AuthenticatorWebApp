import * as ko from 'knockout';
import { FieldCaptionViewModel } from "./FieldCaptionViewModel";
export declare class ComplexFieldViewModel implements IFieldViewModel {
    constructor(value: IFieldValueViewModel);
    readonly componentName: ko.Observable<string>;
    readonly value: IFieldValueViewModel;
    readonly isVisible: ko.Observable<boolean>;
    readonly caption: FieldCaptionViewModel;
}
