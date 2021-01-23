using XTI_App.Api;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class AuthApiGroup : AppApiGroupWrapper
    {
        public AuthApiGroup(AppApiGroup source, AuthActionFactory factory)
            : base(source)
        {
            var actions = new WebAppApiActionFactory(source);
            Authenticate = source.AddAction
            (
                actions.Action
                (
                    nameof(Authenticate),
                    () => new LoginValidation(),
                    factory.CreateAuthenticateAction
                )
            );
        }
        public AppApiAction<LoginCredentials, LoginResult> Authenticate { get; }
    }
}
