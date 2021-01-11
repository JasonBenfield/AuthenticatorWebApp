using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;

namespace XTI_AuthApi
{
    public sealed class VerifyLoginAction : AppAction<VerifyLoginForm, EmptyActionResult>
    {
        private readonly UnverifiedUser unverifiedUser;
        private readonly IHashedPasswordFactory hashedPasswordFactory;

        public VerifyLoginAction(UnverifiedUser unverifiedUser, IHashedPasswordFactory hashedPasswordFactory)
        {
            this.unverifiedUser = unverifiedUser;
            this.hashedPasswordFactory = hashedPasswordFactory;
        }

        public async Task<EmptyActionResult> Execute(VerifyLoginForm model)
        {
            var userName = model.UserName.Value();
            var password = model.Password.Value();
            var hashedPassword = hashedPasswordFactory.Create(password);
            await unverifiedUser.Verify(new AppUserName(userName), hashedPassword);
            return new EmptyActionResult();
        }
    }

}
