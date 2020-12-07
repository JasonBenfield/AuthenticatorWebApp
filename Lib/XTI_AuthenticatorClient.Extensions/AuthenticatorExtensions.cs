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
            services.AddScoped<IAuthClient>(sp =>
            {
                var httpClientFactory = sp.GetService<IHttpClientFactory>();
                var authOptions = sp.GetService<IOptions<AuthenticatorOptions>>().Value;
                var credentialsFactory = sp.GetService<SecretCredentialsFactory>();
                var credentials = credentialsFactory.Create(authOptions.CredentialKey);
                var appOptions = sp.GetService<IOptions<AppOptions>>().Value;
                var hostEnv = sp.GetService<IHostEnvironment>();
                var versionKey = hostEnv.IsProduction()
                   ? ""
                   : "Current";
                return new AuthenticatorAppClient
                (
                    httpClientFactory,
                    credentials,
                    appOptions.BaseUrl,
                    versionKey
                );
            });
            services.AddScoped(sp =>
            {
                var authClient = sp.GetService<IAuthClient>();
                var authOptions = sp.GetService<IOptions<AuthenticatorOptions>>().Value;
                var credentialsFactory = sp.GetService<SecretCredentialsFactory>();
                var credentials = credentialsFactory.Create(authOptions.CredentialKey);
                return new XtiToken(authClient, credentials);
            });
        }
    }
}
