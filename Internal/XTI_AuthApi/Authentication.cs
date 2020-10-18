using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;
using XTI_WebApp;

namespace XTI_AuthApi
{
    public sealed class Authentication
    {
        public Authentication(ISessionContext sessionContext, UnverifiedUser unverifiedUser, IAccess access, IHashedPasswordFactory hashedPasswordFactory)
        {
            this.sessionContext = sessionContext;
            this.unverifiedUser = unverifiedUser;
            this.access = access;
            this.hashedPasswordFactory = hashedPasswordFactory;
        }

        private readonly ISessionContext sessionContext;
        private readonly UnverifiedUser unverifiedUser;
        private readonly IAccess access;
        private readonly IHashedPasswordFactory hashedPasswordFactory;

        public async Task<LoginResult> Authenticate(string userName, string password)
        {
            var hashedPassword = hashedPasswordFactory.Create(password);
            var user = await unverifiedUser.Verify(new AppUserName(userName), hashedPassword);
            await sessionContext.CurrentSession.Authenticate(user);
            var claims = new XtiClaimsCreator(sessionContext.CurrentSession, user).Values();
            var token = await access.GenerateToken(claims);
            return new LoginResult(token);
        }
    }
}
