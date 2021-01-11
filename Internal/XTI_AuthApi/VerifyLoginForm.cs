using XTI_Forms;

namespace XTI_AuthApi
{
    public sealed class VerifyLoginForm : Form
    {
        public VerifyLoginForm() : base(nameof(VerifyLoginForm))
        {
            UserName = AddTextInput(nameof(UserName));
            UserName.MustNotBeNull();
            UserName.AddConstraints(new NotWhitespaceConstraint());
            UserName.MaxLength = 100;
            Password = AddTextInput(nameof(Password));
            Password.IsProtected = true;
            Password.MustNotBeNull();
            Password.AddConstraints(new NotWhitespaceConstraint());
            Password.MaxLength = 100;
        }

        public InputField<string> UserName { get; }
        public InputField<string> Password { get; }
    }
}
