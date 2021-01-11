import * as ko from 'knockout';
export declare class FieldCaptionViewModel implements IFieldCaptionViewModel {
    readonly caption: ko.Observable<string>;
    readonly css: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
}
