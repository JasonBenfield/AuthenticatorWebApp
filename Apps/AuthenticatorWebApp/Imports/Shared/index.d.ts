
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.html' {
    const content: string;
    export default content;
}

interface IEmptyRequest {
}

interface PageContext {
    BaseUrl: string;
    CacheBust: string;
    EnvironmentName: string;
    AppTitle: string;
    PageTitle: string;
    IsAuthenticated: boolean;
    UserName: string;
}

declare let pageContext: PageContext;

declare module 'xtistart' {
    export function startup(pageVM: any, page: any);
}

interface EventCallback<TArgs> {
    (args: TArgs, source?: any): void;
}

interface IArrayItemEvent<TArgs> {
    handlerAccessor: (item: any) => IEventHandler<TArgs>;
    callback: EventCallback<TArgs>;
    isEnabled?: () => boolean;
}

interface IEventHandler<TArgs> {
    register(callback: EventCallback<TArgs>, identifier?: any, isEnabled?: () => boolean): IEventHandler<TArgs>;
    unregister(identifier: any);
}

interface IEvent<TArgs> extends IEventHandler<TArgs> {
    invoke(args?: TArgs);
    dispose();
}

interface RegisteredEventCallback {
    callback: EventCallback<any>;
    identifier: string;
    isEnabled: () => boolean;
}

interface DelegatedEvent {
    event: string;
    selector: string;
    callback: (any, string) => boolean;
}

interface IActionErrorOptions {
    caption?: string;
    preventDefault?: boolean;
}

interface IErrorModel {
    Message: string;
    Caption: string;
    Source: string;
}

interface IUserStartRequest {
    ReturnUrl: string;
}

interface IAppApiView<TArgs> {
    getUrl(data: TArgs);
    open(data: TArgs);
    openWindow(data: TArgs);
}

interface IUserGroup {
    readonly Index: IAppApiView<IUserStartRequest>;
}

interface ILogoutUrl {
    value(): string;
}

interface IErrorList {
    add(error: IErrorModel);
    merge(errors: IErrorList);
    hasErrors(): boolean;
    values(): IErrorModel[];
}

interface IField {
    getName(): string;
    getCaption(): string;
    getValue(): any;
    getField(name: string): IField;
    clearErrors();
    validate(errors: IErrorList);
    import(values: Record<string, any>);
    export(values: Record<string, any>);
}

interface IConstraintResult {
    readonly isValid: boolean;
    readonly errorMessage: string;
}

interface IConstraint {
    test(value: any): IConstraintResult;
}

interface IFieldCaptionViewModel {
    readonly caption: ko.Observable<string>;
    readonly css: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
}

interface IFieldValueViewModel {
    readonly name: ko.Observable<string>;
    readonly value: ko.Observable<any>;
    readonly changed: IEventHandler<any>;
    readonly css: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
    readonly isEnabled: ko.Observable<boolean>;
    readonly errors: ko.ObservableArray<IErrorModel>;
    readonly hasError: ko.Observable<boolean>;
}

interface IFieldViewModel {
    readonly caption: IFieldCaptionViewModel;
    readonly value: IFieldValueViewModel;
    readonly isVisible: ko.Observable<boolean>;
}

interface IComponentViewModel {
    readonly componentName: ko.Observable<string>;
}

interface IComponentTemplate {
    readonly name: string;
    register();
}