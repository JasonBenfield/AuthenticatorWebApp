using AuthenticatorWebApp.Api;
using Microsoft.Extensions.DependencyInjection;
using XTI_App.Api;
using XTI_AuthApi;

namespace AuthenticatorWebApp.Fakes
{
    public static class FakeExtensions
    {
        public static void AddFakeAuthenticatorWebApp(this IServiceCollection services)
        {
            services.AddScoped<AccessForAuthenticate, FakeAccessForAuthenticate>();
            services.AddScoped<AccessForLogin, FakeAccessForLogin>();
            services.AddScoped<AppApiFactory, AuthenticatorApiFactory>();
            services.AddScoped(sp => new FakeAuthenticatorAppApi(sp));
        }
    }
}
