// Generated code

import { AppApiGroup } from "XtiShared/AppApiGroup";
import { AppApiAction } from "XtiShared/AppApiAction";
import { AppApiView } from "XtiShared/AppApiView";
import { AppApiEvents } from "XtiShared/AppApiEvents";
import { AppResourceUrl } from "XtiShared/AppResourceUrl";

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