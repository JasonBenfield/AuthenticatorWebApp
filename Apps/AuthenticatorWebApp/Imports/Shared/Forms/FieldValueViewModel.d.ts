import * as ko from 'knockout';
import { DefaultEventHandler } from '../Events';
export declare class FieldValueViewModel implements IFieldValueViewModel {
    constructor();
    readonly componentName: ko.Observable<string>;
    readonly inputComponentName: ko.Observable<string>;
    readonly name: ko.Observable<string>;
    readonly css: ko.Observable<string>;
    readonly value: ko.Observable<any>;
    readonly isEnabled: ko.Observable<boolean>;
    readonly isVisible: ko.Observable<boolean>;
    readonly errors: ko.ObservableArray<IErrorModel>;
    readonly hasError: ko.Observable<boolean>;
    private readonly _changed;
    readonly changed: DefaultEventHandler<string>;
    protected change(value: string): void;
}
export declare class ComplexFieldValueViewModel extends FieldValueViewModel {
    private readonly values;
    protected addValue<T extends IFieldViewModel>(field: T): T;
}
