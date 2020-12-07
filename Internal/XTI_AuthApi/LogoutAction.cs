using System.Threading.Tasks;
using XTI_App.Api;
using XTI_TempLog;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class LogoutAction : AppAction<EmptyRequest, AppActionRedirectResult>
    {
        private readonly AccessForLogin access;
        private readonly TempLogSession tempLogSession;

        public LogoutAction(AccessForLogin access, TempLogSession tempLogSession)
        {
            this.access = access;
            this.tempLogSession = tempLogSession;
        }

        public async Task<AppActionRedirectResult> Execute(EmptyRequest model)
        {
            await access.Logout();
            await tempLogSession.EndSession();
            return new AppActionRedirectResult("/Authenticator/Current/Auth");
        }
    }
}
