using AuthenticatorWebApp.Api;
using AuthenticatorWebApp.Fakes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_Core;
using XTI_Core.Fakes;
using XTI_TempLog;
using XTI_WebApp.Api;
using XTI_WebApp.Fakes;

namespace HubWebApp.Tests
{
    public class LogoutTest
    {
        [Test]
        public async Task ShouldEndSession()
        {
            var input = await setup();
            await execute(input);
            var endSessionFiles = input.TempLog.EndSessionFiles(input.Clock.Now().AddMinutes(1)).ToArray();
            Assert.That
            (
                endSessionFiles.Length,
                Is.EqualTo(1),
                "Should end session"
            );
        }

        [Test]
        public async Task ShouldRedirectToLogin()
        {
            var input = await setup();
            var result = await execute(input);
            Assert.That
            (
                result.Data.Url,
                Is.EqualTo("/Authenticator/Current/Auth"),
                "Should redirect to login"
            );
        }

        private async Task<TestInput> setup()
        {
            var host = Host.CreateDefaultBuilder()
                .ConfigureServices
                (
                    (hostContext, services) =>
                    {
                        services.AddFakesForXtiWebApp(hostContext.Configuration);
                        services.AddFakeAuthenticatorWebApp();
                    }
                )
                .Build();
            var scope = host.Services.CreateScope();
            var sp = scope.ServiceProvider;
            var fakeApi = sp.GetService<FakeAuthenticatorAppApi>();
            var api = await fakeApi.Create();
            var input = new TestInput(sp, api);
            await input.AppFactory.Users().Add
            (
                new AppUserName("test.user"),
                new FakeHashedPassword("Password12345"),
                DateTime.UtcNow
            );
            var tempLogSession = sp.GetService<TempLogSession>();
            await tempLogSession.StartSession();
            return input;
        }

        private static Task<ResultContainer<WebRedirectResult>> execute(TestInput input)
        {
            return input.Api.Auth.Logout.Execute(new EmptyRequest());
        }

        private class TestInput
        {
            public TestInput(IServiceProvider sp, AuthenticatorAppApi api)
            {
                Api = api;
                AppFactory = sp.GetService<AppFactory>();
                Clock = (FakeClock)sp.GetService<Clock>();
                TempLog = sp.GetService<TempLog>();
            }
            public AuthenticatorAppApi Api { get; }
            public AppFactory AppFactory { get; }
            public FakeClock Clock { get; }
            public TempLog TempLog { get; }
        }
    }
}