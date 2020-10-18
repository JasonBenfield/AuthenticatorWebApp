using System.Threading.Tasks;
using XTI_App.Api;

namespace XTI_AuthApi
{
    public sealed class LoginModelValidation : AppActionValidation<LoginModel>
    {
        public Task Validate(ErrorList errors, LoginModel model)
        {
            return new LoginValidation().Validate(errors, model.Credentials ?? new LoginCredentials());
        }
    }
    public sealed class LoginValidation : AppActionValidation<LoginCredentials>
    {
        public Task Validate(ErrorList errors, LoginCredentials model)
        {
            if (string.IsNullOrWhiteSpace(model.UserName))
            {
                errors.Add(AuthErrors.UserNameIsRequired, nameof(model.UserName));
            }
            if (string.IsNullOrWhiteSpace(model.Password))
            {
                errors.Add(AuthErrors.PasswordIsRequired, nameof(model.Password));
            }
            return Task.CompletedTask;
        }
    }
}
