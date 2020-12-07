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
            var app = await appFactory.Apps().App(AuthenticatorAppKey.Key);
            const string title = "Authenticator";
            if (app.Key().Equals(AuthenticatorAppKey.Key))
            {
                await app.SetTitle(title);
            }
            else
            {
                app = await appFactory.Apps().Add(AuthenticatorAppKey.Key, title, clock.Now());
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
