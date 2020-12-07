// Generated code

import { AppApiGroup } from "../../Shared/AppApiGroup";
import { AppApiAction } from "../../Shared/AppApiAction";
import { AppApiView } from "../../Shared/AppApiView";
import { AppApiEvents } from "../../Shared/AppApiEvents";
import { AppResourceUrl } from "../../Shared/AppResourceUrl";

export class AuthApiGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'AuthApi');
		this.AuthenticateAction = this.createAction<ILoginCredentials,ILoginResult>('Authenticate', 'Authenticate');
	}

	private readonly AuthenticateAction: AppApiAction<ILoginCredentials,ILoginResult>;

	Authenticate(model: ILoginCredentials, errorOptions?: IActionErrorOptions) {
		return this.AuthenticateAction.execute(model, errorOptions || {});
	}
}