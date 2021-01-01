import * as ko from 'knockout';
import { ModalOptionsViewModel } from './ModalOptionsViewModel';
import 'bootstrap';
export declare class ModalBindingHandler implements ko.BindingHandler<ModalOptionsViewModel> {
    constructor();
    init(element: any, valueAccessor: () => ModalOptionsViewModel): void;
    update(element: any, valueAccessor: () => ModalOptionsViewModel): void;
}
