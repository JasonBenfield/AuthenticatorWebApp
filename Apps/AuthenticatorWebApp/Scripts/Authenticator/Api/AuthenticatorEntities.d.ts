// Generated code

interface IUserStartRequest {
	ReturnUrl: string;
}
interface IEmptyRequest {
}
interface IEmptyActionResult {
}
interface ILoginModel {
	Credentials: ILoginCredentials;
	StartUrl: string;
	ReturnUrl: string;
}
interface ILoginCredentials {
	UserName: string;
	Password: string;
}
interface ILoginResult {
	Token: string;
}