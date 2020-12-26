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
            services.AddScoped<AuthGroupFactory>();
            services.AddSingleton(_ => AuthenticatorAppKey.Key);
            services.AddScoped<AuthenticatorAppApi>();
            services.AddScoped<AppApi, AuthenticatorAppApi>(sp => sp.GetService<AuthenticatorAppApi>());
            services
                .AddMvc()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                })
                .AddMvcOptions(options =>
                {
                });
            services.AddControllersWithViews()
                .PartManager.ApplicationParts.Add
                (
                    new AssemblyPart(typeof(AuthController).Assembly)
                );
        }
    }
}
