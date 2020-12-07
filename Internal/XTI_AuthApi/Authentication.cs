using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_TempLog;
using XTI_WebApp;

namespace XTI_AuthApi
{
    public sealed class Authentication
    {
        public Authentication
        (
            TempLogSession tempLog,
            UnverifiedUser unverifiedUser,
            IAccess access,
            IHashedPasswordFactory hashedPasswordFactory,
            IUserContext userContext
        )
        {
            this.tempLog = tempLog;
            this.unverifiedUser = unverifiedUser;
            this.access = access;
            this.hashedPasswordFactory = hashedPasswordFactory;
            this.userContext = userContext;
        }

        private readonly TempLogSession tempLog;
        private readonly UnverifiedUser unverifiedUser;
        private readonly IAccess access;
        private readonly IHashedPasswordFactory hashedPasswordFactory;
        private readonly IUserContext userContext;

        public async Task<LoginResult> Authenticate(string userName, string password)
        {
            var hashedPassword = hashedPasswordFactory.Create(password);
            var user = await unverifiedUser.Verify(new AppUserName(userName), hashedPassword);
            var authSession = await tempLog.AuthenticateSession(user.UserName().Value);
            var claims = new XtiClaimsCreator(authSession.SessionKey, user).Values();
            var token = await access.GenerateToken(claims);
            userContext.RefreshUser(user);
            return new LoginResult(token);
        }
    }
}
