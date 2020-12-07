using AuthenticatorWebApp.Api;
using AuthenticatorWebApp.Core;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_AuthApi;
using XTI_Core;

namespace AuthenticatorWebApp.Fakes
{
    public sealed class FakeAuthenticatorAppApi
    {
        private readonly IServiceProvider sp;

        public FakeAuthenticatorAppApi(IServiceProvider sp)
        {
            this.sp = sp;
        }

        public async Task<AuthenticatorAppApi> Create()
        {
            var authGroupFactory = new AuthGroupFactory(sp);
            var api = new AuthenticatorAppApi
            (
                AuthenticatorAppKey.Key,
                AppVersionKey.Current,
                new AppApiSuperUser(),
                authGroupFactory
            );
            var appFactory = sp.GetService<AppFactory>();
            var clock = sp.GetService<Clock>();
            await new AllAppSetup(appFactory, clock).Run();
            await new AuthSetup(appFactory, clock).Run();
            return api;
        }
    }
}
