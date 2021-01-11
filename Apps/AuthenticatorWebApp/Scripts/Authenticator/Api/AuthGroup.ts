// Generated code

import { AppApiGroup } from "XtiShared/AppApiGroup";
import { AppApiAction } from "XtiShared/AppApiAction";
import { AppApiView } from "XtiShared/AppApiView";
import { AppApiEvents } from "XtiShared/AppApiEvents";
import { AppResourceUrl } from "XtiShared/AppResourceUrl";
import { VerifyLoginForm } from "./VerifyLoginForm";

export class AuthGroup extends AppApiGroup {
	constructor(events: AppApiEvents, resourceUrl: AppResourceUrl) {
		super(events, resourceUrl, 'Auth');
		this.Index = this.createView<IEmptyRequest>('Index');
		this.VerifyLoginAction = this.createAction<VerifyLoginForm,IEmptyActionResult>('VerifyLogin', 'Verify Login');
		this.VerifyLoginForm = this.createView<IEmptyRequest>('VerifyLoginForm');
		this.Login = this.createView<ILoginModel>('Login');
		this.Logout = this.createView<IEmptyRequest>('Logout');
	}
	
	readonly Index: AppApiView<IEmptyRequest>;
	readonly VerifyLoginAction: AppApiAction<VerifyLoginForm,IEmptyActionResult>;
	readonly VerifyLoginForm: AppApiView<IEmptyRequest>;
	readonly Login: AppApiView<ILoginModel>;
	readonly Logout: AppApiView<IEmptyRequest>;
	
	VerifyLogin(model: VerifyLoginForm, errorOptions?: IActionErrorOptions) {
		return this.VerifyLoginAction.execute(model, errorOptions || {});
	}
}