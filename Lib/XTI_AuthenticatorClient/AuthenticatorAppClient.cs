// Generated Code
using XTI_WebAppClient;
using System.Net.Http;

namespace XTI_AuthenticatorClient
{
    public sealed partial class AuthenticatorAppClient : AppClient
    {
        public AuthenticatorAppClient(IHttpClientFactory httpClientFactory, IXtiTokenFactory tokenFactory, string baseUrl, string version = DefaultVersion): base(httpClientFactory, baseUrl, "Authenticator", string.IsNullOrWhiteSpace(version) ? DefaultVersion : version)
        {
            xtiToken = tokenFactory.Create(this);
            User = new UserGroup(httpClientFactory, xtiToken, url);
            Auth = new AuthGroup(httpClientFactory, xtiToken, url);
            AuthApi = new AuthApiGroup(httpClientFactory, xtiToken, url);
        }

        public const string DefaultVersion = "V1111";
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