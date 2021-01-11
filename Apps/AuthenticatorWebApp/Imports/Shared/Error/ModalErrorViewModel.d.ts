import * as ko from 'knockout';
import { ErrorModel } from '../ErrorModel';
import { DefaultEventHandler } from '../Events';
import { ModalErrorItemViewModel } from './ModalErrorItemViewModel';
export declare class ModalErrorViewModel {
    readonly errors: ko.ObservableArray<ModalErrorItemViewModel>;
    readonly caption: ko.Observable<string>;
    private readonly _errorSelected;
    readonly errorSelected: DefaultEventHandler<ErrorModel>;
    onErrorSelected(errorItemVM: ModalErrorItemViewModel): void;
}
