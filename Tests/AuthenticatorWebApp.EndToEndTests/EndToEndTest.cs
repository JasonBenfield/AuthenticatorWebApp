using MainDB.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using XTI_App;
using XTI_AuthenticatorClient;
using XTI_AuthenticatorClient.Extensions;
using XTI_Configuration.Extensions;
using XTI_Core;
using XTI_Credentials;
using XTI_Secrets.Extensions;
using XTI_WebAppClient;

namespace AuthenticatorWebApp.EndToEndTests
{
    public class EndToEndTest
    {
        [Test]
        public async Task ShouldLogin()
        {
            var input = setup();
            await addUser(input, "TestUser1", "Password12345");
            var result = await input.HubClient.AuthApi.Authenticate
            (
                new LoginCredentials { UserName = "TestUser1", Password = "Password12345" }
            );
            Assert.That(string.IsNullOrWhiteSpace(result.Token), Is.False, "Should generate token after login");
        }

        [Test]
        public async Task ShouldNotLogin_WhenPasswordIsNotCorrect()
        {
            var input = setup();
            await addUser(input, "TestUser1", "Password12345");
            var ex = Assert.ThrowsAsync<AppClientException>
            (
                () => input.HubClient.AuthApi.Authenticate
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

        private TestInput setup()
        {
            Environment.SetEnvironmentVariable("DOTNET_ENVIRONMENT", "Test");
            var host = Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration
                (
                    (hostContext, config) =>
                    {
                        config.UseXtiConfiguration(hostContext.HostingEnvironment, new string[] { });
                    }
                )
                .ConfigureServices
                (
                    (hostContext, services) =>
                    {
                        services.Configure<AppOptions>(hostContext.Configuration.GetSection(AppOptions.App));
                        services.AddAppDbContextForSqlServer(hostContext.Configuration);
                        services.AddScoped<AppFactory>();
                        services.AddScoped<Clock, UtcClock>();
                        services.AddHttpClient();
                        services.AddDataProtection();
                        services.AddFileSecretCredentials();
                        services.AddAuthenticatorClientServices(hostContext.Configuration);
                        services.AddScoped<ICredentials, TestCredentials>(sp =>
                        {
                            var credentials = new SimpleCredentials(new CredentialValue("TestUser1", "Password12345"));
                            return new TestCredentials(credentials);
                        });
                    }
                )
                .Build();
            var configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.Build();
            var scope = host.Services.CreateScope();
            return new TestInput(scope.ServiceProvider);
        }

        public sealed class TestCredentials : ICredentials
        {
            public TestCredentials(ICredentials source)
            {
                Source = source;
            }

            public ICredentials Source { get; set; }

            public Task<CredentialValue> Value() => Source.Value();
        }

        public sealed class TestInput
        {
            public TestInput(IServiceProvider sp)
            {
                HubClient = sp.GetService<AuthenticatorAppClient>();
                TestCredentials = (TestCredentials)sp.GetService<ICredentials>();
                AppFactory = sp.GetService<AppFactory>();
            }
            public AuthenticatorAppClient HubClient { get; }
            public TestCredentials TestCredentials { get; }
            public AppFactory AppFactory { get; }
        }
    }
}