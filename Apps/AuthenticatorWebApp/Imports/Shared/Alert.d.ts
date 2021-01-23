import * as ko from 'knockout';
import { ContextualClassViewModel } from './ContextualClass';
import { ComponentViewModel } from './ComponentViewModel';
export declare class AlertViewModel extends ComponentViewModel {
    constructor();
    readonly contextualClass: ContextualClassViewModel;
    readonly message: ko.Observable<string>;
    readonly hasMessage: ko.PureComputed<boolean>;
    readonly hasSuccessMessage: ko.PureComputed<boolean>;
    readonly hasInfoMessage: ko.PureComputed<boolean>;
    readonly hasWarningMessage: ko.PureComputed<boolean>;
    readonly hasDangerMessage: ko.PureComputed<boolean>;
}
export declare class Alert {
    private readonly vm;
    constructor(vm: AlertViewModel);
    clear(): void;
    success(message: string): void;
    info(message: string): void;
    infoAction(message: string, a: () => Promise<any>): Promise<void>;
    warning(message: string): void;
    danger(message: string): void;
    private setMessage;
    private debouncedSetMessage;
}
