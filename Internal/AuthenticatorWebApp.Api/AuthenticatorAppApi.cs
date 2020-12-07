using XTI_App;
using XTI_App.Api;
using XTI_AuthApi;
using XTI_WebApp.Api;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthenticatorAppApi : WebAppApi
    {
        public AuthenticatorAppApi
        (
            AppKey appKey,
            AppVersionKey versionKey,
            IAppApiUser user,
            AuthGroupFactory authGroupFactory
        )
            : base(appKey, versionKey, user, ResourceAccess.AllowAnonymous())
        {
            Auth = AddGroup((u) => new AuthGroup(this, authGroupFactory));
            AuthApi = AddGroup((u) => new AuthApiGroup(this, authGroupFactory));
        }
        public AuthGroup Auth { get; }
        public AuthApiGroup AuthApi { get; }
    }
}
