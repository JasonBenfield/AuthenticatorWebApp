import * as ko from 'knockout';
import { ErrorModel } from '../ErrorModel';
export declare class ModalErrorViewModel {
    constructor(errors: ErrorModel[], caption: string);
    readonly errors: ko.ObservableArray<any>;
    readonly caption: ko.Observable<string>;
}
