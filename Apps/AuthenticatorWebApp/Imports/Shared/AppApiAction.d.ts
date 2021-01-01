import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
export declare class AppApiAction<TArgs, TResult> {
    private readonly events;
    private readonly friendlyName;
    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl, actionName: string, friendlyName: string);
    private readonly resourceUrl;
    execute(data: TArgs, errorOptions: IActionErrorOptions): Promise<TResult>;
    toString(): string;
}
