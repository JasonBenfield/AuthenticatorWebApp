using System;
using XTI_App.Api;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthenticatorApiFactory : AppApiFactory
    {
        private readonly IServiceProvider services;

        public AuthenticatorApiFactory(IServiceProvider services)
        {
            this.services = services;
        }

        protected override IAppApi _Create(IAppApiUser user)
            => new AuthenticatorAppApi(user, services);
    }
}
