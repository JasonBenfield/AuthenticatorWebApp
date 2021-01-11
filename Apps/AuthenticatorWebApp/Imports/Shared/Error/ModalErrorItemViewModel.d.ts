import * as ko from 'knockout';
import { ErrorModel } from '../ErrorModel';
export declare class ModalErrorItemViewModel {
    readonly error: ErrorModel;
    constructor(error: ErrorModel);
    readonly captionCss: ko.Observable<string>;
    readonly caption: ko.Observable<string>;
    readonly messageCss: ko.Observable<string>;
    readonly message: ko.Observable<string>;
}
