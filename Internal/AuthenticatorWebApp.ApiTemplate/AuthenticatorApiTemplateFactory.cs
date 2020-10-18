using AuthenticatorWebApp.Api;
using Microsoft.Extensions.DependencyInjection;
using XTI_App.Api;
using XTI_AuthApi;

namespace AuthenticatorWebApp.ApiTemplate
{
    public sealed class AuthenticatorApiTemplateFactory : IAppApiTemplateFactory
    {
        public AppApiTemplate Create()
        {
            var services = new ServiceCollection();
            var sp = services.BuildServiceProvider();
            var api = new AuthenticatorApi
            (
                "Current",
                new AppApiSuperUser(),
                new AuthGroupFactory(sp)
            );
            return api.Template();
        }
    }
}
