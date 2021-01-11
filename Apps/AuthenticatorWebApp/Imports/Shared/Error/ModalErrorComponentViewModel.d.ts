import * as ko from 'knockout';
import { ModalOptionsViewModel } from '../ModalOptionsViewModel';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { DefaultEventHandler } from '../Events';
import { ErrorModel } from '../ErrorModel';
export declare class ModalErrorComponentViewModel {
    constructor();
    readonly componentName: ko.Observable<string>;
    readonly title: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
    readonly modalOptions: ModalOptionsViewModel;
    readonly errors: ko.ObservableArray<ModalErrorViewModel>;
    private readonly errorSelectedEvents;
    readonly okCommand: import("../Command").CommandViewModel;
    private readonly _errorSelected;
    readonly errorSelected: DefaultEventHandler<ErrorModel>;
    private onErrorSelected;
}
