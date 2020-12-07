// Generated Code
using XTI_WebAppClient;
using System.Net.Http;
using System.Threading.Tasks;

namespace XTI_AuthenticatorClient
{
    public sealed partial class AuthApiGroup : AppClientGroup
    {
        public AuthApiGroup(IHttpClientFactory httpClientFactory, XtiToken xtiToken, string baseUrl): base(httpClientFactory, xtiToken, baseUrl, "AuthApi")
        {
        }

        public Task<LoginResult> Authenticate(LoginCredentials model) => Post<LoginResult, LoginCredentials>("Authenticate", "", model);
    }
}