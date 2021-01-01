using System;
using System.Threading.Tasks;
using System.Web;
using XTI_App.Api;
using XTI_WebApp;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class LoginAction : AppAction<LoginModel, AppActionRedirectResult>
    {
        private readonly Authentication auth;
        private readonly IAnonClient anonClient;

        public LoginAction(Authentication auth, IAnonClient anonClient)
        {
            this.auth = auth;
            this.anonClient = anonClient;
        }

        public async Task<AppActionRedirectResult> Execute(LoginModel model)
        {
            await auth.Authenticate(model.Credentials.UserName, model.Credentials.Password);
            anonClient.Load();
            anonClient.Persist("", DateTimeOffset.MinValue, anonClient.RequesterKey);
            var startUrl = model.StartUrl;
            if (string.IsNullOrWhiteSpace(startUrl))
            {
                startUrl = "~/User";
            }
            else
            {
                startUrl = HttpUtility.UrlDecode(startUrl);
            }
            if (!string.IsNullOrWhiteSpace(model.ReturnUrl))
            {
                if (startUrl.Contains("?"))
                {
                    startUrl += "&";
                }
                else
                {
                    startUrl += "?";
                }
                startUrl += $"returnUrl={model.ReturnUrl}";
            }
            return new AppActionRedirectResult(startUrl);
        }
    }

}
