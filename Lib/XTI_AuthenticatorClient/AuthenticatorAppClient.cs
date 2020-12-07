// Generated Code
using XTI_WebAppClient;
using System.Net.Http;
using XTI_Credentials;

namespace XTI_AuthenticatorClient
{
    public sealed partial class AuthenticatorAppClient : AppClient
    {
        public AuthenticatorAppClient(IHttpClientFactory httpClientFactory, ICredentials credentials, string baseUrl, string version = DefaultVersion): base(httpClientFactory, baseUrl, "Authenticator", string.IsNullOrWhiteSpace(version) ? DefaultVersion : version)
        {
            xtiToken = new XtiToken(this, credentials);
            User = new UserGroup(httpClientFactory, xtiToken, url);
            Auth = new AuthGroup(httpClientFactory, xtiToken, url);
            AuthApi = new AuthApiGroup(httpClientFactory, xtiToken, url);
        }

        public const string DefaultVersion = "V56";
        public UserGroup User
        {
            get;
        }

        public AuthGroup Auth
        {
            get;
        }

        public AuthApiGroup AuthApi
        {
            get;
        }
    }
}