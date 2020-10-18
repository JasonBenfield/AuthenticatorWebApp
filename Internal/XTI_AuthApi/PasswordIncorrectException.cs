namespace XTI_AuthApi
{
    public sealed class PasswordIncorrectException : LoginFailedException
    {
        public PasswordIncorrectException(string userName)
            : base($"Password not correct for user {userName}")
        {
        }
    }
}
