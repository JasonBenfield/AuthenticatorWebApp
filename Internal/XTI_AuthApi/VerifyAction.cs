using System.Threading.Tasks;
using XTI_App;
using XTI_App.Api;

namespace XTI_AuthApi
{
    public sealed class VerifyAction : AppAction<LoginCredentials, EmptyActionResult>
    {
        private readonly UnverifiedUser unverifiedUser;
        private readonly IHashedPasswordFactory hashedPasswordFactory;

        public VerifyAction(UnverifiedUser unverifiedUser, IHashedPasswordFactory hashedPasswordFactory)
        {
            this.unverifiedUser = unverifiedUser;
            this.hashedPasswordFactory = hashedPasswordFactory;
        }

        public async Task<EmptyActionResult> Execute(LoginCredentials model)
        {
            var hashedPassword = hashedPasswordFactory.Create(model.Password);
            await unverifiedUser.Verify(new AppUserName(model.UserName), hashedPassword);
            return new EmptyActionResult();
        }
    }

}
