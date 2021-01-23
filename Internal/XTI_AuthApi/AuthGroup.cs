using XTI_App.Api;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class AuthGroup : AppApiGroupWrapper
    {
        public AuthGroup(AppApiGroup source, AuthActionFactory actionFactory)
            : base(source)
        {
            var actions = new WebAppApiActionFactory(source);
            Index = source.AddAction(actions.DefaultView());
            VerifyLogin = source.AddAction
            (
                actions.Action
                (
                    nameof(VerifyLogin),
                    actionFactory.CreateVerifyLoginAction
                )
            );
            VerifyLoginForm = source.AddAction
            (
                actions.PartialView
                (
                    nameof(VerifyLoginForm),
                    () => new PartialViewAppAction<EmptyRequest>(nameof(VerifyLoginForm))
                )
            );
            Login = source.AddAction
            (
                actions.Action
                (
                    nameof(Login),
                    () => new LoginModelValidation(),
                    actionFactory.CreateLoginAction
                )
            );
            Logout = source.AddAction
            (
                actions.Action
                (
                    nameof(Logout),
                    actionFactory.CreateLogoutAction
                )
            );

        }
        public AppApiAction<EmptyRequest, WebViewResult> Index { get; }
        public AppApiAction<VerifyLoginForm, EmptyActionResult> VerifyLogin { get; }
        public AppApiAction<EmptyRequest, WebPartialViewResult> VerifyLoginForm { get; }
        public AppApiAction<LoginModel, WebRedirectResult> Login { get; }
        public AppApiAction<EmptyRequest, WebRedirectResult> Logout { get; }
    }
}
