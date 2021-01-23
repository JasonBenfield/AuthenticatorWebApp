import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
export declare class AppApiAction<TArgs, TResult> {
    private readonly events;
    readonly friendlyName: string;
    constructor(events: AppApiEvents, resourceUrl: AppResourceUrl, actionName: string, friendlyName: string);
    private readonly resourceUrl;
    execute(data: TArgs, errorOptions: IActionErrorOptions): Promise<TResult>;
    private static dateRegex;
    private parseDates;
    toString(): string;
}
