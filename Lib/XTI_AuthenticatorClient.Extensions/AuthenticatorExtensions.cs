using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Net.Http;
using XTI_App;
using XTI_Secrets;
using XTI_WebAppClient;

namespace XTI_AuthenticatorClient.Extensions
{
    public static class AuthenticatorExtensions
    {
        public static void AddAuthenticatorClientServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient();
            services.Configure<AuthenticatorOptions>(configuration.GetSection(AuthenticatorOptions.Authenticator));
            services.AddSingleton(sp =>
            {
                var credentialsFactory = sp.GetService<SecretCredentialsFactory>();
                var authOptions = sp.GetService<IOptions<AuthenticatorOptions>>().Value;
                var credentials = credentialsFactory.Create(authOptions.CredentialKey);
                return new XtiTokenFactory(credentials);
            });
            services.AddSingleton(sp =>
            {
                var cache = sp.GetService<IMemoryCache>();
                var sourceFactory = sp.GetService<XtiTokenFactory>();
                return new CachedXtiTokenFactory(cache, sourceFactory);
            });
            services.AddSingleton<IXtiTokenFactory>(sp =>
            {
                return sp.GetService<CachedXtiTokenFactory>();
            });
            services.AddScoped(sp =>
            {
                var httpClientFactory = sp.GetService<IHttpClientFactory>();
                var authOptions = sp.GetService<IOptions<AuthenticatorOptions>>().Value;
                var tokenFactory = sp.GetService<IXtiTokenFactory>();
                var appOptions = sp.GetService<IOptions<AppOptions>>().Value;
                var hostEnv = sp.GetService<IHostEnvironment>();
                var versionKey = hostEnv.IsProduction()
                   ? ""
                   : "Current";
                return new AuthenticatorAppClient
                (
                    httpClientFactory,
                    tokenFactory,
                    appOptions.BaseUrl,
                    versionKey
                );
            });
            services.AddScoped<IAuthClient, AuthenticatorAppClient>();
            services.AddScoped(sp =>
            {
                var tokenFactory = sp.GetService<IXtiTokenFactory>();
                var authClient = sp.GetService<IAuthClient>();
                return tokenFactory.Create(authClient);
            });
        }
    }
}
