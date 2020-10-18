import { AppApiError } from "./AppApiError";

export class AppApiEvents {
    constructor(readonly handleError: (error: AppApiError) => void) {
    }
}