import { ModalErrorComponentViewModel } from './Error/ModalErrorComponentViewModel';
import * as ko from 'knockout';
export declare class PageFrameViewModel {
    readonly page: any;
    readonly modalError: ModalErrorComponentViewModel;
    constructor(page: any, modalError: ModalErrorComponentViewModel, logoutUrl: ILogoutUrl);
    readonly appTitle: ko.Observable<string>;
    readonly pageTitle: ko.Observable<string>;
    readonly isAuthenticated: ko.Observable<boolean>;
    readonly userName: ko.Observable<string>;
    readonly logoutUrl: ko.Observable<string>;
}
