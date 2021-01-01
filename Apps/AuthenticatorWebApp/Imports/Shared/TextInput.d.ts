import * as ko from 'knockout';
import { DefaultEventHandler } from './Events';
import { ColumnCss } from './ColumnCss';
export declare class TextInputViewModel {
    constructor(caption?: string);
    readonly componentName: ko.Observable<string>;
    readonly type: ko.Observable<string>;
    readonly caption: ko.Observable<string>;
    readonly captionCss: ko.Observable<string>;
    readonly isCaptionVisible: ko.Observable<boolean>;
    readonly value: ko.Observable<string>;
    readonly valueCss: ko.Observable<string>;
    readonly isValueVisible: ko.Observable<boolean>;
    readonly isVisible: ko.Observable<boolean>;
    readonly isEnabled: ko.Observable<boolean>;
    readonly name: ko.Observable<string>;
    private readonly _valueChanged;
    readonly valueChanged: DefaultEventHandler<string>;
    change(value: string): void;
}
export declare class TextInput {
    private readonly vm;
    constructor(vm: TextInputViewModel);
    readonly valueChanged: DefaultEventHandler<string>;
    setColumns(captionColumns: ColumnCss, valueColumns: ColumnCss): void;
    setCaptionColumns(columns: ColumnCss): void;
    setValueColumns(columns: ColumnCss): void;
    named(name: string): void;
    setCaption(caption: string): void;
    setValue(text: string): void;
    getValue(): string;
    show(): void;
    hide(): void;
    showCaption(): void;
    hideCaption(): void;
    showValue(): void;
    hideValue(): void;
    enable(): void;
    disable(): void;
}
export declare class PasswordInput extends TextInput {
    constructor(vm: TextInputViewModel);
}
