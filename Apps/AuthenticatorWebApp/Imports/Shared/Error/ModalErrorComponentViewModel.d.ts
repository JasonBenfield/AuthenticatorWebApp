import * as ko from 'knockout';
import { ModalOptionsViewModel } from '../ModalOptionsViewModel';
import { ModalErrorViewModel } from './ModalErrorViewModel';
export declare class ModalErrorComponentViewModel {
    constructor();
    readonly componentName: ko.Observable<string>;
    readonly title: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
    readonly modalOptions: ModalOptionsViewModel;
    readonly errors: ko.ObservableArray<ModalErrorViewModel>;
    readonly okCommand: import("../Command").CommandViewModel;
}
