using System.Threading.Tasks;
using XTI_WebAppClient;

namespace XTI_AuthenticatorClient
{
    partial class AuthApiGroup : IAuthApiClientGroup
    {
        Task<LoginResult> IAuthApiClientGroup.Authenticate(LoginCredentials model) => Authenticate(model);
    }
}
