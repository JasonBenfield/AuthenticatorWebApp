using AuthenticatorWebApp.Core;
using System.Threading.Tasks;
using XTI_App;
using XTI_Core;

namespace AuthenticatorWebApp.Api
{
    public sealed class AuthSetup
    {
        private readonly AppFactory appFactory;
        private readonly Clock clock;

        public AuthSetup(AppFactory appFactory, Clock clock)
        {
            this.appFactory = appFactory;
            this.clock = clock;
        }

        public async Task Run()
        {
            var app = await appFactory.Apps().WebApp(AuthenticatorAppKey.Key);
            const string title = "Authenticator";
            if (app.Exists())
            {
                await app.SetTitle(title);
            }
            else
            {
                app = await appFactory.Apps().AddApp(AuthenticatorAppKey.Key, AppType.Values.WebApp, title, clock.Now());
            }
            var currentVersion = await app.CurrentVersion();
            if (!currentVersion.IsCurrent())
            {
                currentVersion = await app.StartNewMajorVersion(clock.Now());
                await currentVersion.Publishing();
                await currentVersion.Published();
            }
        }
    }
}
