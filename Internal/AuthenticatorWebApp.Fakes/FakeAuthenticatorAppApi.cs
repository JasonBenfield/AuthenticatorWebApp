using AuthenticatorWebApp.Api;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
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
            var api = new AuthenticatorAppApi
            (
                new AppApiSuperUser(),
                sp
            );
            var appFactory = sp.GetService<AppFactory>();
            var clock = sp.GetService<Clock>();
            var apiFactory = sp.GetService<AppApiFactory>();
            await new AuthSetup(appFactory, clock, apiFactory).Run();
            return api;
        }
    }
}
