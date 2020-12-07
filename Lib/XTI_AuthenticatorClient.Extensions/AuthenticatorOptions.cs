namespace XTI_AuthenticatorClient.Extensions
{
    public sealed class AuthenticatorOptions
    {
        public static readonly string Authenticator = nameof(Authenticator);

        public string CredentialKey { get; set; }
    }
}
