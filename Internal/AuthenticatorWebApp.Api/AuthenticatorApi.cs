using AuthenticatorWebApp.Core;
using XTI_App.Api;
using XTI_AuthApi;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthenticatorApi : AppApi
    {
        public AuthenticatorApi(string version, IAppApiUser user, AuthGroupFactory authGroupFactory)
            : base(AuthenticatorAppKey.Value, version, user, ResourceAccess.AllowAnonymous())
        {
            Auth = AddGroup((u) => new AuthGroup(this, authGroupFactory));
            AuthApi = AddGroup((u) => new AuthApiGroup(this, authGroupFactory));
        }
        public AuthGroup Auth { get; }
        public AuthApiGroup AuthApi { get; }
    }
}
