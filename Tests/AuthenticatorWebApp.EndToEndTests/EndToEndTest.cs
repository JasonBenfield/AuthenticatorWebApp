using MainDB.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using XTI_App;
using XTI_AuthenticatorClient.Extensions;
using XTI_Configuration.Extensions;
using XTI_Core;
using XTI_Secrets;
using XTI_Secrets.Extensions;
using XTI_WebAppClient;

namespace AuthenticatorWebApp.EndToEndTests
{
    public class EndToEndTest
    {
        [Test]
        public async Task ShouldLogin()
        {
            var input = await setup();
            await addUser(input, "TestUser1", "Password12345");
            var result = await input.AuthClient.AuthApi.Authenticate
            (
                new LoginCredentials { UserName = "TestUser1", Password = "Password12345" }
            );
            Assert.That(string.IsNullOrWhiteSpace(result.Token), Is.False, "Should generate token after login");
        }

        [Test]
        public async Task ShouldNotLogin_WhenPasswordIsNotCorrect()
        {
            var input = await setup();
            await addUser(input, "TestUser1", "Password12345");
            var ex = Assert.ThrowsAsync<AppClientException>
            (
                () => input.AuthClient.AuthApi.Authenticate
                (
                    new LoginCredentials { UserName = "TestUser1", Password = "Password123456" }
                )
            );
            Console.WriteLine(ex);
        }

        private async Task addUser(TestInput input, string userName, string password)
        {
            var user = await input.AppFactory.Users().User(new AppUserName(userName));
            if (!user.Exists())
            {
                var hashedPasswordFactory = new Md5HashedPasswordFactory();
                await input.AppFactory.Users().Add
                (
                    new AppUserName(userName),
                    hashedPasswordFactory.Create(password),
                    DateTime.UtcNow
                );
            }
        }

        private async Task<TestInput> setup()
        {
            Environment.SetEnvironmentVariable("DOTNET_ENVIRONMENT", "Test");
            var host = Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration
                (
                    (hostContext, config) =>
                    {
                        config.UseXtiConfiguration(hostContext.HostingEnvironment, new string[] { });
                        config.AddInMemoryCollection
                        (
                            new[]
                            {
                                KeyValuePair.Create("Authenticator:CredentialKey", "TestAuthenticator")
                            }
                        );
                    }
                )
                .ConfigureServices
                (
                    (hostContext, services) =>
                    {
                        services.Configure<AppOptions>(hostContext.Configuration.GetSection(AppOptions.App));
                        services.AddMemoryCache();
                        services.AddAppDbContextForSqlServer(hostContext.Configuration);
                        services.AddScoped<AppFactory>();
                        services.AddScoped<Clock, UtcClock>();
                        services.AddHttpClient();
                        services.AddDataProtection();
                        services.AddFileSecretCredentials();
                        services.AddAuthenticatorClientServices(hostContext.Configuration);
                    }
                )
                .Build();
            var configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.Build();
            var scope = host.Services.CreateScope();
            var secretCredentialsFactory = scope.ServiceProvider.GetService<SecretCredentialsFactory>();
            var secretCredentials = secretCredentialsFactory.Create("TestAuthenticator");
            await secretCredentials.Update("TestUser1", "Password12345");
            return new TestInput(scope.ServiceProvider);
        }

        public sealed class TestInput
        {
            public TestInput(IServiceProvider sp)
            {
                AuthClient = sp.GetService<IAuthClient>();
                AppFactory = sp.GetService<AppFactory>();
            }
            public IAuthClient AuthClient { get; }
            public AppFactory AppFactory { get; }
        }
    }
}