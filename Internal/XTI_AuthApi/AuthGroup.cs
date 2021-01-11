using XTI_App;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class AuthGroup : AppApiGroup
    {
        public AuthGroup(AppApi api, AuthActionFactory actionFactory)
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
            VerifyLogin = actions.AddAction
            (
                nameof(VerifyLogin),
                actionFactory.CreateVerifyLoginAction
            );
            VerifyLoginForm = actions.AddPartialView
            (
                nameof(VerifyLoginForm),
                () => new PartialViewAppAction<EmptyRequest>(nameof(VerifyLoginForm))
            );
            Login = actions.AddAction
            (
                nameof(Login),
                () => new LoginModelValidation(),
                actionFactory.CreateLoginAction
            );
            Logout = actions.AddAction
            (
                nameof(Logout),
                actionFactory.CreateLogoutAction
            );

        }
        public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
        public AppApiAction<VerifyLoginForm, EmptyActionResult> VerifyLogin { get; }
        public AppApiAction<EmptyRequest, WebPartialViewResult> VerifyLoginForm { get; }
        public AppApiAction<LoginModel, WebRedirectResult> Login { get; }
        public AppApiAction<EmptyRequest, WebRedirectResult> Logout { get; }
    }
}
