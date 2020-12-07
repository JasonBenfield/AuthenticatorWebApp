using XTI_WebAppClient;

namespace XTI_AuthenticatorClient
{
    partial class AuthenticatorAppClient : IAuthClient
    {
        IAuthApiClientGroup IAuthClient.AuthApi { get => AuthApi; }
    }
}
