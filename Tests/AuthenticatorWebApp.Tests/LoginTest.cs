using AuthenticatorWebApp.Api;
using AuthenticatorWebApp.Fakes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NUnit.Framework;
using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_App.Fakes;
using XTI_AuthApi;
using XTI_Core;
using XTI_Core.Fakes;
using XTI_TempLog;
using XTI_WebApp;
using XTI_WebApp.Api;
using XTI_WebApp.Fakes;

namespace AuthenticatorWebApp.Tests
{
    public class LoginTest
    {
        [Test]
        public async Task ShouldRequireUserName()
        {
            var input = await setup();
            input.Model.Credentials.UserName = "";
            var ex = Assert.ThrowsAsync<ValidationFailedException>
            (
                () => execute(input)
            );
            Assert.That
            (
                ex.Errors,
                Has.One.EqualTo(new ErrorModel(AuthErrors.UserNameIsRequired, "User Name", "UserName")),
                "Should require user name"
            );
        }

        [Test]
        public async Task ShouldRequirePassword()
        {
            var input = await setup();
            input.Model.Credentials.Password = "";
            var ex = Assert.ThrowsAsync<ValidationFailedException>
            (
                () => execute(input)
            );
            Assert.That
            (
                ex.Errors,
                Has.One.EqualTo(new ErrorModel(AuthErrors.PasswordIsRequired, "Password", "Password")),
                "Should require password"
            );
        }

        [Test]
        public async Task ShouldRequireCorrectPassword()
        {
            var input = await setup();
            input.Model.Credentials.Password = "Incorrect";
            Assert.ThrowsAsync<PasswordIncorrectException>
            (
                () => execute(input)
            );
        }

        [Test]
        public async Task ShouldVerifyCorrectPassword()
        {
            var input = await setup();
            var result = await execute(input);
            Assert.That(result.Data?.Url, Is.EqualTo("~/User"), "Should redirect to start if password is correct");
        }

        [Test]
        public async Task ShouldAuthenticateSession()
        {
            var input = await setup();
            await execute(input);
            var authSessionFiles = input.TempLog.AuthSessionFiles(input.Clock.Now().AddMinutes(1)).ToArray();
            Assert.That(authSessionFiles.Length, Is.EqualTo(1), "Should authenticate session");
            var serializedAuthSession = await authSessionFiles[0].Read();
            var authSession = JsonSerializer.Deserialize<AuthenticateSessionModel>(serializedAuthSession);
            var user = await input.AppFactory.Users().User(new AppUserName(input.Model.Credentials.UserName));
            Assert.That(authSession.UserName, Is.EqualTo(user.UserName().Value), "Should authenticate session");
        }

        [Test]
        public async Task ShouldClearSessionForAnonUser()
        {
            var input = await setup();
            await execute(input);
            var anonClient = input.Services.GetService<IAnonClient>();
            Assert.That(anonClient.SessionKey, Is.EqualTo(""), "Should clear session for anon client after authenticating");
        }

        [Test]
        public async Task ShouldResetCache()
        {
            var input = await setup();
            var user = await input.AppFactory.Users().User(new AppUserName(input.Model.Credentials.UserName));
            var httpContextAccessor = input.Services.GetService<IHttpContextAccessor>();
            httpContextAccessor.HttpContext = new DefaultHttpContext
            {
                User = new FakeHttpUser().Create("", user)
            };
            await execute(input);
            var userContext = input.Services.GetService<IUserContext>();
            var firstCachedUser = await userContext.User();
            await execute(input);
            var secondCachedUser = await userContext.User();
            Assert.That(ReferenceEquals(firstCachedUser, secondCachedUser), Is.False, "Should reset cache after login");
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
            await new FakeAppSetup(input.AppFactory, input.Clock).Run();
            await input.AppFactory.Users().Add
            (
                new AppUserName(input.Model.Credentials.UserName),
                new FakeHashedPassword(input.Model.Credentials.Password),
                DateTime.UtcNow
            );
            var user = await input.AppFactory.Users().User(new AppUserName(input.Model.Credentials.UserName));
            var app = await input.AppFactory.Apps().App(FakeAppKey.AppKey);
            var tempLogSession = sp.GetService<TempLogSession>();
            await tempLogSession.StartSession();
            return input;
        }

        private static Task<ResultContainer<WebRedirectResult>> execute(TestInput input)
        {
            return input.Api.Auth.Login.Execute(input.Model);
        }

        private class TestInput
        {
            public TestInput(IServiceProvider sp, AuthenticatorAppApi api)
            {
                Api = api;
                Model = new LoginModel
                {
                    Credentials = new LoginCredentials
                    {
                        UserName = "xartogg",
                        Password = "password"
                    }
                };
                Services = sp;
                AppFactory = sp.GetService<AppFactory>();
                Clock = (FakeClock)sp.GetService<Clock>();
                TempLog = sp.GetService<TempLog>();
            }
            public AuthenticatorAppApi Api { get; }
            public LoginModel Model { get; }
            public AppFactory AppFactory { get; }
            public FakeClock Clock { get; }
            public TempLog TempLog { get; }
            public IServiceProvider Services { get; }
        }
    }
}