using System;
using XTI_App.Api;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthenticatorApiFactory : AppApiFactory
    {
        private readonly IServiceProvider sp;

        public AuthenticatorApiFactory(IServiceProvider sp)
        {
            this.sp = sp;
        }

        protected override AppApi _Create(IAppApiUser user) => new AuthenticatorAppApi
        (
            user,
            sp
        );
    }
}
