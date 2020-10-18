
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.html' {
    const content: string;
    export default content;
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

interface IActionErrorOptions {
    caption?: string;
    preventDefault?: boolean;
}

interface IErrorModel {
    Message: string;
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