using AuthenticatorWebApp.Core;
using System;
using XTI_App.Api;
using XTI_AuthApi;
using XTI_WebApp.Api;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthenticatorAppApi : WebAppApiWrapper
    {
        public AuthenticatorAppApi
        (
            IAppApiUser user,
            IServiceProvider sp
        )
            : base
            (
                new AppApi
                (
                    AuthenticatorAppKey.Key,
                    user,
                    ResourceAccess.AllowAnonymous()
                )
            )
        {
            var authGroupFactory = new AuthActionFactory(sp);
            Auth = new AuthGroup(source.AddGroup(nameof(Auth)), authGroupFactory);
            AuthApi = new AuthApiGroup(source.AddGroup(nameof(AuthApi)), authGroupFactory);
        }
        public AuthGroup Auth { get; }
        public AuthApiGroup AuthApi { get; }
    }
}
