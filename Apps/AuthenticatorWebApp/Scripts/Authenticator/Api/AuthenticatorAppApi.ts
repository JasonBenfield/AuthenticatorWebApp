// Generated code

import { AppApi } from "XtiShared/AppApi";
import { AppApiEvents } from "XtiShared/AppApiEvents";
import { UserGroup } from "./UserGroup";
import { AuthGroup } from "./AuthGroup";
import { AuthApiGroup } from "./AuthApiGroup";


export class AuthenticatorAppApi extends AppApi {
	public static readonly DefaultVersion = 'V1166';
	
	constructor(events: AppApiEvents, baseUrl: string, version: string = '') {
		super(events, baseUrl, 'Authenticator', version || AuthenticatorAppApi.DefaultVersion);
		this.User = this.addGroup((evts, resourceUrl) => new UserGroup(evts, resourceUrl));
		this.Auth = this.addGroup((evts, resourceUrl) => new AuthGroup(evts, resourceUrl));
		this.AuthApi = this.addGroup((evts, resourceUrl) => new AuthApiGroup(evts, resourceUrl));
	}
	
	readonly User: UserGroup;
	readonly Auth: AuthGroup;
	readonly AuthApi: AuthApiGroup;
}