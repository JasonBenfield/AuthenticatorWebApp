using XTI_App.Api;
using System.Threading.Tasks;

namespace XTI_AuthApi
{
    public sealed class AuthenticateAction : AppAction<LoginCredentials, LoginResult>
    {
        public AuthenticateAction(Authentication auth)
        {
            this.auth = auth;
        }

        private readonly Authentication auth;

        public Task<LoginResult> Execute(LoginCredentials model) => auth.Authenticate(model.UserName, model.Password);
    }

}
