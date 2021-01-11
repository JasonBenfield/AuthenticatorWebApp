using AuthenticatorWebApp.Core;
using System;
using XTI_App.Api;
using XTI_AuthApi;
using XTI_WebApp.Api;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthenticatorAppApi : WebAppApi
    {
        public AuthenticatorAppApi
        (
            IAppApiUser user,
            IServiceProvider sp
        )
            : base(AuthenticatorAppKey.Key, user, ResourceAccess.AllowAnonymous())
        {
            var authGroupFactory = new AuthActionFactory(sp);
            Auth = AddGroup((u) => new AuthGroup(this, authGroupFactory));
            AuthApi = AddGroup((u) => new AuthApiGroup(this, authGroupFactory));
        }
        public AuthGroup Auth { get; }
        public AuthApiGroup AuthApi { get; }
    }
}
