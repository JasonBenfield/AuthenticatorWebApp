using AuthenticatorWebApp.Api;
using AuthenticatorWebApp.ApiControllers;
using AuthenticatorWebApp.Core;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using XTI_App;
using XTI_App.Api;
using XTI_AuthApi;
using XTI_WebApp.Extensions;

namespace AuthenticatorWebApp.Extensions
{
    public static class Extensions
    {
        public static void AddAuthenticator(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddWebAppServices(configuration);
            services.AddScoped<IHashedPasswordFactory, Md5HashedPasswordFactory>();
            services.AddScoped<AccessForAuthenticate, JwtAccess>();
            services.AddScoped<AccessForLogin, CookieAccess>();
            services.AddScoped<AuthActionFactory>();
            services.AddSingleton(_ => AuthenticatorAppKey.Key);
            services.AddScoped<AppApiFactory, AuthenticatorApiFactory>();
            services.AddScoped(sp => (AuthenticatorAppApi)sp.GetService<IAppApi>());
            services
                .AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SetDefaultJsonOptions();
                })
                .AddMvcOptions(options =>
                {
                    options.SetDefaultMvcOptions();
                });
            services.AddControllersWithViews()
                .PartManager.ApplicationParts.Add
                (
                    new AssemblyPart(typeof(AuthController).Assembly)
                );
        }
    }
}
