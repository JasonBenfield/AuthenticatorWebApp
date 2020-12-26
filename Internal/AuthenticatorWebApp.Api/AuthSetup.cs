using AuthenticatorWebApp.Core;
using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
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
            await new AllAppSetup(appFactory, clock).Run();
            await new DefaultAppSetup
            (
                appFactory,
                clock,
                new AuthenticatorApiTemplateFactory().Create(),
                "Authenticator"
            ).Run();
        }
    }
}
