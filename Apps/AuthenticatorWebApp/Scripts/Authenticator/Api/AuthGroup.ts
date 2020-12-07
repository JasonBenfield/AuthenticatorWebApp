// Generated code

import { AppApiGroup } from "../../Shared/AppApiGroup";
import { AppApiAction } from "../../Shared/AppApiAction";
import { AppApiView } from "../../Shared/AppApiView";
import { AppApiEvents } from "../../Shared/AppApiEvents";
import { AppResourceUrl } from "../../Shared/AppResourceUrl";

export class AuthGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'Auth');
		this.Index = this.createView<IEmptyRequest>('Index');
		this.VerifyAction = this.createAction<ILoginCredentials,IEmptyActionResult>('Verify', 'Verify');
		this.Login = this.createView<ILoginModel>('Login');
		this.Logout = this.createView<IEmptyRequest>('Logout');
	}

	readonly Index: AppApiView<IEmptyRequest>;
	private readonly VerifyAction: AppApiAction<ILoginCredentials,IEmptyActionResult>;
	readonly Login: AppApiView<ILoginModel>;
	readonly Logout: AppApiView<IEmptyRequest>;

	Verify(model: ILoginCredentials, errorOptions?: IActionErrorOptions) {
		return this.VerifyAction.execute(model, errorOptions || {});
	}
}