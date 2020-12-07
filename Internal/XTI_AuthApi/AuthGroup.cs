using XTI_App;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class AuthGroup : AppApiGroup
    {
        public AuthGroup(AppApi api, AuthGroupFactory factory)
            : base
            (
                  api,
                  new NameFromGroupClassName(nameof(AuthGroup)).Value,
                  ModifierCategoryName.Default,
                  ResourceAccess.AllowAnonymous(),
                  new AppApiSuperUser(),
                  (n, a, u) => new WebAppApiActionCollection(n, a, u)
            )
        {
            var actions = Actions<WebAppApiActionCollection>();
            Index = actions.AddDefaultView();
            Verify = actions.AddAction
            (
                nameof(Verify),
                () => new LoginValidation(),
                factory.CreateVerifyAction
            );
            Login = actions.AddAction
            (
                nameof(Login),
                () => new LoginModelValidation(),
                factory.CreateLoginAction
            );
            Logout = actions.AddAction
            (
                nameof(Logout),
                () => factory.CreateLogoutAction()
            );
        }
        public AppApiAction<EmptyRequest, AppActionViewResult> Index { get; }
        public AppApiAction<LoginCredentials, EmptyActionResult> Verify { get; }
        public AppApiAction<LoginModel, AppActionRedirectResult> Login { get; }
        public AppApiAction<EmptyRequest, AppActionRedirectResult> Logout { get; }
    }
}
