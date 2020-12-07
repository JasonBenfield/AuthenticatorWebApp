using XTI_AuthApi;
using Microsoft.Extensions.DependencyInjection;

namespace AuthenticatorWebApp.Fakes
{
    public static class FakeExtensions
    {
        public static void AddFakeAuthenticatorWebApp(this IServiceCollection services)
        {
            services.AddScoped<AccessForAuthenticate, FakeAccessForAuthenticate>();
            services.AddScoped<AccessForLogin, FakeAccessForLogin>();
            services.AddScoped(sp => new FakeAuthenticatorAppApi(sp));
        }
    }
}
