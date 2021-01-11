import * as ko from 'knockout';
export declare class ContextualClassViewModel {
    readonly isDefault: ko.Observable<boolean>;
    readonly isSuccess: ko.Observable<boolean>;
    readonly isInfo: ko.Observable<boolean>;
    readonly isWarning: ko.Observable<boolean>;
    readonly isDanger: ko.Observable<boolean>;
    readonly isPrimary: ko.Observable<boolean>;
    readonly isSecondary: ko.Observable<boolean>;
    readonly isLight: ko.Observable<boolean>;
    readonly isDark: ko.Observable<boolean>;
}
export declare class ContextualClassNames {
    static readonly default = "default";
    static readonly success = "success";
    static readonly info = "info";
    static readonly warning = "warning";
    static readonly danger = "danger";
    static readonly primary = "primary";
    static readonly secondary = "secondary";
    static readonly light = "light";
    static readonly dark = "dark";
}
export declare class ContextualClass {
    private readonly vm;
    private readonly value;
    static default(vm: ContextualClassViewModel): ContextualClass;
    static success(vm: ContextualClassViewModel): ContextualClass;
    static info(vm: ContextualClassViewModel): ContextualClass;
    static warning(vm: ContextualClassViewModel): ContextualClass;
    static danger(vm: ContextualClassViewModel): ContextualClass;
    static primary(vm: ContextualClassViewModel): ContextualClass;
    static secondary(vm: ContextualClassViewModel): ContextualClass;
    static light(vm: ContextualClassViewModel): ContextualClass;
    static dark(vm: ContextualClassViewModel): ContextualClass;
    private constructor();
    equals(other: ContextualClass | string): boolean;
    toString(): string;
}
