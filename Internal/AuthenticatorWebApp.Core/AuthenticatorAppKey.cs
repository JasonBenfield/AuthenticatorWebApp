using XTI_App;

namespace AuthenticatorWebApp.Core
{
    public sealed class AuthenticatorAppKey
    {
        public static readonly AppKey Key = new AppKey("Authenticator", AppType.Values.WebApp);
    }
}
