using XTI_App.Api;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class AuthApiGroup : AppApiGroup
    {
        public AuthApiGroup(AppApi api, AuthGroupFactory factory)
            : base
            (
                  api,
                  new NameFromGroupClassName(nameof(AuthApiGroup)).Value,
                  false,
                  ResourceAccess.AllowAnonymous(),
                  new AppApiSuperUser(),
                  (n, a, u) => new WebAppApiActionCollection(n, a, u)
            )
        {
            var actions = Actions<WebAppApiActionCollection>();
            Authenticate = actions.AddAction
            (
                nameof(Authenticate),
                () => new LoginValidation(),
                factory.CreateAuthenticateAction
            );
        }
        public AppApiAction<LoginCredentials, LoginResult> Authenticate { get; }
    }
}
