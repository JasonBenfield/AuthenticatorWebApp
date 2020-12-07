// Generated code

interface IUserStartRequest {
	ReturnUrl: string;
}
interface IAppActionViewResult {
	ViewName: string;
}
interface IEmptyRequest {
}
interface ILoginCredentials {
	UserName: string;
	Password: string;
}
interface IEmptyActionResult {
}
interface ILoginModel {
	Credentials: ILoginCredentials;
	StartUrl: string;
	ReturnUrl: string;
}
interface IAppActionRedirectResult {
	Url: string;
}
interface ILoginResult {
	Token: string;
}