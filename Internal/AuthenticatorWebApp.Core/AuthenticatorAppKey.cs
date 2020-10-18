using XTI_App;

namespace AuthenticatorWebApp.Core
{
    public sealed class AuthenticatorAppKey
    {
        public static readonly string Value = "Authenticator";
        public static readonly AppKey Key = new AppKey(Value);
    }
}
