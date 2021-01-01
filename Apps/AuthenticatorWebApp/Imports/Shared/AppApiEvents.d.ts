import { AppApiError } from "./AppApiError";
export declare class AppApiEvents {
    readonly handleError: (error: AppApiError) => void;
    constructor(handleError: (error: AppApiError) => void);
}
