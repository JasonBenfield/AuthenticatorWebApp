import { HttpClient } from "./HttpClient";
import { JsonText } from "./JsonText";
import { AppApiEvents } from "./AppApiEvents";
import { AppApiError } from "./AppApiError";
import { ErrorModel } from "./ErrorModel";
import { AppResourceUrl } from "./AppResourceUrl";
import { MappedArray } from './Enumerable';

export class AppApiAction<TArgs,TResult> {
    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        actionName: string,
        private readonly friendlyName: string
    ) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }

    private readonly resourceUrl: AppResourceUrl;

    async execute(data: TArgs, errorOptions: IActionErrorOptions) {
        let model: any;
        if (typeof data === 'string' || typeof data === 'number' || data instanceof Date) {
            model = { model: data };
        }
        else {
            model = data;
        }
        let jsonText = new JsonText(model).toString();
        let postResult = await new HttpClient().post(this.resourceUrl.url.getUrl(), jsonText);
        let result: TResult;
        let apiError: AppApiError;
        result = postResult && postResult.result && postResult.result.Data;
        if (!postResult.isSuccessful()) {
            let errors: ErrorModel[] = [];
            if (result) {
                let rawErrors = <IErrorModel[]><any>result;
                errors = new MappedArray(rawErrors, e => new ErrorModel(e.Message, e.Source)).value();
            }
            else if (postResult.status === 404) {
                errors = [new ErrorModel('Not Found', '', this)];
            }
            else if (postResult.status === 401) {
                errors = [new ErrorModel('Not Authenticated', '', this)];
            }
            else if (postResult.status === 403) {
                errors = [new ErrorModel('Not Authorized', '', this)];
            }
            else {
                let message = 'An error occurred';
                if (postResult.status !== 500) {
                    message += ` (${postResult.status})`;
                }
                errors = [new ErrorModel(message, '', this)];
            }
            apiError = new AppApiError(
                errors,
                postResult.status,
                this.friendlyName,
                errorOptions.caption || ''
            );
        }
        if (apiError && !errorOptions.preventDefault) {
            this.events.handleError(apiError);
            throw new Error(apiError.getCaption());
        }
        return result;
    }

    toString() {
        return `AppApiAction ${this.resourceUrl}`;
    }
}
