import * as ko from 'knockout';
export declare class FaIconViewModel {
    constructor();
    readonly componentName: ko.Observable<string>;
    readonly cssClass: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
}
export declare enum FaIconPrefix {
    solid = 0,
    regular = 1
}
export declare class FaIconNames {
    static readonly login = "sign-in-alt";
    static readonly save = "check";
    static readonly cancel = "times";
}
export declare class FaIcon {
    private readonly vm;
    private name;
    private prefix;
    constructor(vm: FaIconViewModel, name: string, prefix?: FaIconPrefix);
    private prefixCss;
    private readonly cssClass;
    setPrefix(prefix: FaIconPrefix): void;
    setName(name: string): void;
    private updateVmCssClass;
}
